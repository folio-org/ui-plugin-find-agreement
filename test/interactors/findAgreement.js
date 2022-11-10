import {
  interactor,
  scoped,
  collection,
  clickable,
  fillable,
  is,
  isPresent,
  text
} from '@bigtest/interactor';

import css from '../../src/AgreementSearch/AgreementSearch.css';

@interactor class SearchField {
  static defaultScope = '[data-test-agreement-search-input]';
  fill = fillable();
}

@interactor class PluginModalInteractor {
  isStatusFilterPresent = isPresent('#accordion-toggle-button-filter-accordion-agreementStatus')
  isRenewalPriorityFilterPresent = isPresent('#accordion-toggle-button-filter-accordion-renewalPriority')
  isIsPerpetualFilterPresent = isPresent('#accordion-toggle-button-filter-accordion-isPerpetual');
  isOrgsFilterPresent = isPresent('#accordion-toggle-button-organizations-filter');
  isOrgsRoleFilterPresent = isPresent('#accordion-toggle-button-organization-role-filter');
  isInternalContactsFilterPresent = isPresent('#accordion-toggle-button-internal-contacts-filter');
  isInternalContactRoleFilterPresent = isPresent('#accordion-toggle-button-internal-contacts-role-filter');
  isTagsFilterPresent = isPresent('#accordion-toggle-button-clickable-tags-filter');
  isSupplementaryPropertiesFilterPresent = isPresent('#accordion-toggle-button-clickable-custprop-filter');

  clickClosedFilter = clickable('#clickable-filter-agreementStatus-closed');
  clickDraftFilter = clickable('#clickable-filter-agreementStatus-draft');
  clickRequestedFilter = clickable('#clickable-filter-agreementStatus-requested');
  clickInNegotiationFilter = clickable('#clickable-filter-agreementStatus-in-negotiation');
  clickActiveFilter = clickable('#clickable-filter-agreementStatus-active');

  clickDefinitelyRenewFilter = clickable('#clickable-filter-renewalPriority-definitely-renew');
  clickForReviewFilter = clickable('#clickable-filter-renewalPriority-for-review');
  clickDefinitelyCancelFilter = clickable('#clickable-filter-renewalPriority-definitely-cancel');
  clickisPerpetualYesFilter = clickable('#clickable-filter-isPerpetual-yes');
  clickisPerpetualNoFilter = clickable('#clickable-filter-isPerpetual-no');

  instances = collection('[role="rowgroup"] [role="row"]', {
    click: clickable('[role=gridcell]'),
    startDate: text('[data-test-start-date]'),
    endDate: text('[data-test-end-date]'),
    cancellationDeadline: text('[data-test-cancellation-deadline]'),
  });

  resetButton = scoped('#clickable-reset-all', {
    isEnabled: is(':not([disabled])'),
    click: clickable()
  });

  searchField = scoped('[data-test-agreement-search-input]', SearchField);
  searchButton = scoped('#clickable-search-agreements', {
    click: clickable(),
    isEnabled: is(':not([disabled])'),
  });
}

@interactor class FindAgreementInteractor {
  button = scoped('[data-test-plugin-agreement-button]', {
    click: clickable(),
  });

  closeButton = scoped('#plugin-find-agreement-modal-close-button', {
    click: clickable(),
  });

  clearButton = scoped('[data-test-clear-button]', {
    click: clickable(),
  });

  modal = new PluginModalInteractor(`.${css.modalContent}`);
}

export default FindAgreementInteractor;
