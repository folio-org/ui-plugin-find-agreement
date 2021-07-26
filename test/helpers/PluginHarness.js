import React from 'react';
import { Pluggable } from '@folio/stripes/core';
import { Button } from '@folio/stripes/components';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';

const PluginHarness = ({ onAgreementSelected = () => { }, ...rest }) => {
  return (
    <Pluggable
      aria-haspopup="true"
      dataKey="agreements"
      id="clickable-find-agreement"
      marginTop0
      onAgreementSelected={onAgreementSelected}
      renderTrigger={(triggerProps) => {
        const buttonProps = {
          'aria-haspopup': 'true',
          'buttonStyle': 'primary',
          'id': 'find-agreement-btn',
          'name': 'dummy',
          'onClick': triggerProps.onClick,
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
      {...rest}
    />
  );
};

PluginHarness.propTypes = {
  onAgreementSelected: PropTypes.func
};

export default PluginHarness;
