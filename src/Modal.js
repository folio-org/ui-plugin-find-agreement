import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Modal } from '@folio/stripes/components';

import Container from './Container';
import css from './AgreementSearch.css';

export default class AgreementSearchModal extends React.Component {
  static propTypes = {
    stripes: PropTypes.shape({
      connect: PropTypes.func.isRequired,
    }),
    onAgreementSelected: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool,
    dataKey: PropTypes.string,
  };

  static defaultProps = {
    dataKey: 'find-agreement',
  }

  constructor(props) {
    super(props);

    this.connectedContainer = props.stripes.connect(Container, { dataKey: props.dataKey });
  }

  selectAgreement = (e, agreement) => {
    this.props.onAgreementSelected(agreement);
    this.props.onClose();
  }

  render() {
    return (
      <FormattedMessage id="ui-plugin-find-agreement.selectAgreement">
        {label => (
          <Modal
            contentClass={css.modalContent}
            dismissible
            enforceFocus={false}
            id="plugin-find-agreement-modal"
            label={label}
            onClose={this.props.onClose}
            open={this.props.open}
            size="large"
          >
            <this.connectedContainer
              {...this.props}
              onSelectRow={this.selectAgreement}
            />
          </Modal>
        )}
      </FormattedMessage>
    );
  }
}