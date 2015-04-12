import Ember from 'ember';
import OnboardRouteMixin from '../../../mixins/onboard-route';
import { module, test } from 'qunit';

module('OnboardRouteMixin');

// Replace this with your real tests.
test('it works', function(assert) {
  var OnboardRouteObject = Ember.Object.extend(OnboardRouteMixin);
  var subject = OnboardRouteObject.create();
  assert.ok(subject);
});
