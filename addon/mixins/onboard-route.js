import Ember from 'ember';

export default Ember.Mixin.create({
  onboard: Ember.inject.service(),

  tourListItems: null,
  onboardtart: null,

  setTourList: Ember.on('activate', function(){
    if (this.get('tourListItems')) {
      this.set('onboard.currentList', this.get('tourListItems'));
    }

    if (this.get('onboardtart')) {
      this.set('onboard.activeTour', this.get('onboardtart'));
    }
  }),

  cleanTourList: Ember.on('deactivate', function() {
    if (this.get('tourListItems')) {
      this.set('onboard.currentList', null);
    }
  })
});
