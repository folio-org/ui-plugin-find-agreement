import React from 'react';
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

import Filters from './Filters';
import css from './View.css';

export default class Agreements extends React.Component {
  static propTypes = {
    children: PropTypes.object,
    contentRef: PropTypes.object,
    data: PropTypes.shape({
      agreements: PropTypes.array.isRequired,
      agreementStatusValues: PropTypes.array.isRequired,
      renewalPriorityValues: PropTypes.array.isRequired,
      isPerpetualValues: PropTypes.array.isRequired,
      orgRoleValues: PropTypes.array.isRequired,
      tagsValues: PropTypes.array.isRequired,
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
  }

  static defaultProps = {
    data: {},
    searchString: '',
    visibleColumns: [
      'name',
      'agreementStatus',
      'startDate',
      'endDate',
      'cancellationDeadline'
    ],
  }

  state = {
    filterPaneIsVisible: true,
  }

  columnMapping = {
    name: <FormattedMessage id="ui-plugin-find-agreement.prop.name" />,
    agreementStatus: <FormattedMessage id="ui-plugin-find-agreement.prop.agreementStatus" />,
    startDate: <FormattedMessage id="ui-plugin-find-agreement.prop.periodStart" />,
    endDate: <FormattedMessage id="ui-plugin-find-agreement.prop.periodEnd" />,
    cancellationDeadline: <FormattedMessage id="ui-plugin-find-agreement.prop.cancellationDeadline" />,
  }

  columnWidths = {
    name: 300,
    agreementStatus: 150,
    startDate: 120,
    endDate: 120,
    cancellationDeadline: 120,
  }

  formatter = {
    agreementStatus: a => a?.agreementStatus?.label,
    startDate: a => (a.startDate ? <FormattedUTCDate value={a.startDate} /> : ''),
    endDate: a => (a.endDate ? <FormattedUTCDate value={a.endDate} /> : ''),
    cancellationDeadline: a => (a.cancellationDeadline ? <FormattedUTCDate value={a.cancellationDeadline} /> : ''),
  }

  rowFormatter = (row) => {
    const { rowClass, rowData, rowIndex, rowProps = {}, cells } = row;

    return (
      <button
        key={`row-${rowIndex}`}
        className={rowClass}
        data-label={[
          rowData.name,
          this.formatter.agreementStatus(rowData),
        ].join('...')}
        type="button"
        {...rowProps}
      >
        {cells}
      </button>
    );
  }

  toggleFilterPane = () => {
    this.setState(curState => ({
      filterPaneIsVisible: !curState.filterPaneIsVisible,
    }));
  }

  renderIsEmptyMessage = (query, source) => {
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
  }

  renderResultsFirstMenu = (filters) => {
    const { filterPaneIsVisible } = this.state;
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
                  onClick={this.toggleFilterPane}
                  visible={filterPaneIsVisible}
                />
              )}
            </FormattedMessage>
          )}
        </FormattedMessage>
      </PaneMenu>
    );
  }

  renderResultsPaneSubtitle = (source) => {
    if (source && source.loaded()) {
      const count = source ? source.totalCount() : 0;
      return <FormattedMessage id="stripes-smart-components.searchResultsCountHeader" values={{ count }} />;
    }

    return <FormattedMessage id="stripes-smart-components.searchCriteria" />;
  }

  render() {
    const {
      children,
      contentRef,
      data,
      onNeedMoreData,
      onSelectRow,
      queryGetter,
      querySetter,
      source,
      visibleColumns,
    } = this.props;

    const query = queryGetter() || {};
    const count = source ? source.totalCount() : 0;
    const sortOrder = query.sort || '';

    return (
      <div ref={contentRef} data-test-agreements>
        <SearchAndSortQuery
          initialFilterState={{
            agreementStatus: ['Active', 'Draft', 'In negotiation', 'Requested']
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
                <Paneset id="agreements-paneset">
                  {this.state.filterPaneIsVisible &&
                    <Pane
                      defaultWidth="20%"
                      onClose={this.toggleFilterPane}
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
                                inputRef={this.searchField}
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
                    firstMenu={this.renderResultsFirstMenu(activeFilters)}
                    padContent={false}
                    paneSub={this.renderResultsPaneSubtitle(source)}
                    paneTitle={<FormattedMessage id="ui-plugin-find-agreement.agreements" />}
                  >
                    <MultiColumnList
                      autosize
                      columnMapping={this.columnMapping}
                      columnWidths={this.columnWidths}
                      contentData={data.agreements}
                      formatter={this.formatter}
                      id="list-agreements"
                      isEmptyMessage={this.renderIsEmptyMessage(query, source)}
                      onHeaderClick={onSort}
                      onNeedMoreData={onNeedMoreData}
                      onRowClick={onSelectRow}
                      // rowFormatter={this.rowFormatter}
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
  }
}
