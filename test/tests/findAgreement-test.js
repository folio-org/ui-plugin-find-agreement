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
        await findAgreement.button.click();
      });

      it('opens a modal', function () {
        expect(findAgreement.modal.isPresent).to.be.true;
      });

      it('should render the status filter', function () {
        expect(findAgreement.modal.isStatusFilterPresent).to.be.true;
      });

      it('should render the renewal priority filter', function () {
        expect(findAgreement.modal.isRenewalPriorityFilterPresent).to.be.true;
      });

      it('should render the is perpetual filter', function () {
        expect(findAgreement.modal.isIsPerpetualFilterPresent).to.be.true;
      });

      it('should render the organizations filter', function () {
        expect(findAgreement.modal.isOrgsFilterPresent).to.be.true;
      });

      it('should render the organizations role filter', function () {
        expect(findAgreement.modal.isOrgsRoleFilterPresent).to.be.true;
      });

      it('should render the tags filter', function () {
        expect(findAgreement.modal.isTagsFilterPresent).to.be.true;
      });
    });
  });
});
