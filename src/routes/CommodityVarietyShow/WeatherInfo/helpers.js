import pluralize from 'pluralize';

export default function getAlertDescription(alertType, count) {
  switch (alertType) {    
    case 'high_temperature':
      return `High temperatures expected for at least ${pluralize('day', count, true)}`;
    case 'low_temperature':
      return `Low temperatures expected for at least ${pluralize('day', count, true)}`;
    case 'high_precipitation':
      return `Precipitation greater than 0.2 inches expected for at least ${pluralize('day', count, true)}`;
    case 'frost':
      return `Frost expected for at least ${pluralize('day', count, true)}`;
    default:
      return `Unknown Alert registered for at least ${pluralize('day', count, true)}`;
  }
}
