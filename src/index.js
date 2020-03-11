import http from 'k6/http';
import { sleep } from 'k6';
import { Rate } from 'k6/metrics';
import { generateSubscriber } from './subscriber';

const failRate = new Rate('failed requests');

export const options = {
  vus: 3,
  duration: '10s',
  thresholds: {
    'failed requests': ['rate<0.1'],
    'http_req_duration': ['p(95)<400']
  }
};

export default function() {
    const person = generateSubscriber();
    console.log(JSON.stringify(person));
    
    const res = http.post(
        'https://httpbin.org/anything/subscribe',
        JSON.stringify(person)
    );

    failRate.add(res.status !== 200);
    sleep(1);
}