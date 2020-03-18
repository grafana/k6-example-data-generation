import { sleep } from 'k6';
import { Rate } from 'k6/metrics';

const formFailRate = new Rate('failed form fetches');
const submitFailRate = new Rate('failed form submits');

export const options = {
    // ...
    vus: 300,
    duration: '10s',
    thresholds: {
      'failed form submits': ['rate<0.1'],
      'failed form fetches': ['rate<0.1'],
      'http_req_duration': ['p(95)<400'],
    },
};

export default function() {
   formFailRate.add(0);
   submitFailRate.add(0);
    sleep(1);
}