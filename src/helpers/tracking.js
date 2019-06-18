import { useEffect } from 'react';
import qs from 'qs';
import { parseCookies } from 'nookies';
import { get } from 'lodash';

export const KEYS = {
  PRICING_GRAPH_SKU_CHANGE: 'PRICING_GRAPH_SKU_CHANGE',
};

export const PAGES = {
  COMMODITY_VARIETY_SHOW: 'SHOW COMMODITY VARIETY',
};

export const isSegmentEnabled = () => {
  return process.env.REACT_APP_SEGMENT_ENABLED === 'true' && window.analytics;
};

export const identifyUser = (params, ctx = {}) => {
  const cookies = parseCookies(ctx);
  const storedToken = localStorage.getItem('userToken') || get(cookies, 'userToken');
  const storedEmail = localStorage.getItem('userEmail') || get(cookies, 'userEmail');
  const isNewToken = params && params.token && storedToken !== params.token;
  const isNewEmail = params && params.email && storedEmail !== params.email;

  let token, email;
  if (isNewToken) {
    token = params.token;
    localStorage.setItem('userToken', token);
  } else if (storedToken) {
    token = storedToken;
    localStorage.setItem('userToken', token);
  }

  if (isNewEmail) {
    email = params.email;
    localStorage.setItem('userEmail', email);
  } else if (storedEmail) {
    email = storedEmail;
    localStorage.setItem('userEmail', email);
  }

  if (isSegmentEnabled()) window.analytics.identify(token, { email });

  return token && email ? { userToken: token, userEmail: email } : {};
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

