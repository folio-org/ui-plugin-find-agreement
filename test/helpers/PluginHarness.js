import React from 'react';
import noop from 'lodash/noop';
import { Pluggable } from '@folio/stripes/core';
import { Button } from '@folio/stripes/components';
import { FormattedMessage } from 'react-intl';

class PluginHarness extends React.Component {
  render() {
    return (
      <Pluggable
        aria-haspopup="true"
        dataKey="agreements"
        id="clickable-find-agreement"
        marginTop0
        onAgreementSelected={this.props.onAgreementSelected}
        renderTrigger={(props) => {
          const buttonProps = {
            'aria-haspopup': 'true',
            'buttonStyle': 'primary',
            'id': 'find-agreement-btn',
            'name': 'dummy',
            'onClick': props.onClick,
            'marginBottom0': true
          };

          return (
            <Button
              data-test-plugin-agreement-button
              {...buttonProps}
            >
              <FormattedMessage id="ui-plugin-find-agreement.selectAgreement" />
            </Button>
          );
        }}
        searchButtonStyle="link"
        searchLabel="Look up agreements"
        type="find-agreement"
        {...this.props}
      />
    );
  }
}

export default PluginHarness;
