import user from '@testing-library/user-event';

import {
  renderWithIntl
} from '@folio/stripes-erm-testing';
import translationsProperties from '../../test/helpers';
import AgreementSearch from './AgreementSearch';

jest.mock('../Modal', () => () => <div>Modal</div>);

const renderTrigger = jest.fn();

describe('AgreementSearch', () => {
  let renderComponent;
  beforeEach(() => {
    renderComponent = renderWithIntl(
      <AgreementSearch
        renderTrigger={renderTrigger}
      />,
      translationsProperties
    );
  });

  test('renders the Modal component', () => {
    const { getByText, queryByTestId } = renderComponent;
    user.click(queryByTestId('default-trigger'));
    expect(getByText('Modal')).toBeInTheDocument();
  });

  test('should handle renderTrigger', () => {
    expect(renderTrigger).toHaveBeenCalled();
  });
});
