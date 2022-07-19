import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Icon } from '@folio/stripes/components';
import contains from 'dom-helpers/query/contains';
import Modal from './Modal';

const triggerId = 'find-agreement-trigger';

const AgreementSearch = (props) => {
  const { renderTrigger } = props;

  const modalRef = useRef();
  const modalTrigger = useRef();
  const [open, setOpen] = useState(false);

  const openModal = () => {
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);

    if (modalRef.current && modalTrigger.current && contains(modalRef.current, document.activeElement)) {
      modalTrigger.current.focus();
    }
  };

  const renderDefaultTrigger = () => {
    return (
      <Button
        buttonRef={modalTrigger}
        buttonStyle="primary noRightRadius"
        id={triggerId}
        onClick={openModal}
      >
        <Icon color="#fff" icon="search" />
      </Button>
    );
  };

  const renderTriggerButton = () => {
    return renderTrigger
      ? renderTrigger({
        buttonRef: modalTrigger,
        id: triggerId,
        onClick: openModal,
      })
      : renderDefaultTrigger();
  };

  return (
    <>
      {renderTriggerButton()}
      <Modal
        modalRef={modalRef}
        onClose={closeModal}
        open={open}
        {...props}
      />
    </>
  );
};


AgreementSearch.propTypes = {
  renderTrigger: PropTypes.func,
};

export default AgreementSearch;
