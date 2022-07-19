import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Modal } from '@folio/stripes/components';

import Container from './Container';
import css from './AgreementSearch.css';

const AgreementSearchModal = (props) => {
  const {
    modalRef,
    onClose,
    onAgreementSelected,
    open,
  } = props;
  const backupModalRef = useRef();
  const theModalRef = modalRef || backupModalRef;

  const selectAgreement = (e, agreement) => {
    onAgreementSelected(agreement);
    onClose(e);
  };

  return (
    <FormattedMessage id="ui-plugin-find-agreement.selectAgreement">
      {label => (
        <Modal
          ref={theModalRef}
          contentClass={css.modalContent}
          dismissible
          enforceFocus={false}
          id="plugin-find-agreement-modal"
          label={label}
          onClose={onClose}
          open={open}
          size="large"
        >
          <Container
            {...props}
            onSelectRow={selectAgreement}
          />
        </Modal>
      )}
    </FormattedMessage>
  );
};

AgreementSearchModal.propTypes = {
  dataKey: PropTypes.string,
  modalRef: PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  onAgreementSelected: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool,
  stripes: PropTypes.shape({
    connect: PropTypes.func.isRequired,
  }),
};

export default AgreementSearchModal;
