import React from 'react';
import { describe, beforeEach, it } from '@bigtest/mocha';
import chai from 'chai';
import faker from 'faker';
import spies from 'chai-spies';

import setupApplication, { mount } from '../helpers/helpers';
import PluginHarness from '../helpers/PluginHarness';
import FindAgreementInteractor from '../interactors/findAgreement';

chai.use(spies);
const { expect, spy } = chai;

const onAgreementSelected = spy();

const activeStatusAgreementsCount = 2;
const activeStatus = {
  agreementStatus: {
    id: faker.random.uuid(),
    label: 'Active',
    value: 'active'
  }
};

const draftStatusAgreementsCount = 3;
const draftStatus = {
  agreementStatus: {
    id: faker.random.uuid(),
    label: 'Draft',
    value: 'draft',
  }
};

const inNegotiationStatusAgreementsCount = 4;
const inNegotiationStatus = {
  agreementStatus: {
    id: faker.random.uuid(),
    label: 'In negotiation',
    value: 'in_negotiation',
  }
};

const requestedStatusAgreementsCount = 5;
const requestedStatus = {
  agreementStatus: {
    id: faker.random.uuid(),
    label: 'Requested',
    value: 'requested',
  }
};

const closedStatusAgreementsCount = 1;
const closedStatus = {
  agreementStatus: {
    id: faker.random.uuid(),
    label: 'Closed',
    value: 'closed',
  }
};

const definitelyRenewAgreementCount = 2;
const definitelyRenew = {
  renewalPriority: {
    id: faker.random.uuid(),
    label: 'Definitely renew',
    value: 'definitely_renew'
  }
};

const forReviewAgreementCount = 3;
const forReview = {
  renewalPriority: {
    id: faker.random.uuid(),
    label: 'For review',
    value: 'for_review'
  }
};

const definitelyCancelAgreementCount = 4;
const definitelyCancel = {
  renewalPriority: {
    id: faker.random.uuid(),
    label: 'Definitely cancel',
    value: 'definitely_cancel'
  }
};

const isPerpetualYesCount = 5;
const isPerpetualYes = {
  isPerpetual: {
    id: faker.random.uuid(),
    label: 'Yes',
    value: 'yes'
  }
};

const isPerpetualNoCount = 1;
const isPerpetualNo = {
  isPerpetual: {
    id: faker.random.uuid(),
    label: 'No',
    value: 'no'
  }
};

