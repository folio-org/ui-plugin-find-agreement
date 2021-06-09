import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import { Accordion, AccordionSet, FilterAccordionHeader, Selection } from '@folio/stripes/components';
import { CheckboxFilter, MultiSelectionFilter } from '@folio/stripes/smart-components';
import { OrganizationSelection } from '@folio/stripes-erm-components';

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

export default function AgreementFilters({ activeFilters, data, filterHandlers }) {
  // const intl = useIntl();

  const [filterState, setFilterState] = useState({
    agreementStatus: [],
    renewalPriority: [],
    isPerpetual: [],
    tags: []
  });

  // const defaultProps = {
  //   activeFilters: {}
  // };

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
    // const { activeFilters } = this.props;
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
          dataOptions={filterState[name]}
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
    // const { activeFilters } = props;
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

    // const { activeFilters } = props;
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
  };

  const renderTagsFilter = () => {
    // const tags = get(this.props.data, 'tagValues.records', []);
    // TODO: TEST USING THE VALUES GENERATED IN GDSFP
    // const dataOptions = tags.map(({ label }) => ({ value: label, label }));
    // const { activeFilters } = props;
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
          dataOptions={filterState.tags}
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
      {/* {renderStartDateFilter()} */}
      {/* {this.renderEndDateFilter()} */}
      {renderOrganizationFilter()}
      {renderOrganizationRoleFilter()}
      {/* {this.renderInternalContactFilter()} */}
      {/* {this.renderInternalContactRoleFilter()} */}
      {renderTagsFilter()}
      {/* {this.renderCustomPropertyFilters()} */}
    </AccordionSet>
  );
}
AgreementFilters.propTypes = propTypes;
AgreementFilters.defaultProps = {
  activeFilters: {}
};


