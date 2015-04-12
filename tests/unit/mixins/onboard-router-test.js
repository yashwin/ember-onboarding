import Ember from 'ember';
import OnboardRouterMixin from '../../../mixins/onboard-router';
import { module, test } from 'qunit';

module('OnboardRouterMixin');

// Replace this with your real tests.
test('it works', function(assert) {
  var OnboardRouterObject = Ember.Object.extend(OnboardRouterMixin);
  var subject = OnboardRouterObject.create();
  assert.ok(subject);
});
