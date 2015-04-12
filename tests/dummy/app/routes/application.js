import Ember from 'ember';
import TourList from 'ember-onboarding/mixins/onboard-route';

export default Ember.Route.extend(TourList, {
  tourStart: 'Example Tour'
});
