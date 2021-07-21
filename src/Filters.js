import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, useIntl } from 'react-intl';

import { Accordion, AccordionSet, FilterAccordionHeader, Selection } from '@folio/stripes/components';
import { IfPermission } from '@folio/stripes/core';
import { CheckboxFilter, MultiSelectionFilter } from '@folio/stripes/smart-components';
import { CustomPropertyFilters, DateFilter, InternalContactSelection, OrganizationSelection } from '@folio/stripes-erm-components';

const propTypes = {
  activeFilters: PropTypes.object,
  data: PropTypes.object.isRequired,
  filterHandlers: PropTypes.object,
};

const FILTERS = [
  'agreementStatus',
  'renewalPriority',
  'isPerpetual',
  'tags'
];

export default function Filters({ activeFilters, data, filterHandlers }) {
  const intl = useIntl();

  const [filterState, setFilterState] = useState({
    agreementStatus: [],
    renewalPriority: [],
    isPerpetual: [],
    tags: []
  });

  useEffect(() => {
    const newState = {};
    FILTERS.forEach(filter => {
      const values = data[`${filter}Values`];
      if (values.length !== filterState[filter]?.length) {
        newState[filter] = values;
      }
    });

    if ((data?.tagsValues?.length ?? 0) !== filterState.tags?.length) {
      newState.tags = data.tagsValues.map(({ label }) => ({ value: label, label }));
    }

    if (Object.keys(newState).length) {
      setFilterState(prevState => ({ ...prevState, ...newState }));
    }
  }, [data, filterState]);

  const renderCheckboxFilter = (name, props) => {
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
          dataOptions={filterState[name] || []}
          name={name}
          onChange={(group) => {
            filterHandlers.state({
              ...activeFilters,
              [group.name]: group.values
            });
          }}
          selectedValues={groupFilters}
        />
      </Accordion>
    );
  };

  const renderOrganizationFilter = () => {
    const orgFilters = activeFilters.orgs || [];

    return (
      <Accordion
        closedByDefault
        displayClearButton={orgFilters.length > 0}
        header={FilterAccordionHeader}
        id="organizations-filter"
        label={<FormattedMessage id="ui-plugin-find-agreement.prop.organizations" />}
        onClearFilter={() => {
          filterHandlers.state({
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
  };

  const renderOrganizationRoleFilter = () => {
    const roles = data.orgRoleValues;
    // TODO: TEST USING THE VALUES GENERATED IN GDSFP
    const dataOptions = roles.map(role => ({
      value: role.id,
      label: role.label,
    }));

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
        <FormattedMessage id="ui-plugin-find-agreement.organizations.selectRole">
          {placeholder => (
            <Selection
              dataOptions={dataOptions}
              onChange={value => filterHandlers.state({ ...activeFilters, role: [value] })}
              placeholder={typeof placeholder === 'string' ? placeholder : placeholder[0]}
              value={roleFilters[0] || ''}
            />
          )}
        </FormattedMessage>
      </Accordion>
    );
  };

  const renderInternalContactFilter = () => {
    const contactFilters = activeFilters.contacts || [];

    return (
      <IfPermission perm="users.collection.get">
        <Accordion
          closedByDefault
          displayClearButton={contactFilters.length > 0}
          header={FilterAccordionHeader}
          id="internal-contacts-filter"
          label={<FormattedMessage id="ui-plugin-find-agreement.agreements.internalContacts" />}
          onClearFilter={() => filterHandlers.clearGroup('contacts')}
          separator={false}
        >
          <InternalContactSelection
            id="agreement-internal-contacts-filter"
            input={{
              name: 'agreement-contacts-filter',
              onChange: value => filterHandlers.state({ ...activeFilters, contacts: [value] }),
              value: contactFilters[0] || '',
            }}
            path="erm/contacts"
          />
        </Accordion>
      </IfPermission>
    );
  };

  const renderInternalContactRoleFilter = () => {
    const contactRoles = data.contactRoleValues || [];
    const dataOptions = contactRoles.map(contactRole => ({
      value: contactRole.id,
      label: contactRole.label,
    }));
    const contactRoleFilters = activeFilters.contactRole || [];
    return (
      <Accordion
        closedByDefault
        displayClearButton={contactRoleFilters.length > 0}
        header={FilterAccordionHeader}
        id="internal-contacts-role-filter"
        label={<FormattedMessage id="ui-plugin-find-agreement.agreements.internalContactsRole" />}
        onClearFilter={() => { filterHandlers.clearGroup('contactRole'); }}
        separator={false}
      >
        <Selection
          dataOptions={dataOptions}
          id="agreement-internal-contacts-role-filter"
          onChange={value => filterHandlers.state({ ...activeFilters, contactRole: [value] })}
          value={contactRoleFilters[0] || ''}
        />
      </Accordion>
    );
  };

  const renderCustomPropertyFilters = () => {
    return <CustomPropertyFilters
      activeFilters={activeFilters}
      customProperties={data.supplementaryProperties || []}
      custPropName="supplementaryProperty"
      filterHandlers={filterHandlers}
    />;
  };

  const renderStartDateFilter = () => {
    return <DateFilter
      activeFilters={activeFilters}
      filterHandlers={filterHandlers}
      hideNoDateSetCheckbox
      name="startDate"
      resourceName={intl.formatMessage({ id: 'ui-plugin-find-agreement.agreements' }).toLowerCase()}
    />;
  };

  const renderEndDateFilter = () => {
    return <DateFilter
      activeFilters={activeFilters}
      filterHandlers={filterHandlers}
      name="endDate"
      resourceName={intl.formatMessage({ id: 'ui-plugin-find-agreement.agreements' }).toLowerCase()}
    />;
  };
  const renderTagsFilter = () => {
    // const tags = get(this.props.data, 'tagValues.records', []);
    // TODO: TEST USING THE VALUES GENERATED IN GDSFP
    // const dataOptions = tags.map(({ label }) => ({ value: label, label }));
    const tagFilters = activeFilters.tags || [];

    return (
      <Accordion
        closedByDefault
        displayClearButton={activeFilters.length > 0}
        header={FilterAccordionHeader}
        id="clickable-tags-filter"
        label={<FormattedMessage id="ui-plugin-find-agreement.prop.tags" />}
        onClearFilter={() => { filterHandlers.clearGroup('tags'); }}
        separator={false}
      >
        <MultiSelectionFilter
          dataOptions={filterState.tags || []}
          id="tags-filter"
          name="tags"
          onChange={e => filterHandlers.state({ ...activeFilters, tags: e.values })}
          selectedValues={tagFilters}
        />
      </Accordion>
    );
  };

  return (
    <AccordionSet>
      {renderCheckboxFilter('agreementStatus')}
      {renderCheckboxFilter('renewalPriority', { closedByDefault: true })}
      {renderCheckboxFilter('isPerpetual', { closedByDefault: true })}
      {renderStartDateFilter()}
      {renderEndDateFilter()}
      {renderOrganizationFilter()}
      {renderOrganizationRoleFilter()}
      {renderInternalContactFilter()}
      {renderInternalContactRoleFilter()}
      {renderTagsFilter()}
      {renderCustomPropertyFilters()}
    </AccordionSet>
  );
}

Filters.propTypes = propTypes;
Filters.defaultProps = {
  activeFilters: {}
};
