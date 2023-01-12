import { renderWithIntl } from '@folio/stripes-erm-testing';
import { MemoryRouter } from 'react-router-dom';
import { Button } from '@folio/stripes-testing';

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

  test('renders the dismissModal button', async () => {
    await Button('SelectAgreement,Container').exists();
  });

  test('renders the expected heading name', () => {
    const { getByText } = renderComponent;
    expect(getByText('Select agreement')).toBeInTheDocument();
  });
});
