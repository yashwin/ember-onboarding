# Ember-onboarding

This is another Ember wrapper for the [shepherd](https://github.com/HubSpot/Shepherd), site tour, library.
But, why another? Because I need a tour addon based on same premises:
* It will be plugged into a (almost) finished project
* It can't mess up with my beautiful, organised, and fully working code (again, almost!)
* I don't need all the options that the [library](https://github.com/HubSpot/Shepherd) gives me, so the addon can be more simple, opinated.

If you need a ore robust tour addon, there another great options, like [ember-shepherd](https://github.com/rwwagner90/ember-shepherd), [ember-tour](https://github.com/Vestorly/ember-tour) and [ember-introjs](https://github.com/thefrontside/ember-introjs).
You can also thind many saas that will do the job.

## Getting started

To start, if you are using Ember CLI, simply run:
```bash
ember install:addon ember-onboard
```

Now you have to create your tours.
To do this, just create a new `component` extending `onboard-outlet`.
Next, put your tours and steps inside any function hooked to `init`.

```js
//components/onboard-outlet.js

import onboardOutlet from 'ember-onboarding/components/onboard-outlet';
import Ember from 'ember';

export default onboardOutlet.extend({
  createData: Ember.on('init', function () {
    var tours = this.get('onboard');

    tours.createStep('step1', 'this is the text for step 1');
    tours.createStep('step2', 'this is the text for step 2');
    tours.createStep('step3', 'this is the text for step 3');

    tours.createTour('Basic Tour 1', ['step1', 'step2', 'step3']);
    tours.createTour('Demo Tour 2', ['step3', 'step2', 'step1']);
  })
});
```

Then you have to identify the html elements that will receive each step.
By default, `ember-onboarding` attach to an element with the class `'tour-step-' + 'stepName'`.
In our case, you just have make this changes in your template:

```hbs
//templates/side-bar.hbs

...
<li class="tour-step-step1">
  {{#link-to 'step1'}} Got To Step 1{{/link-to}}
</li>
<li class="tour-step-step2">
  {{#link-to 'step2'}} Got To Step 2{{/link-to}}
</li>
<li class="tour-step-step3">
  {{#link-to 'step3'}} Got To Step 3{{/link-to}}
</li>
...
```

And you have to put the outlet in your application template:

```hbs
//templates/side-bar.hbs

...
{{outlet}}

{{onboard-outlet}}
..
```

That's it. Now, from any controller, you can activate your `Basic Tour 1`:

```js
//controllers/application.js
...
onboard: Ember.inject.service(),

actions: {
  startTour1: function () {
    this.set('onboard.activeTour', 'Basic Tour 1');
  },
  startTour1: function () {
    this.set('onboard.activeTour', 'Demo Tour 2');
  }
}
```

## More Options

### Sticky


### Routes Hooks


### Buttons


### Defaults


### Shepherd Options


### Route Changes
`ember-onboard` does note have any support for route changes.
You can make it work, but on your on.
To prevent `js errors`, you can `cancel` the current tour when the route changes.
There is a `mixin` that can do this for you:

```js
//app/router.js
...
import CancelTour from 'ember-onboarding/mixins/onboard-route';

var Router = Ember.Router.extend(CancelTour, {
  location: config.locationType
});
...
```


### Modal
There are no support for any kind of `modal` or `shadow`.
But you can achieve the result you want with css, and you see on shepherd's [demo](http://github.hubspot.com/shepherd/docs/welcome/).
This is the [css](https://github.com/HubSpot/shepherd/blob/master/docs/welcome/css/welcome.css) file that do this job.
Remenber that you need to wrap the main `outlet` in 2 elements, `hero-outer` and `hero-inner`.
Using `z-index` it' possible to achieve the `modal` behavior.
