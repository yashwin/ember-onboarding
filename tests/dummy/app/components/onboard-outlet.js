import onboardOutlet from 'ember-onboarding/components/onboard-outlet';
import Ember from 'ember';

export default onboardOutlet.extend({
  createData: Ember.on('init', function () {
    var tours = this.get('onboard');

    tours.createStep('records', 'Click here to create new bank accounts, expense categories,<br>' +
    ' assets, and so on', 'top');
    tours.createStep('transactions', 'Click here to create insert new transactions. Like when <br>' +
    ' you buy a new asset, or spend same money');
    tours.createStep('reports', 'After you create all your transactions, and the balance of<br>' +
    'your accounts match the balance here in Money Project, you can check the reports.<br>' +
    ' Click here and get a real picture of what happens with your money', 'right');
    tours.createStep('dashboard', 'this is the mais page, with useful charts to have a <br>' +
    'quick picture of your money');

    tours.createTour('Basic Features', ['records', 'transactions', 'reports', 'dashboard']);

    tours.set('defaultList', ['Basic Features', 'sdas']);
  })
});
