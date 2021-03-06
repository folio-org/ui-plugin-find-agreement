import { Factory } from 'miragejs';
import faker from 'faker';

export default Factory.extend({
  id: () => faker.random.uuid(),
  name: () => faker.name.firstName(),
  orgs: () => [],
  externalLicenseDocs: () => [],
  docs: () => [],
  usageDataProviders: () => [],
  tags: () => [],
  supplementaryDocs: () => [],
});
