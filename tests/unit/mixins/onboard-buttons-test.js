import Ember from 'ember';
import OnboardButtonsMixin from '../../../mixins/onboard-buttons';
import { module, test } from 'qunit';

module('OnboardButtonsMixin');

// Replace this with your real tests.
test('it works', function(assert) {
  var OnboardButtonsObject = Ember.Object.extend(OnboardButtonsMixin);
  var subject = OnboardButtonsObject.create();
  assert.ok(subject);
});
