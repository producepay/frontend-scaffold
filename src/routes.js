const _ = require('lodash');

module.exports = {
  /* Unauthenticated routes */
  commodityVarietyShow: (commodityId = ':commodityUuid', varietyId = ':varietyUuid?') => (
    `/commodities-varieties/${_.compact([commodityId, varietyId]).join('/')}`
  ),
  /* Authenticated routes */
  dashboard: () => '/',
  marketInsights: () => '/market-insights',
  marketInsightsDashboard: () => '/market-insights/dashboard',
  marketInsightsAll: () => '/market-insights/all',
  showCustomer: (customerName = ':customerName') => `/customers/${customerName}`,
  showCustomerPerformance: (customerName = ':customerName') => `/customers/${customerName}/performance`,
  showCustomerTransactions: (customerName = ':customerName') => `/customers/${customerName}/transactions`,
  showCustomerSalesReport: (customerName = ':customerName') => `/customers/${customerName}/sales-report`,
  showCommodity: (commodityId = ':commodityId') => `/commodities/${commodityId}`,
  showCommoditySales: (commodityId = ':commodityId') => `/commodities/${commodityId}/sales`,
  showCommodityCustomers: (commodityId = ':commodityId') => `/commodities/${commodityId}/customers`,
  showCommodityTransactions: (commodityId = ':commodityId') => `/commodities/${commodityId}/transactions`,
  showCommodityInsights: (commodityVarietyId = ':commodityVarietyId') => `/commodities/${commodityVarietyId}/insights`,
};
