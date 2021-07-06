import React from 'react';
import PropTypes from 'prop-types';

import { StripesConnectedSource } from '@folio/stripes/smart-components';
import { getSASParams, preventResourceRefresh } from '@folio/stripes-erm-components';

import View from './View';

const INITIAL_RESULT_COUNT = 100;
const RESULT_COUNT_INCREMENT = 100;
const RECORDS_PER_REQUEST = 100;

export default class Container extends React.Component {
  static manifest = Object.freeze({
    agreements: {
      type: 'okapi',
      path: 'erm/sas',
      records: 'results',
      recordsRequired: '%{resultCount}',
      perRequest: 100,
      limitParam: 'perPage',
      params: getSASParams({
        searchKey: 'name,alternateNames.name,description',
        filterKeys: {
          agreementStatus: 'agreementStatus.value',
          contactRole: 'contacts.role',
          contacts: 'contacts.user',
          isPerpetual: 'isPerpetual.value',
          orgs: 'orgs.org',
          role: 'orgs.roles.role',
          tags: 'tags.value',
        },
        sortKeys: {
          agreementStatus: 'agreementStatus.label',
        },
        queryGetter: r => r.agreementSearchParams,
      }),
    },
    contactRoleValues: {
      type: 'okapi',
      path: 'erm/refdata/InternalContact/role',
      limitParam: 'perPage',
      perRequest: RECORDS_PER_REQUEST,
      shouldRefresh: () => false,
    },
    agreementStatusValues: {
      type: 'okapi',
      path: 'erm/refdata/SubscriptionAgreement/agreementStatus',
      shouldRefresh: () => false,
    },
    renewalPriorityValues: {
      type: 'okapi',
      path: 'erm/refdata/SubscriptionAgreement/renewalPriority',
      shouldRefresh: () => false,
    },
    isPerpetualValues: {
      type: 'okapi',
      path: 'erm/refdata/SubscriptionAgreement/isPerpetual',
      shouldRefresh: () => false,
    },
    orgRoleValues: {
      type: 'okapi',
      path: 'erm/refdata/SubscriptionAgreementOrg/role',
      shouldRefresh: () => false,
    },
    supplementaryProperties: {
      type: 'okapi',
      path: 'erm/custprops',
      shouldRefresh: preventResourceRefresh({ 'agreement': ['DELETE'] }),
    },
    tagsValues: {
      type: 'okapi',
      path: 'tags?limit=100',
      records: 'tags',
    },
    agreementSearchParams: {
      initialValue: {
        filters: 'agreementStatus.Active',
        sort: 'name',
      }
    },
    resultCount: { initialValue: INITIAL_RESULT_COUNT },
  });

  static propTypes = {
    mutator: PropTypes.object,
    onSelectRow: PropTypes.func.isRequired,
    resources: PropTypes.object,
    stripes: PropTypes.shape({
      logger: PropTypes.object,
    }),
  }

  constructor(props) {
    super(props);

    this.logger = props.stripes.logger;
    this.searchField = React.createRef();
  }

  componentDidMount() {
    this.source = new StripesConnectedSource(this.props, this.logger, 'agreements');

    if (this.searchField.current) {
      this.searchField.current.focus();
    }

    this.props.mutator.agreementSearchParams.update({
      filters: 'agreementStatus.Active,agreementStatus.Draft,agreementStatus.In negotiation,agreementStatus.Requested',
    });
  }

  handleNeedMoreData = () => {
    if (this.source) {
      this.source.fetchMore(RESULT_COUNT_INCREMENT);
    }
  }

  querySetter = ({ nsValues, state }) => {
    if (/reset/.test(state.changeType)) {
      this.props.mutator.agreementSearchParams.replace(nsValues);
    } else {
      this.props.mutator.agreementSearchParams.update(nsValues);
    }
  }

  queryGetter = () => {
    return this.props.resources?.agreementSearchParams ?? {};
  }

  render() {
    const { onSelectRow, resources } = this.props;

    if (this.source) {
      this.source.update(this.props, 'agreements');
    }

    return (
      <View
        data={{
          agreements: resources?.agreements?.records ?? [],
          agreementStatusValues: resources?.agreementStatusValues?.records ?? [],
          renewalPriorityValues: resources?.renewalPriorityValues?.records ?? [],
          isPerpetualValues: resources?.isPerpetualValues?.records ?? [],
          orgRoleValues: resources?.orgRoleValues?.records ?? [],
          contactRoleValues: resources?.contactRoleValues?.records ?? [],
          tagsValues: resources?.tagsValues?.records ?? [],
          supplementaryProperties: resources?.supplementaryProperties?.records ?? []
        }}
        onNeedMoreData={this.handleNeedMoreData}
        onSelectRow={onSelectRow}
        queryGetter={this.queryGetter}
        querySetter={this.querySetter}
        source={this.source}
        syncToLocationSearch={false}
      />
    );
  }
}
