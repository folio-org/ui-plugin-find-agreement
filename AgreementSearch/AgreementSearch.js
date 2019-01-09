import React from 'react';
import PropTypes from 'prop-types';
import { Button, Icon } from '@folio/stripes/components';
import AgreementSearchModal from './AgreementSearchModal';

class AgreementSearch extends React.Component {
  static propTypes = {
    searchButtonLabel: PropTypes.node,
    searchButtonStyle: PropTypes.string,
  };

  static defaultProps = {
    searchButtonStyle: 'primary noRightRadius',
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

  render() {
    return (
      <React.Fragment>
        <Button
          id="clickable-find-agreement"
          buttonStyle={this.props.searchButtonStyle}
          onClick={this.openModal}
        >
          <Icon icon="search" color="#fff">
            {this.props.searchButtonLabel}
          </Icon>
        </Button>
        <AgreementSearchModal
          open={this.state.open}
          onClose={this.closeModal}
          {...this.props}
        />
      </React.Fragment>

    );
  }
}

export default AgreementSearch;
