import { sleep } from "k6";
import http from "k6/http";
import { Rate } from "k6/metrics";

import { generateSubscriber } from "./generators/subscriber";

const BASE_URL = __ENV.BASE_URL || "https://httpbin.test.k6.io";

const urls = {
  form: `${BASE_URL}/anything/form`,
  submit: `${BASE_URL}/anything/form/subscribe`,
};

const formFailRate = new Rate("failed_form_fetches");
const submitFailRate = new Rate("failed_form_submits");

export const options = {
  vus: 30,
  duration: "10s",
  thresholds: {
    failed_form_fetches: ["rate<0.1"],
    failed_form_submits: ["rate<0.1"],
  },
};

const getForm = () => {
  const formResult = http.get(urls.form);
  formFailRate.add(formResult.status !== 200);
};

const submitForm = () => {
  const person = generateSubscriber();
  const payload = JSON.stringify(person);

  const submitResult = http.post(urls.submit, payload);
  submitFailRate.add(submitResult.status !== 200);
};

export default function () {
  getForm();
  submitForm();
  sleep(1);
}
