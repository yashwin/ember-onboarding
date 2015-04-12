import Ember from 'ember';
import OnboardBindingsMixin from '../../../mixins/onboard-bindings';
import { module, test } from 'qunit';

module('OnboardBindingsMixin');

// Replace this with your real tests.
test('it works', function(assert) {
  var OnboardBindingsObject = Ember.Object.extend(OnboardBindingsMixin);
  var subject = OnboardBindingsObject.create();
  assert.ok(subject);
});
