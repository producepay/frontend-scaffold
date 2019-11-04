import { useEffect } from 'react';
import qs from 'qs';
import { get } from 'lodash';

export const KEYS = {
  PRICING_GRAPH_SKU_CHANGE: 'PRICING_GRAPH_SKU_CHANGE',
  PRICING_GRAPH_SHIPPING_POINT_CHANGE: 'PRICING_GRAPH_SHIPPING_POINT_CHANGE',
};

export const PAGES = {
  COMMODITY_VARIETY_SHOW: 'SHOW COMMODITY VARIETY',
};

export const isSegmentEnabled = () => {
  return process.env.REACT_APP_SEGMENT_ENABLED === 'true' && window.analytics;
};

export const identifyUser = (email) => {
  if (isSegmentEnabled()) window.analytics.identify(email, { email });
};

export const trackEvent = (eventName, otherData = {}) => {
  if (isSegmentEnabled()) {
    window.analytics.track(eventName, otherData);
  }
};

export const trackPageView = (page, additionalData) => {
  if (isSegmentEnabled()) {
    window.analytics.page(null, page, additionalData);
  }
};

export function usePageTracking(props, pageKey) {
  const queryObj = qs.parse(get(props, 'location.search', ''), { ignoreQueryPrefix: true });
  const params = get(props, 'match.params', {});

  const paramsKey = `${JSON.stringify(queryObj)}-${JSON.stringify(params)}`;

  useEffect(() => {
    trackPageView(PAGES[pageKey], { ...queryObj, ...params })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageKey, paramsKey]);
}