describe('UI-plugin-find-agreement', function () {
  const findAgreement = new FindAgreementInteractor();
  setupApplication();

  describe('plugin', function () {
    beforeEach(async function () {
      await mount(
        <PluginHarness
          onAgreementSelected={onAgreementSelected}
        />
      );
    });

    it('renders trigger button', function () {
      expect(findAgreement.button.isPresent).to.be.true;
    });

    describe('clicking the trigger button', function () {
      beforeEach(async function () {
        await this.server.createList('agreement', activeStatusAgreementsCount, activeStatus);
        await this.server.createList('agreement', draftStatusAgreementsCount, draftStatus);
        await this.server.createList('agreement', requestedStatusAgreementsCount, requestedStatus);
        await this.server.createList('agreement', inNegotiationStatusAgreementsCount, inNegotiationStatus);
        await this.server.createList('agreement', closedStatusAgreementsCount, closedStatus);
        await this.server.createList('agreement', definitelyRenewAgreementCount, definitelyRenew);
        await this.server.createList('agreement', forReviewAgreementCount, forReview);
        await this.server.createList('agreement', definitelyCancelAgreementCount, definitelyCancel);
        await this.server.createList('agreement', isPerpetualYesCount, isPerpetualYes);
        await this.server.createList('agreement', isPerpetualNoCount, isPerpetualNo);
        await findAgreement.button.click();
      });

      describe('should', function () {
        it('open a modal', function () {
          expect(findAgreement.modal.isPresent).to.be.true;
        });

        it('displays agrements list', function () {
          expect(findAgreement.modal.instances().length).to.equal(
            activeStatusAgreementsCount + draftStatusAgreementsCount + requestedStatusAgreementsCount + inNegotiationStatusAgreementsCount
          );
        });

        it('render the status filter', function () {
          expect(findAgreement.modal.isStatusFilterPresent).to.be.true;
        });

        it('render the renewal priority filter', function () {
          expect(findAgreement.modal.isRenewalPriorityFilterPresent).to.be.true;
        });

        it('render the is perpetual filter', function () {
          expect(findAgreement.modal.isIsPerpetualFilterPresent).to.be.true;
        });

        it('render the organizations filter', function () {
          expect(findAgreement.modal.isOrgsFilterPresent).to.be.true;
        });

        it('render the organizations role filter', function () {
          expect(findAgreement.modal.isOrgsRoleFilterPresent).to.be.true;
        });

        it('render the tags filter', function () {
          expect(findAgreement.modal.isTagsFilterPresent).to.be.true;
        });
      });

      describe('selecting an agreement', function () {
        beforeEach(async function () {
          await findAgreement.button.click();
          await findAgreement.modal.instances(1).click();
        });

        it('hides the modal', function () {
          expect(findAgreement.modal.isPresent).to.be.false;
        });

        it('calls the onAgreementSelected callback', function () {
          expect(onAgreementSelected).to.have.been.called();
        });
      });

      describe('clicking the close button', function () {
        beforeEach(async function () {
          await findAgreement.button.click();
          await findAgreement.closeButton.click();
        });

        it('hides the modal', function () {
          expect(findAgreement.modal.isPresent).to.be.false;
        });
      });

      describe('reset all filters', function () {
        beforeEach(async function () {
          await findAgreement.button.click();
          await findAgreement.clearButton.click();
        });

        describe('selecting closed status filter', function () {
          beforeEach(async function () {
            await findAgreement.modal.clickClosedFilter();
          });

          it('renders the expected number of agreements', function () {
            expect(findAgreement.modal.instances().length).to.equal(closedStatusAgreementsCount);
          });
        });

        describe('selecting draft status filter', function () {
          beforeEach(async function () {
            await findAgreement.modal.clickDraftFilter();
          });

          it('renders the expected number of agreements', function () {
            expect(findAgreement.modal.instances().length).to.equal(draftStatusAgreementsCount);
          });
        });

        describe('selecting requested status filter', function () {
          beforeEach(async function () {
            await findAgreement.modal.clickRequestedFilter();
          });

          it('renders the expected number of agreements', function () {
            expect(findAgreement.modal.instances().length).to.equal(requestedStatusAgreementsCount);
          });
        });

        describe('selecting in negotiation status filter', function () {
          beforeEach(async function () {
            await findAgreement.modal.clickInNegotiationFilter();
          });

          it('renders the expected number of agreements', function () {
            expect(findAgreement.modal.instances().length).to.equal(inNegotiationStatusAgreementsCount);
          });
        });

        describe('selecting active status filter', function () {
          beforeEach(async function () {
            await findAgreement.modal.clickActiveFilter();
          });

          it('renders the expected number of agreements', function () {
            expect(findAgreement.modal.instances().length).to.equal(activeStatusAgreementsCount);
          });
        });

        describe('selecting definitely renew filter', function () {
          beforeEach(async function () {
            await findAgreement.modal.clickDefinitelyRenewFilter();
          });

          it('renders the expected number of agreements', function () {
            expect(findAgreement.modal.instances().length).to.equal(definitelyRenewAgreementCount);
          });
        });

        describe('selecting for review filter', function () {
          beforeEach(async function () {
            await findAgreement.modal.clickForReviewFilter();
          });

          it('renders the expected number of agreements', function () {
            expect(findAgreement.modal.instances().length).to.equal(forReviewAgreementCount);
          });
        });

        describe('selecting definitely cancel filter', function () {
          beforeEach(async function () {
            await findAgreement.modal.clickDefinitelyCancelFilter();
          });

          it('renders the expected number of agreements', function () {
            expect(findAgreement.modal.instances().length).to.equal(definitelyCancelAgreementCount);
          });
        });

        describe('selecting isPerpetual yes filter', function () {
          beforeEach(async function () {
            await findAgreement.modal.clickisPerpetualYesFilter();
          });

          it('renders the expected number of agreements', function () {
            expect(findAgreement.modal.instances().length).to.equal(isPerpetualYesCount);
          });
        });

        describe('selecting isPerpetual no filter', function () {
          beforeEach(async function () {
            await findAgreement.modal.clickisPerpetualNoFilter();
          });

          it('renders the expected number of agreements', function () {
            expect(findAgreement.modal.instances().length).to.equal(isPerpetualNoCount);
          });
        });
      });
    });
    describe('filling in the searchField', function () {
      beforeEach(async function () {
        await findAgreement.button.click();
        await findAgreement.modal.searchField.fill('a');
      });

      it('enables the reset button', function () {
        expect(findAgreement.modal.resetButton.isEnabled).to.be.true;
      });

      it('enables the search button', function () {
        expect(findAgreement.modal.searchButton.isEnabled).to.be.true;
      });
    });
  });
});
