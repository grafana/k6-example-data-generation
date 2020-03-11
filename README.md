# example-data-generation

This repository contains an example of how to utilise faker and k6 to perform load testing against a single endpoint with generated data.

## Scenario

Acme Corp is about to release a submission form, allowing users to sign up for their newsletter.

As this form is released during black friday however, they want to make sure that it can withstand the pressure of a lot of simultaneous registrations. After all, they are a company in the business of making everything, so they expect a surge of traffic friday morning.

## Goals

With 300 virtual users subscribing to the newsletter every second...

* less than 10% are allowed to fail
* only 5% or less are allowed to have a request duration longer than 400ms

