import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { AgreementSearch } from '@folio/agreements';
import { Modal } from '@folio/stripes/components';

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

  constructor(props) {
    super(props);

    this.connectedApp = props.stripes.connect(AgreementSearch, { dataKey: props.dataKey });
  }

  selectAgreement = (e, agreement) => {
    this.props.onAgreementSelected(agreement);
    this.props.onClose();
  }

  render() {
    return (
      <Modal
        contentClass={css.modalContent}
        dismissible
        enforceFocus={false}
        label={<FormattedMessage id="ui-plugin-find-agreement.selectAgreement" />}
        onClose={this.props.onClose}
        open={this.props.open}
        size="large"
      >
        <this.connectedApp
          {...this.props}
          browseOnly
          disableRecordCreation
          onComponentWillUnmount={this.props.onClose}
          onSelectRow={this.selectAgreement}
          showSingleResult={false}
        />
      </Modal>
    );
  }
}
