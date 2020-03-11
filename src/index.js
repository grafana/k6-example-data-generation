import { sleep } from 'k6';
import http from 'k6/http';
import { Rate } from 'k6/metrics';

import { generateSubscriber } from './subscriber';

const urls = {
    form: 'https://httpbin.org/anything/form',
    submit: 'https://httpbin.org/anything/form/subscribe',
};

const formFailRate = new Rate('failed form fetches');
const submitFailRate = new Rate('failed form submits');

export const options = {
  vus: 300,
  duration: '10s',
  thresholds: {
    'failed form submits': ['rate<0.1'],
    'failed form fetches': ['rate<0.1'],
    'http_req_duration': ['p(95)<400']
  }
};

const getForm = () => {
    const formResult = http.get(urls.form);
    formFailRate.add(formResult.status !== 200);
}

const submitForm = () => {
    const person = generateSubscriber();    
    const payload = JSON.stringify(person);
    
    const submitResult = http.post(urls.submit, payload);
    submitFailRate.add(submitResult.status !== 200);
}

export default function() {
    getForm();
    submitForm();
    sleep(1);
}