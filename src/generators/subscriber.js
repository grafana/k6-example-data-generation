// it's important that we only import the locale(s) we need or our test script
// will balloon in memory consumption. to be fair, it will anyway, but less.

import * as faker from 'faker/locale/en_US'; 

export const generateSubscriber = () => ({
    name: `SUBSCRIPTION_TEST - ${faker.name.firstName()} ${faker.name.lastName()}`,
    title: faker.name.jobTitle(),
    company: faker.company.companyName(),
    email: faker.internet.email(),
    country: faker.address.country()
});