import React from 'react';
import PropTypes from 'prop-types';
import { Button, Icon } from '@folio/stripes/components';

class AgreementSearch extends React.Component {
  static propTypes = {
    searchButtonLabel: PropTypes.node,
    searchButtonStyle: PropTypes.string,
  }

  static defaultProps = {
    searchButtonLabel: <Icon icon="search" color="#fff" />,
    searchButtonStyle: 'primary noRightRadius',
  };

  render() {
    return (
      <Button
        id="clickable-find-agreement"
        buttonStyle={this.props.searchButtonStyle}
        onClick={this.openModal}
      >
        {this.props.searchButtonLabel}
      </Button>
    );
  }
}

export default AgreementSearch;
