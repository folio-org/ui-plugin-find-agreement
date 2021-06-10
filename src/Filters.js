import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import { Accordion, AccordionSet, FilterAccordionHeader, Selection } from '@folio/stripes/components';
import { IfPermission } from '@folio/stripes/core';
import { CheckboxFilter, MultiSelectionFilter } from '@folio/stripes/smart-components';
import { CustomPropertyFilters, DateFilter, InternalContactSelection, OrganizationSelection } from '@folio/stripes-erm-components';

const FILTERS = [
  'agreementStatus',
  'renewalPriority',
  'isPerpetual',
  'tags'
];

export default class Filters extends React.Component {
  static propTypes = {
    activeFilters: PropTypes.object,
    data: PropTypes.object.isRequired,
    filterHandlers: PropTypes.object,
  };

  static defaultProps = {
    activeFilters: {}
  };

  state = {
    agreementStatus: [],
    renewalPriority: [],
    isPerpetual: [],
    tags: [],
  }

  static getDerivedStateFromProps(props, state) {
    const newState = {};

    FILTERS.forEach(filter => {
      const values = props.data[`${filter}Values`] || [];
      if (values.length !== state[filter].length) {
        newState[filter] = values.map(({ label }) => ({ label, value: label }));
      }
    });

    if (Object.keys(newState).length) return newState;

    return null;
  }

  renderCheckboxFilter = (name, props) => {
    const { activeFilters, filterHandlers } = this.props;
    const groupFilters = activeFilters[name] || [];

    return (
      <Accordion
        displayClearButton={groupFilters.length > 0}
        header={FilterAccordionHeader}
        id={`filter-accordion-${name}`}
        label={<FormattedMessage id={`ui-plugin-find-agreement.prop.${name}`} />}
        onClearFilter={() => { filterHandlers.clearGroup(name); }}
        separator={false}
        {...props}
      >
        <CheckboxFilter
          dataOptions={this.state[name]}
          name={name}
          onChange={(group) => {
            this.props.filterHandlers.state({
              ...activeFilters,
              [group.name]: group.values
            });
          }}
          selectedValues={groupFilters}
        />
      </Accordion>
    );
  }

  renderStartDateFilter = () => {
    const { activeFilters } = this.props;
    return <DateFilter
      activeFilters={activeFilters}
      filterHandlers={this.props.filterHandlers}
      hideNoDateSetCheckbox
      name="startDate"
    />;
  }

  renderEndDateFilter = () => {
    const { activeFilters } = this.props;
    return <DateFilter
      activeFilters={activeFilters}
      filterHandlers={this.props.filterHandlers}
      name="endDate"
    />;
  }

  renderOrganizationFilter = () => {
    const { activeFilters, filterHandlers } = this.props;
    const orgFilters = activeFilters.orgs || [];

    return (
      <Accordion
        closedByDefault
        displayClearButton={orgFilters.length > 0}
        header={FilterAccordionHeader}
        id="organizations-filter"
        label={<FormattedMessage id="ui-plugin-find-agreement.prop.organizations" />}
        onClearFilter={() => {
          this.props.filterHandlers.state({
            ...activeFilters,
            role: [],
            orgs: [],
          });
        }}
        separator={false}
      >
        <OrganizationSelection
          input={{
            name: 'agreement-orgs-filter',
            onChange: value => filterHandlers.state({ ...activeFilters, orgs: [value] }),
            value: orgFilters[0] || '',
          }}
        />
      </Accordion>
    );
  }

  renderOrganizationRoleFilter = () => {
    const roles = this.props.data.orgRoleValues;
    // TODO: TEST USING THE VALUES GENERATED IN GDSFP
    const dataOptions = roles.map(role => ({
      value: role.id,
      label: role.label,
    }));

    const { activeFilters, filterHandlers } = this.props;
    const orgFilters = activeFilters.orgs || [];
    const roleFilters = activeFilters.role || [];

    return (
      <Accordion
        closedByDefault
        displayClearButton={roleFilters.length > 0}
        header={FilterAccordionHeader}
        id="organization-role-filter"
        label={<FormattedMessage id="ui-plugin-find-agreement.prop.orgRole" />}
        onClearFilter={() => { filterHandlers.clearGroup('role'); }}
        separator={false}
      >
        <Selection
          dataOptions={dataOptions}
          disabled={orgFilters.length === 0}
          onChange={value => filterHandlers.state({ ...activeFilters, role: [value] })}
          value={roleFilters[0] || ''}
        />
      </Accordion>
    );
  }

