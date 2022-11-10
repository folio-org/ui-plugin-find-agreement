import {
  renderWithIntl
} from '@folio/stripes-erm-testing';
import { MemoryRouter } from 'react-router-dom';
import translationsProperties from '../../test/helpers';
import Container from './Container';

jest.mock('../View', () => () => <div>View</div>);

const onSelectRow = jest.fn();

describe('Container', () => {
  let renderComponent;
  beforeEach(() => {
    renderComponent = renderWithIntl(
      <MemoryRouter>
        <Container
          onSelectRow={onSelectRow}
        />
      </MemoryRouter>,
      translationsProperties
    );
  });

  test('renders the container view', () => {
    const { queryByTestId } = renderComponent;
    expect(queryByTestId('containerView')).toBeDefined();
  });

  test('renders the View component', () => {
    const { getByText } = renderComponent;
    expect(getByText('View')).toBeInTheDocument();
  });

  test('should handle onSelectRow', () => {
    expect(onSelectRow).not.toHaveBeenCalled();
  });
});
