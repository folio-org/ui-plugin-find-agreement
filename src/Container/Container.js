import { useMemo, useState } from 'react';
import PropTypes from 'prop-types';

import { generateKiwtQueryParams, useRefdata } from '@k-int/stripes-kint-components';

import { useOkapiKy } from '@folio/stripes/core';
import { getRefdataValuesByDesc, useTags, useInfiniteFetch } from '@folio/stripes-erm-components';

import View from '../View';

const AGREEMENTS_ENDPOINT = 'erm/sas';

const INITIAL_RESULT_COUNT = 100;

const [
  AGREEMENT_STATUS,
  RENEWAL_PRIORITY,
  IS_PERPETUAL,
  CONTACT_ROLE,
  ORG_ROLE
] = [
  'SubscriptionAgreement.AgreementStatus',
  'SubscriptionAgreement.RenewalPriority',
  'Global.Yes_No',
  'InternalContact.Role',
  'SubscriptionAgreementOrg.Role',
];

const Container = ({ onSelectRow }) => {
  const ky = useOkapiKy();

  const { data: { tagsValues = [] } = {} } = useTags();

  // We only need local session query here, use state
  const [query, setQuery] = useState({});
  const querySetter = ({ nsValues }) => {
    setQuery({ ...query, ...nsValues });
  };
  const queryGetter = () => query;

  const refdata = useRefdata({
    desc: [
      AGREEMENT_STATUS,
      RENEWAL_PRIORITY,
      IS_PERPETUAL,
      CONTACT_ROLE,
      ORG_ROLE
    ],
    endpoint: 'erm/refdata'
  });

  const agreementsQueryParams = useMemo(() => (
    generateKiwtQueryParams({
      searchKey: 'name,alternateNames.name,description',
      filterKeys: {
        agreementStatus: 'agreementStatus.value',
        contacts: 'contacts.user',
        contactRole: 'contacts.role',
        isPerpetual: 'isPerpetual.value',
        orgs: 'orgs.org',
        renewalPriority: 'renewalPriority.value',
        role: 'orgs.roles.role',
        tags: 'tags.value',
      },
      sortKeys: {
        agreementStatus: 'agreementStatus.label',
      },
      perPage: INITIAL_RESULT_COUNT
    }, (query ?? {}))
  ), [query]);

  const {
    infiniteQueryObject: {
      error: agreementsError,
      fetchNextPage: fetchNextAgreementPage,
      isLoading: areAgreementsLoading,
      isError: isAgreementsError
    },
    results: agreements = [],
    total: agreementsCount = 0
  } = useInfiniteFetch(
    ['ERM', 'Agreements', agreementsQueryParams, AGREEMENTS_ENDPOINT],
    ({ pageParam = 0 }) => {
      const params = [...agreementsQueryParams, `offset=${pageParam}`];
      return ky.get(`${AGREEMENTS_ENDPOINT}?${params?.join('&')}`).json();
    }
  );

  return (
    <View
      data={{
        agreements,
        agreementStatusValues: getRefdataValuesByDesc(refdata, AGREEMENT_STATUS),
        renewalPriorityValues: getRefdataValuesByDesc(refdata, RENEWAL_PRIORITY),
        isPerpetualValues: getRefdataValuesByDesc(refdata, IS_PERPETUAL),
        orgRoleValues: getRefdataValuesByDesc(refdata, ORG_ROLE),
        contactRoleValues: getRefdataValuesByDesc(refdata, CONTACT_ROLE),
        tagsValues,
      }}
      onNeedMoreData={(_askAmount, index) => fetchNextAgreementPage({ pageParam: index })}
      onSelectRow={onSelectRow}
      queryGetter={queryGetter}
      querySetter={querySetter}
      source={{ // Fake source from useQuery return values;
        totalCount: () => agreementsCount,
        loaded: () => !areAgreementsLoading,
        pending: () => areAgreementsLoading,
        failure: () => isAgreementsError,
        failureMessage: () => agreementsError.message
      }}
      syncToLocationSearch={false}
    />
  );
};

Container.propTypes = {
  onSelectRow: PropTypes.func.isRequired,
};

export default Container;
