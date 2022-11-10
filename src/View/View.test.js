import '@folio/stripes-erm-components/test/jest/__mock__';
import { renderWithIntl } from '@folio/stripes-erm-components/test/jest/helpers';
import { MemoryRouter } from 'react-router-dom';
import { Pane, SearchField, MultiColumnList } from '@folio/stripes-testing';
import translationsProperties from '../../test/helpers';
import View from './View';

jest.mock('../Filters', () => () => <div>Filters</div>);

const data = {
  'agreements': [{
    'id': 'eb1a36fd-9365-4181-88d3-2458a170a169',
    'dateCreated': '2022-11-02T09:56:16Z',
    'name': 'MR Agreement Test',
    'orgs': [],
    'externalLicenseDocs': [],
    'outwardRelationships': [],
    'customProperties': {},
    'contacts': [],
    'tags': [],
    'lastUpdated': '2022-11-02T09:56:16Z',
    'inwardRelationships': [],
    'startDate': '2022-11-02',
    'linkedLicenses': [],
    'docs': [],
    'periods': [{
      'id': '879f15fb-272d-47ef-b2ce-7b4c1f6cece0',
      'startDate': '2022-11-02',
      'owner': {
        'id': 'eb1a36fd-9365-4181-88d3-2458a170a169'
      },
      'periodStatus': 'current'
    }],
    'usageDataProviders': [],
    'agreementStatus': {
      'id': '2c91809c8435b4b1018435bcbe180016',
      'value': 'active',
      'label': 'Active'
    },
    'supplementaryDocs': [],
    'cancellationDeadline': null,
    'alternateNames': [],
    'version': 0
  }],
};

const onNeedMoreData = jest.fn();
const onSelectRow = jest.fn();
const queryGetter = jest.fn();
const querySetter = jest.fn();

const source = {
  'totalCount': () => {},
  'loaded': () => {},
  'pending': () => {},
  'failure': () => {},
  'failureMessage': () => {},
};

describe('View', () => {
  let renderComponent;
  beforeEach(() => {
    renderComponent = renderWithIntl(
      <MemoryRouter>
        <View
          data={data}
          onNeedMoreData={onNeedMoreData}
          onSelectRow={onSelectRow}
          queryGetter={queryGetter}
          querySetter={querySetter}
          source={source}
          visibleColumns={['Name', 'Status', 'Period start', 'Period end', 'Cancellation deadline']}

        />
      </MemoryRouter>,
      translationsProperties
    );
  });

  test('renders the Filters component', () => {
    const { getByText } = renderComponent;
    expect(getByText('Filters')).toBeInTheDocument();
  });

  test('renders the expected Search and Filter Pane', async () => {
    await Pane('Search and filter').is({ visible: true });
  });

  test('renders the expected search field', async () => {
    await SearchField().has({ id: 'input-agreement-search' });
  });

  test('renders the expected MCL', async () => {
    await MultiColumnList('list-agreements').exists();
  });

  test('renders expected column count', async () => {
    await MultiColumnList({ columnCount: 5 }).exists();
  });

  test('renders expected columns', async () => {
    await MultiColumnList({ columns: ['Name', 'Status', 'Period start', 'Period end', 'Cancellation deadline'] }).exists();
  });
});