  renderInternalContactFilter = () => {
    const { activeFilters, filterHandlers } = this.props;
    const contactFilters = activeFilters.contacts || [];

    return (
      <IfPermission perm="users.collection.get">
        <Accordion
          closedByDefault
          displayClearButton={contactFilters.length > 0}
          header={FilterAccordionHeader}
          id="internal-contacts-filter"
          label={<FormattedMessage id="ui-agreements.agreements.internalContacts" />}
          onClearFilter={() => filterHandlers.clearGroup('contacts')}
          separator={false}
        >
          <InternalContactSelection
            id="agreement-internal-contacts-filter"
            input={{
              name: 'agreement-contacts-filter',
              onChange: value => this.props.filterHandlers.state({ ...activeFilters, contacts: [value] }),
              value: contactFilters[0] || '',
            }}
            path="erm/contacts"
          />
        </Accordion>
      </IfPermission>
    );
  }

  renderInternalContactRoleFilter = () => {
    const { activeFilters, data } = this.props;
    const contactRoleFilters = activeFilters.contactRole || [];
    const contactRoles = data.contactRoleValues || [];
    const dataOptions = contactRoles.map(contactRole => ({
      value: contactRole.id,
      label: contactRole.label,
    }));

    return (
      <Accordion
        closedByDefault
        displayClearButton={contactRoleFilters.length > 0}
        header={FilterAccordionHeader}
        id="internal-contacts-role-filter"
        label={<FormattedMessage id="ui-agreements.agreements.internalContactsRole" />}
        onClearFilter={() => { this.props.filterHandlers.clearGroup('contactRole'); }}
        separator={false}
      >
        <Selection
          dataOptions={dataOptions}
          id="agreement-internal-contacts-role-filter"
          onChange={value => this.props.filterHandlers.state({ ...activeFilters, contactRole: [value] })}
          value={contactRoleFilters[0] || ''}
        />
      </Accordion>
    );
  }

  renderCustomPropertyFilters = () => {
    const { activeFilters } = this.props;
    return <CustomPropertyFilters
      activeFilters={activeFilters}
      customProperties={this.props.data.supplementaryProperties || []}
      custPropName="supplementaryProperty"
      filterHandlers={this.props.filterHandlers}
    />;
  }

  renderTagsFilter = () => {
    // const tags = get(this.props.data, 'tagValues.records', []);
    // TODO: TEST USING THE VALUES GENERATED IN GDSFP
    // const dataOptions = tags.map(({ label }) => ({ value: label, label }));
    const { activeFilters } = this.props;
    const tagFilters = activeFilters.tags || [];

    return (
      <Accordion
        closedByDefault
        displayClearButton={activeFilters.length > 0}
        header={FilterAccordionHeader}
        id="clickable-tags-filter"
        label={<FormattedMessage id="ui-plugin-find-agreement.prop.tags" />}
        onClearFilter={() => { this.props.filterHandlers.clearGroup('tags'); }}
        separator={false}
      >
        <MultiSelectionFilter
          dataOptions={this.state.tags}
          id="tags-filter"
          name="tags"
          onChange={e => this.props.filterHandlers.state({ ...activeFilters, tags: e.values })}
          selectedValues={tagFilters}
        />
      </Accordion>
    );
  }

  render() {
    return (
      <AccordionSet>
        {this.renderCheckboxFilter('agreementStatus')}
        {this.renderCheckboxFilter('renewalPriority', { closedByDefault: true })}
        {this.renderCheckboxFilter('isPerpetual', { closedByDefault: true })}
        {this.renderStartDateFilter()}
        {this.renderEndDateFilter()}
        {this.renderOrganizationFilter()}
        {this.renderOrganizationRoleFilter()}
        {this.renderInternalContactFilter()}
        {this.renderInternalContactRoleFilter()}
        {this.renderTagsFilter()}
        {this.renderCustomPropertyFilters()}

      </AccordionSet>
    );
  }
}
