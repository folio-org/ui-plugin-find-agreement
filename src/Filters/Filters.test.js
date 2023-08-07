import { waitFor } from '@folio/jest-config-stripes/testing-library/react';

import {
  Accordion,
  Checkbox,
  renderWithIntl
} from '@folio/stripes-erm-testing';

import { MemoryRouter } from 'react-router-dom';

import { activeFilters, data } from './testResources';
import translationsProperties from '../../test/helpers';
import Filters from './Filters';

const stateMock = jest.fn();

const filterHandlers = {
  checkbox: () => {},
  clear: () => {},
  clearGroup: () => {},
  reset: () => {},
  state: stateMock
};

describe('Filters', () => {
  let renderComponent;
  beforeEach(() => {
    renderComponent = renderWithIntl(
      <MemoryRouter>
        <Filters
          activeFilters={activeFilters}
          data={data}
          filterHandlers={filterHandlers}
        />
      </MemoryRouter>,
      translationsProperties
    );
  });

  test('renders the CustomPropertiesFilter component', () => {
    const { getByText } = renderComponent;
    expect(getByText('CustomPropertiesFilter')).toBeInTheDocument();
  });

  test('renders the OrganizationSelection component', () => {
    const { getByText } = renderComponent;
    expect(getByText('OrganizationSelection')).toBeInTheDocument();
  });

  test('renders the InternalContactSelection component', () => {
    const { getByText } = renderComponent;
    expect(getByText('InternalContactSelection')).toBeInTheDocument();
  });

  test('renders the Status Accordion', async () => {
    await Accordion('Status').is({ open: true });
  });

  test('renders Status Checkboxs', async () => {
    await Checkbox({ id: 'clickable-filter-agreementStatus-active' }).exists();
    await Checkbox({ id: 'clickable-filter-agreementStatus-closed' }).exists();
    await Checkbox({ id: 'clickable-filter-agreementStatus-draft' }).exists();
    await Checkbox({ id: 'clickable-filter-agreementStatus-in-negotiation' }).exists();
    await Checkbox({ id: 'clickable-filter-agreementStatus-requested' }).exists();
  });

  let index = 1;
  const testFilterCheckbox = (field, value) => (
    test(`clicking the ${value} checkbox`, async () => {
      await waitFor(async () => {
        await Checkbox({ id: `clickable-filter-${field}-${value}` }).click();
      });

      await waitFor(() => {
        expect(stateMock.mock.calls.length).toEqual(index);
      });

      index++;
    })
  );

  testFilterCheckbox('agreementStatus', 'active');
  testFilterCheckbox('agreementStatus', 'closed');
  testFilterCheckbox('agreementStatus', 'draft');
  testFilterCheckbox('agreementStatus', 'in-negotiation');
  testFilterCheckbox('agreementStatus', 'requested');

  testFilterCheckbox('renewalPriority', 'definitely-cancel');
  testFilterCheckbox('renewalPriority', 'definitely-renew');
  testFilterCheckbox('renewalPriority', 'for-review');

  testFilterCheckbox('isPerpetual', 'no');
  testFilterCheckbox('isPerpetual', 'yes');

  test('renders the Renewal priority Accordion', async () => {
    await Accordion('Renewal priority').exists();
  });

  test('renders the Is perpetual Accordion', async () => {
    await Accordion('Is perpetual').exists();
  });

  test('renders the Organizations Accordion', async () => {
    await Accordion('Organizations').exists();
  });

  test('renders the Organization role Accordion', async () => {
    await Accordion('Organization role').exists();
  });

  test('renders the Internal contacts Accordion', async () => {
    await Accordion('Internal contacts').exists();
  });

  test('renders the Internal contact role Accordion', async () => {
    await Accordion('Internal contact role').exists();
  });

  test('renders the Tags Accordion', async () => {
    await Accordion('Tags').exists();
  });
});

