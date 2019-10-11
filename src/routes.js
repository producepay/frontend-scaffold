const _ = require('lodash');

module.exports = {
  /* Unauthenticated routes */
  commodityVarietyShow: (commodityId = ':commodityUuid', varietyId = ':varietyUuid?') => (
    `/commodities-varieties/${_.compact([commodityId, varietyId]).join('/')}`
  ),
  authSignIn: () => '/auth/sign-in',
  /* Authenticated routes */
  dashboard: () => '/',
  marketInsights: () => '/market-insights',
  marketInsightsDashboard: () => '/market-insights/dashboard',
  marketInsightsAll: () => '/market-insights/all',
  showCustomer: (customerId = ':customerId') => `/customers/${customerId}`,
  showCustomerPerformance: (customerId = ':customerId') => `/customers/${customerId}/performance`,
  showCustomerTransactions: (customerId = ':customerId') => `/customers/${customerId}/transactions`,
  showCustomerSalesReport: (customerId = ':customerId') => `/customers/${customerId}/sales-report`,
  showCommodity: (commodityName = ':commodityName') => `/commodities/${commodityName}`,
  showCommoditySales: (commodityName = ':commodityName') => `/commodities/${commodityName}/performance`,
  showCommodityCustomers: (commodityName = ':commodityName') => `/commodities/${commodityName}/customers`,
  showCommodityTransactions: (commodityName = ':commodityName') => `/commodities/${commodityName}/transactions`,
  showCommodityInsights: (commodityVarietyId = ':commodityVarietyId') => `/commodities/${commodityVarietyId}/insights`,
};
