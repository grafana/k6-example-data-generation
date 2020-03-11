import * as faker from 'faker/locale/en_US';

export const generateSubscriber = () => ({
    name: `${faker.name.lastName()}, ${faker.name.firstName()}`,
    title: faker.name.jobTitle(),
    company: faker.company.companyName(),
    email: faker.internet.email(),
    country: faker.address.country()
});