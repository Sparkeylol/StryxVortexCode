import metrics from 'datadog-metrics';
import os from 'os';

export default metrics.init({
  host: os.hostname(),
  prefix: 'stryx.',
  apiKey: process.env.DATADOG_API_KEY,
});
