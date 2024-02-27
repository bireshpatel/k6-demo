import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import { textSummary } from "https://jslib.k6.io/k6-summary/0.0.1/index.js";
export { getAllUsers } from "../functional_test/k6_functional_test.js";

export function handleSummary(data) {
  return {
    "./results/performance_test_results/k6_performance_test.html": htmlReport(data),
    stdout: textSummary(data, { indent: " ", enableColors: true }),
    "./results/performance_test_results/k6_performance_test.txt": textSummary(data, {
      indent: " ",
      enableColors: false
    }),
  };
}

export const options = {
    discardResponseBodies: false,
    summaryTrendStats: ['avg', 'min', 'med', 'max', 'p(90)', 'p(95)', 'p(99)', 'p(99.99)', 'count'],
    setupTimeout: '600s',
    thresholds: {
        'http_req_duration{scenario:getAllUsers}': ['p(90) <= 300', 'p(95) <= 400', 'p(99) <= 500']
    },
    scenarios: {
        getAllUsers: {
            executor: 'ramping-arrival-rate',
            timeUnit: '10s',
            preAllocatedVUs: 1,
            maxVUs: 5,
            startTime: "0s",
            stages: [
                {target: 200, duration: '1s' },
                {target: 400, duration: '3s' },
                {target: 200, duration: '1s' },
            ],
            exec: 'getAllUsers',
        }
    },
}