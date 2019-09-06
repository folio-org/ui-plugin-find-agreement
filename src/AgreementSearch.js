import React from 'react';
import PropTypes from 'prop-types';
import { Button, Icon } from '@folio/stripes/components';
import Modal from './Modal';

const triggerId = 'find-agreement-trigger';

export default class AgreementSearch extends React.Component {
  static propTypes = {
    renderTrigger: PropTypes.func,
  };

  state = {
    open: false,
  };

  openModal = () => {
    this.setState({ open: true });
  }

  closeModal = () => {
    this.setState({ open: false });
  }

  renderDefaultTrigger() {
    return (
      <Button
        id={triggerId}
        buttonStyle="primary noRightRadius"
        onClick={this.openModal}
      >
        <Icon icon="search" color="#fff" />
      </Button>
    );
  }

  renderTriggerButton() {
    const {
      renderTrigger,
    } = this.props;

    return renderTrigger
      ? renderTrigger({
        id: triggerId,
        onClick: this.openModal,
      })
      : this.renderDefaultTrigger();
  }

  render() {
    return (
      <React.Fragment>
        {this.renderTriggerButton()}
        <Modal
          open={this.state.open}
          onClose={this.closeModal}
          {...this.props}
        />
      </React.Fragment>

    );
  }
}