import { useEffect } from 'react';
import qs from 'qs';
import { setCookie, parseCookies } from 'nookies';
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
  const storedToken = get(cookies, 'userToken');
  const storedEmail = get(cookies, 'userEmail');
  const isNewToken = params && params.token && storedToken !== params.token;
  const isNewEmail = params && params.email && storedEmail !== params.email;
  let token, email;
  if (isNewToken) {
    token = params.token;
    setCookie(ctx, 'userToken', token, {
      maxAge: 365 * 10 * 24 * 60 * 60,
    });
  } else if (storedToken) {
    token = storedToken;
  }
  if (isNewEmail) {
    email = params.email;
    setCookie(ctx, 'userEmail', email, {
      maxAge: 365 * 10 * 24 * 60 * 60,
    });
  } else if (storedEmail) {
    email = storedEmail;
  }
  if (isSegmentEnabled()) {
    window.analytics.identify(token, { email });
  }
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

  // eslint-disable-next-line
  useEffect(() => {
    trackPageView(PAGES[pageKey], { ...queryObj, ...params })
  }, [queryObj, params]);
}

