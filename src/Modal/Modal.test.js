import { React } from 'react';
import '@folio/stripes-erm-components/test/jest/__mock__';
import { renderWithIntl } from '@folio/stripes-erm-components/test/jest/helpers';
import { MemoryRouter } from 'react-router-dom';
import translationsProperties from '../../test/helpers';
import Modal from './Modal';

jest.mock('../Container', () => {
  // eslint-disable-next-line react/prop-types
  return ({ onAgreementSelected }) => (
    <>
      <button
        onClick={() => onAgreementSelected({}, {})}
        type="button"
      >
        <div>SelectAgreement</div>,
        <div>Container</div>
      </button>
    </>
  );
});

const onCloseModal = jest.fn();
const onAgreementSelected = jest.fn();
const open = true;

describe('Modal', () => {
  let renderComponent;
  beforeEach(() => {
    renderComponent = renderWithIntl(
      <MemoryRouter>
        <Modal
          dataKey="agreement-filter-button-agreement"
          onAgreementSelected={onAgreementSelected}
          onClose={onCloseModal}
          open={open}
        />
      </MemoryRouter>,
      translationsProperties
    );
  });

  test('renders the Container component', () => {
    const { getByText } = renderComponent;
    expect(getByText('Container')).toBeInTheDocument();
  });

  test('renders the SelectAgreement', () => {
    const { getByText } = renderComponent;
    expect(getByText('SelectAgreement')).toBeInTheDocument();
  });

  test('renders the expected button name', () => {
    const { getByRole } = renderComponent;
    expect(getByRole('button', { name: 'stripes-components.dismissModal' }));
  });

  test('renders the expected heading name', () => {
    const { getByRole } = renderComponent;
    expect(getByRole('heading', { name: 'Select agreement' }));
  });
});