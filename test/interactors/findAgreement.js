import {
  interactor,
  scoped,
  collection,
  clickable,
  fillable,
  is,
  isPresent,
} from '@bigtest/interactor';

import css from '../../src/AgreementSearch.css';

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

  clickPackagesFilter = clickable('#clickable-filter-class-package');
  clickNonPackagesFilter = clickable('#clickable-filter-class-nopackage');
  clickJournalFilter = clickable('#clickable-filter-type-journal');
  clickBookFilter = clickable('#clickable-filter-type-book');

  instances = collection('[role="rowgroup"] [role="row"]', {
    click: clickable('[role=gridcell]'),
  });

  resetButton = scoped('#clickable-reset-all', {
    isEnabled: is(':not([disabled])'),
    click: clickable()
  });

  searchField = scoped('[data-test-eresource-search-input]', SearchField);
  searchButton = scoped('#clickable-search-eresources', {
    click: clickable(),
    isEnabled: is(':not([disabled])'),
  });
}

@interactor class FindEresourceInteractor {
  button = scoped('[data-test-plugin-agreement-button]', {
    click: clickable(),
  });

  closeButton = scoped('#plugin-find-eresource-modal-close-button', {
    click: clickable(),
  });

  modal = new PluginModalInteractor(`.${css.modalContent}`);
}

export default FindEresourceInteractor;
