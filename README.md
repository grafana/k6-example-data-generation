# example-data-generation

This repository contains an example of how to utilise faker and k6 to perform load testing against a single endpoint with generated data.

## Background 
To make this example useful, let's provide some background as to what this example is aiming to show us.

### Scenario

Acme Corp is about to release a submission form, allowing users to sign up for their newsletter.

As this form is released during black friday however, they want to make sure that it can withstand the pressure of a lot of simultaneous registrations. After all, they are a company in the business of making everything, so they expect a surge of traffic friday morning.

### Goals

```js
const options = {
    // ...
    vus: 300,
    thresholds: {
      'failed form submits': ['rate<0.1'],
      'failed form fetches': ['rate<0.1'],
      'http_req_duration': ['p(95)<400'],
    },
};
```

With 300 virtual users trying to subscribe to the newsletter every second...

* less than 10% are allowed to fail in retrieving the form
* less than 10% are allowed to fail in submitting the form data
* only 5% or less are allowed to have a request duration longer than 400ms