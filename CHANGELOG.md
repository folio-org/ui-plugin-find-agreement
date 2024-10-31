# Change history for ui-plugin-find-agreement

## 11.2.0 IN PROGRESS

## 11.1.0 2024-10-31
* ERM-3382 Update module license and guidance for ui-plugin-find-agreement
* ERM-3355 Review and cleanup Module Descriptor for ui-plugin-find-agreement
* ERM-3235 React v19: refactor ui-plugin-find-agreement away from default props for functional components
* ERM-3165 Replace moment with dayjs across app suite
* FOLIO-4086 Fix GitHub Actions workflow not running for tags

## 11.0.1 2024-03-22
* ERM-3129 Remove explicit typescript version
* Bumped folio dependencies
* *BREAKING* Change interface dependency for erm to just 7.0

## 10.0.0 2023-10-12
* ERM-3029 *BREAKING* bump `react-intl` to `v6.4.4`.
* ERM-3001 Update Node.js to v18 in GitHub Actions
* ERM-2908 Default filters displayed but not applied on opening ui-plugin-find-agreement
* ERM-2641 Upgrade to Grails 5 (including Hibernate 5.6.x) for Poppy
  * Added okapi interface dependency on new erm interface 6.0
* STRIPES-870 *BREAKING* upgrade react to v18
  * ERM-2987 upgrade ui-plugin-find-agreement React to v18

## 9.0.2 2023-02-22
* ERM-2614 Drop unneeded `react-redux`.
* ERM-2557 Increment ui-plugin-find-agreement to Stripes v8
* ERM-2530 Remove BigTest/Nightmare dependencies and tests (ui-plugin-find-agreement)
* ERM-2457 Bump ui-plugin-find-agreement erm-components dep
* ERM-2405 Add test coverage for ui-plugin-find-agreement <View>
* ERM-2404 Add test coverage for ui-plugin-find-agreement <Modal>
* ERM-2403 Add test coverage for ui-plugin-find-agreement <Filters>
* ERM-2402 Add test coverage for ui-plugin-find-agreement <Container>
* ERM-1304 Add test coverage for ui-plugin-find-agreement <AgreementSearch>
* Remove karma test options from github release actions

## 8.3.0 2022-10-26
* ERM-2374 Kint components dep not declared in ui-plugin-find-agreement
* ERM-2324 stripes-erm-components should be a peer
* ERM-2303 update outdated dependencies in ui-plugin-find-agreement
* ERM-2278 Refactor ui-plugin-find-agreement to react-query
* Bump to stripes-erm-components ^7.0.0

## 8.2.0 2022-07-04
* ERM-2101 Replace babel-eslint with @babel/eslint-parser

## 8.1.0 2022-03-03
* ERM-1994 Prepare Plugin Find Agreement for RTL development
* Updated stripes dependencies

## 8.0.0 2021-10-06
* Upgrade to stripes v7.
* Bring search options in ui-plugin-find-agreement in line with ui-agreements search and filter. ERM-1600
* Added descriptions to visible permission sets. ERM-1597
* Included interface dependency for erm 5.0

## 6.1.0 2021-06-16
* ERM-1597 Add descriptions to visible permission set in ui-plugin-find-agreement

## 6.0.0 2021-03-18
* Upgrade to Stripes 6.0
* Fixed issue with changing width. STCOM-749
* Bumped okapiInterface dep to erm 4.0
* Added devDep to stripes-cli

## 5.0.0 2020-10-15
* Upgrade to Stripes 5.0
* Added tests for the plugin. ERM-1111
* Fixed issue with date display. ERM-1153

## 4.0.0 2020-06-10
* Upgrade to Stripes 4.0
* Added translations
* Bumped the required node version to 10

## 3.2.0 2020-03-11
* Accessibility fixes
* Added translations
* Update to Stripes 3.0

## 3.1.0 2019-12-02
* Fixed clear button in search box.
* Added support for agreement periods.
* Added support for erm interface 2.0
* Added permission set

## 3.0.1 2019-04-06
* Added translations

## 3.0.0 2019-07-22
* Removed dependency on ui-agreements.

## 2.1.2 2019-06-10
* Added translations

## 2.1.1 2019-03-20
* Disabled record creation

## 2.1.0 2019-03-14
* Support custom trigger button rendering

## 2.0.0 2019-01-18
* Upgrade to Stripes 2.0

## 1.0.0 2019-01-13
* New plugin module created.
* Support selecting agreements
