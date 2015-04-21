# Ember-onboarding

#### [Demo](http://thiagoc7.github.io/ember-onboarding/)
This is another Ember wrapper for the [shepherd](https://github.com/HubSpot/Shepherd), site tour, library.

But, why another? Because I need a tour addon based on same premises:
* It will be plugged into a (almost) finished project
* It can't mess up with my beautiful, organised, and fully working code (again, almost!)
* I don't need all the options that the [library](https://github.com/HubSpot/Shepherd) gives me, so the addon can be more simple, opinated.

If you need a ore robust tour addon, there another great options, like [ember-shepherd](https://github.com/rwwagner90/ember-shepherd), [ember-tour](https://github.com/Vestorly/ember-tour) and [ember-introjs](https://github.com/thefrontside/ember-introjs).
You can also find many saas that will do the job.

## Getting started

For Ember CLI >= 0.2.3:
```bash
ember install ember-onboarding
```

For Ember CLI < 0.2.3
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
//templates/application.hbs

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
  startTour2: function () {
    this.set('onboard.activeTour', 'Demo Tour 2');
  }
}
```

## More Options

### Sticky
`ember-onboarding` provides an optional `onboard-sticky` component, that can be used to quickly get a help element, like on [gh-pages](http://thiagoc7.github.io/ember-onboarding/). It works with `onboard-list` component, so you have a complete solution.

The `onboard-list` component publish a list from one of 2 fonts (array of strings):
* `'onboard.currentList'`, that you can set from any route (more on this latter)
* `'onboard.defaultList'`, that is used when you don' have a `currentList`
* There is also a `textForNullList` property, to avoid an empty sticky.

In our example, to make `sticky` works is very simple.

```js
//components/onboard-outlet.js

...
export default onboardOutlet.extend({
  createData: Ember.on('init', function () {
  ...
  tours.set('defaultList', ['Basic Tour 1', 'Demo Tour 2']);

  })
});
```

```hbs
//templates/application.hbs

...
{{outlet}}

{{#onboard-outlet}}
  {{#onboard-sticky}}
    {{onboard-list}}
  {{/onboard-sticky}}
{{/onboard-outlet}}
...
```

### Routes Hooks
In any `route`, you can import `onboard-route` mixin, set the `list` for this route, and a `tour` to start with the route.

```js
//app/routes/dummy-route.js
...
import TourHelp from 'ember-onboarding/mixins/onboard-route';

export default Ember.Route.extend(TourHelp, {
  tourListItems: ['Demo Tour 2', 'Basic Tour 1'],
  tourStart: 'Demo Tour 2'
...
});
```


### Buttons
Buttons are built with one of tree functions, `buttonStart`, `buttonMiddle`, `buttonEnd`, defined in this [mixin](https://github.com/thiagoc7/ember-onboarding/blob/master/addon/mixins/onboard-buttons.js).

For now you can't choose one kind of button for each step, but you can override it in your `onboard-outlet` component.

```js
//components/onboard-outlet.js

...
export default onboardOutlet.extend({
  createData: Ember.on('init', function () {
  ...
  }),
  
  buttonMiddle: function (tour) {
      return [
        {
          classes: 'shepherd-button-primary',
          text: 'Cancel',
          action: tour.cancel
        },
        {
          text: 'Next',
          action: tour.next
        }
      ];
    },
});
```

### Defaults
You can change the defaults of the `onboard service` **before** creating your tours, in your  `onboard-outlet` component.

```js
//components/onboard-outlet.js

...
export default onboardOutlet.extend({
  createData: Ember.on('init', function () {
    var tours = this.get('onboard');
    
    tours.set('classes', 'shepherd-theme-dark'); //remember to import css from shepherd.js
    tours.set('scrollTo', true);
    tours.set('showCancelLink', false);
    tours.set('attachToSlug', '.tour-step-1234-');
  
    tours.createStep('step1', 'this is the text for step 1');
  ...
  })
});
```

### Shepherd Options
You can use all [shepherd](http://github.hubspot.com/shepherd/) options when creating the steps and the tours (exept for buttons).

* When creating a `step`, pass an object as the 2. argument
* When creating a `tour`, pass an object as the 3. argument

```js
//components/onboard-outlet.js

...
export default onboardOutlet.extend({
  createData: Ember.on('init', function () {
    var tours = this.get('onboard');
    
    tours.createStep('followup', {
      title: 'Learn more',
      text: 'Bla Bla Bla Bla',
      attachTo: '.hero-including bottom'
    });
        
    tours.createTour('Basic Features',
      ['records', 'transactions', 'reports', 'dashboard'],
      { classes: 'shepherd-theme-custom' }
    );
  ...
  })
});
```

When a tour is active, you can allways get the object with `injections`, using `this.get('onboard.tourObj')`.

### Route Changes
`ember-onboard` does not have any support for route changes.
You can make it work, but on your own.
To prevent `js errors`, you can `cancel` the current tour when the route changes.
There is a `mixin` that can do this for you:

```js
//app/router.js
...
import CancelTour from 'ember-onboarding/mixins/onboard-router';

var Router = Ember.Router.extend(CancelTour, {
  location: config.locationType
});
...
```

### Modal
There are no support for any kind of `modal` or `shadow`.
But you can achieve the result you want with css, as you see on shepherd's [demo](http://github.hubspot.com/shepherd/docs/welcome/).

This is the [css](https://github.com/HubSpot/shepherd/blob/master/docs/welcome/css/welcome.css) file that do this job.
Remenber that you need to wrap the main `outlet` in 2 elements, `hero-outer` and `hero-inner`.

Using `z-index` it's possible to achieve the `modal` behavior.
