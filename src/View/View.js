import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { noop } from 'lodash';
import { FormattedMessage } from 'react-intl';

import {
  FormattedUTCDate,
  MultiColumnList,
  SearchField,
  Pane,
  Icon,
  Button,
  PaneMenu,
  Paneset,
} from '@folio/stripes/components';

import { AppIcon } from '@folio/stripes/core';

import {
  SearchAndSortQuery,
  SearchAndSortNoResultsMessage as NoResultsMessage,
  SearchAndSortSearchButton as FilterPaneToggle,
} from '@folio/stripes/smart-components';

import Filters from '../Filters';
import css from './View.css';

const Agreements = ({
  children,
  contentRef,
  data = {},
  onNeedMoreData,
  onSelectRow,
  queryGetter,
  querySetter,
  source,
  visibleColumns = [
    'name',
    'agreementStatus',
    'startDate',
    'endDate',
    'cancellationDeadline'
  ]
}) => {
  const [filterPaneIsVisible, setFilterPaneIsVisible] = useState(true);

  const searchField = useRef();
  useEffect(() => {
    if (searchField.current) {
      searchField.current.focus();
    }
  }, []); // This isn't particularly great, but in the interests of saving time migrating, it will have to do

  const query = queryGetter() || {};
  const count = source ? source.totalCount() : 0;
  const sortOrder = query.sort || '';

  const columnMapping = {
    name: <FormattedMessage id="ui-plugin-find-agreement.prop.name" />,
    agreementStatus: <FormattedMessage id="ui-plugin-find-agreement.prop.agreementStatus" />,
    startDate: <FormattedMessage id="ui-plugin-find-agreement.prop.periodStart" />,
    endDate: <FormattedMessage id="ui-plugin-find-agreement.prop.periodEnd" />,
    cancellationDeadline: <FormattedMessage id="ui-plugin-find-agreement.prop.cancellationDeadline" />,
  };

  const columnWidths = {
    name: 300,
    agreementStatus: 150,
    startDate: 120,
    endDate: 120,
    cancellationDeadline: 120,
  };

  const formatter = {
    agreementStatus: a => a?.agreementStatus?.label,
    startDate: a => <div data-test-start-date>{(a.startDate ? <FormattedUTCDate value={a.startDate} /> : '')}</div>,
    endDate: a => <div data-test-end-date>{(a.endDate ? <FormattedUTCDate value={a.endDate} /> : '')}</div>,
    cancellationDeadline: a => <div data-test-cancellation-deadline>{(a.cancellationDeadline ? <FormattedUTCDate value={a.cancellationDeadline} /> : '')}</div>,
  };

  const rowFormatter = (row) => {
    const { rowClass, rowData, rowIndex, rowProps = {}, cells } = row;

    return (
      <button
        key={`row-${rowIndex}`}
        className={rowClass}
        data-label={[
          rowData.name,
          formatter.agreementStatus(rowData),
        ].join('...')}
        type="button"
        {...rowProps}
      >
        {cells}
      </button>
    );
  };

  const toggleFilterPane = () => {
    setFilterPaneIsVisible(!filterPaneIsVisible);
  };

  const renderIsEmptyMessage = () => {
    if (!source) {
      return 'no source yet';
    }

    return (
      <div data-test-agreements-no-results-message>
        <NoResultsMessage
          filterPaneIsVisible
          searchTerm={query.query || ''}
          source={source}
          toggleFilterPane={noop}
        />
      </div>
    );
  };

  const renderResultsFirstMenu = (filters) => {
    const filterCount = filters.string !== '' ? filters.string.split(',').length : 0;
    const hideOrShowMessageId = filterPaneIsVisible ?
      'stripes-smart-components.hideSearchPane' : 'stripes-smart-components.showSearchPane';

    return (
      <PaneMenu>
        <FormattedMessage id="stripes-smart-components.numberOfFilters" values={{ count: filterCount }}>
          {appliedFiltersMessage => (
            <FormattedMessage id={hideOrShowMessageId}>
              {hideOrShowMessage => (
                <FilterPaneToggle
                  aria-label={`${hideOrShowMessage}...s${appliedFiltersMessage}`}
                  badge={!filterPaneIsVisible && filterCount ? filterCount : undefined}
                  onClick={toggleFilterPane}
                  visible={filterPaneIsVisible}
                />
              )}
            </FormattedMessage>
          )}
        </FormattedMessage>
      </PaneMenu>
    );
  };

  const renderResultsPaneSubtitle = () => {
    if (source && source.loaded()) {
      return <FormattedMessage id="stripes-smart-components.searchResultsCountHeader" values={{ count }} />;
    }

    return <FormattedMessage id="stripes-smart-components.searchCriteria" />;
  };

  return (
    <div ref={contentRef} data-test-agreements data-testid="containerView">
      <SearchAndSortQuery
        initialFilterState={{
          agreementStatus: ['active', 'draft', 'in_negotiation', 'requested']
        }}
        initialSearchState={{ query: '' }}
        initialSortState={{ sort: 'name' }}
        queryGetter={queryGetter}
        querySetter={querySetter}
        syncToLocationSearch={false}
      >
        {
          ({
            searchValue,
            getSearchHandlers,
            onSubmitSearch,
            onSort,
            getFilterHandlers,
            activeFilters,
            filterChanged,
            searchChanged,
            resetAll,
          }) => {
            const disableReset = () => (!filterChanged && !searchChanged);

            return (
              <Paneset
                id="agreements-paneset"
                isRoot
              >
                {filterPaneIsVisible &&
                  <Pane
                    defaultWidth="20%"
                    onClose={toggleFilterPane}
                    paneTitle={<FormattedMessage id="stripes-smart-components.searchAndFilter" />}
                  >
                    <form onSubmit={onSubmitSearch}>
                      {/* TODO: Use forthcoming <SearchGroup> or similar component */}
                      <div className={css.searchGroupWrap}>
                        <FormattedMessage id="ui-plugin-find-agreement.searchInputLabel">
                          {ariaLabel => (
                            <SearchField
                              aria-label={ariaLabel}
                              autoFocus
                              className={css.searchField}
                              data-test-agreement-search-input
                              id="input-agreement-search"
                              inputRef={searchField}
                              marginBottom0
                              name="query"
                              onChange={getSearchHandlers().query}
                              onClear={getSearchHandlers().reset}
                              value={searchValue.query}
                            />
                          )}
                        </FormattedMessage>
                        <Button
                          buttonStyle="primary"
                          disabled={!searchValue.query || searchValue.query === ''}
                          fullWidth
                          id="clickable-search-agreements"
                          marginBottom0
                          type="submit"
                        >
                          <FormattedMessage id="stripes-smart-components.search" />
                        </Button>
                      </div>
                      <div className={css.resetButtonWrap}>
                        <Button
                          buttonStyle="none"
                          disabled={disableReset()}
                          id="clickable-reset-all"
                          onClick={resetAll}
                        >
                          <Icon icon="times-circle-solid">
                            <FormattedMessage id="stripes-smart-components.resetAll" />
                          </Icon>
                        </Button>
                      </div>
                      <Filters
                        activeFilters={activeFilters.state}
                        data={data}
                        filterHandlers={getFilterHandlers()}
                      />
                    </form>
                  </Pane>
                }
                <Pane
                  appIcon={<AppIcon app="agreements" />}
                  defaultWidth="fill"
                  firstMenu={renderResultsFirstMenu(activeFilters)}
                  padContent={false}
                  paneSub={renderResultsPaneSubtitle()}
                  paneTitle={<FormattedMessage id="ui-plugin-find-agreement.agreements" />}
                >
                  <MultiColumnList
                    autosize
                    columnMapping={columnMapping}
                    columnWidths={columnWidths}
                    contentData={data.agreements}
                    formatter={formatter}
                    id="list-agreements"
                    isEmptyMessage={renderIsEmptyMessage()}
                    onHeaderClick={onSort}
                    onNeedMoreData={onNeedMoreData}
                    onRowClick={onSelectRow}
                    rowFormatter={rowFormatter}
                    sortDirection={sortOrder.startsWith('-') ? 'descending' : 'ascending'}
                    sortOrder={sortOrder.replace(/^-/, '').replace(/,.*/, '')}
                    totalCount={count}
                    virtualize
                    visibleColumns={visibleColumns}
                  />
                </Pane>
                {children}
              </Paneset>
            );
          }
        }
      </SearchAndSortQuery>
    </div>
  );
};

Agreements.propTypes = {
  children: PropTypes.object,
  contentRef: PropTypes.object,
  data: PropTypes.shape({
    agreements: PropTypes.arrayOf(PropTypes.object).isRequired,
  }),
  disableRecordCreation: PropTypes.bool,
  onNeedMoreData: PropTypes.func.isRequired,
  onSelectRow: PropTypes.func.isRequired,
  queryGetter: PropTypes.func.isRequired,
  querySetter: PropTypes.func.isRequired,
  searchString: PropTypes.string,
  source: PropTypes.shape({
    loaded: PropTypes.func,
    totalCount: PropTypes.func,
  }),
  visibleColumns: PropTypes.arrayOf(PropTypes.string),
};

export default Agreements;
