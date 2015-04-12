import Ember from 'ember';
import OnboardBuildMixin from '../../../mixins/onboard-build';
import { module, test } from 'qunit';

module('OnboardBuildMixin');

// Replace this with your real tests.
test('it works', function(assert) {
  var OnboardBuildObject = Ember.Object.extend(OnboardBuildMixin);
  var subject = OnboardBuildObject.create();
  assert.ok(subject);
});
