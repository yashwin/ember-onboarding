import onboardOutlet from 'ember-onboarding/components/onboard-outlet';
import Ember from 'ember';

export default onboardOutlet.extend({
  createData: Ember.on('init', function () {
    var tours = this.get('onboard');

    var step1Text = ['Shepherd is a javascript library for guiding users through your app. It uses <a href="http://github.hubspot.com/tether/">Tether</a>, another open source library, to position all of its steps.', 'Tether makes sure your steps never end up off screen or cropped by an overflow. Try resizing your browser to see what we mean.'];
    var step2Text = 'Including Shepherd is easy! Just include shepherd.js, and a Shepherd theme file.';
    var step3Text = 'Creating a Shepherd is easy too! Just create Shepherd and add as many steps as you want. Check out the <a href="http://github.hubspot.com/shepherd">documentation</a> to learn more.';
    var step4Text = 'Star Shepherd on Github so you remember it for your next project';


    tours.createStep('welcome', {
      text: step1Text,
      classes: 'shepherd shepherd-open shepherd-theme-arrows shepherd-transparent-text'
    });

    tours.createStep('including', {
      title: 'Including',
      text: step2Text
    });

    tours.createStep('example', {
      title: 'Example Shepherd',
      text: step3Text
    });

    tours.createStep('followup', {
      title: 'Learn more',
      text: step4Text,
      attachTo: '.hero-including bottom'
    });

    tours.createTour('Example Tour', ['welcome', 'including', 'example', 'followup']);
    tours.createTour('Tour Contra', ['followup', 'example', 'including', 'welcome']);

    tours.set('defaultList', ['Example Tour', 'Tour Contra']);
  })
});
