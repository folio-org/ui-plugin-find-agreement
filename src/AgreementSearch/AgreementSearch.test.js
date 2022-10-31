import { React } from 'react';
import '@folio/stripes-erm-components/test/jest/__mock__';
import { mockKintComponents, renderWithIntl } from '@folio/stripes-erm-components/test/jest/helpers';
import translationsProperties from '../../test/helpers';
import AgreementSearch from './AgreementSearch';

jest.mock('../Modal', () => () => <div>Modal</div>);

jest.mock('@k-int/stripes-kint-components', () => ({
  ...jest.requireActual('@k-int/stripes-kint-components'),
  ...mockKintComponents
}));

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
    const { getByText } = renderComponent;
    expect(getByText('Modal')).toBeInTheDocument();
  });

  test('should handle renderTrigger', () => {
    expect(renderTrigger).toHaveBeenCalled();
  });
});
