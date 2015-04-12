# Ember-onboarding

This is another Ember wrapper for the [Shepherd](https://github.com/HubSpot/Shepherd), site tour, library.
But, why another? Because I need 

## Demo
[![Guide your users through a tour of your app](http://i.imgur.com/yOw7GrM.png)](http://rwwagner90.github.io/ember-shepherd/)
http://rwwagner90.github.io/ember-shepherd/

## Getting started

To start, if you are using Ember CLI, simply run:
```bash
ember install:addon ember-shepherd
```

After installing, you'll need to include the tour component in the template for the page you would like it on. If you would like it on multiple pages, I would recommend putting it in the application template, so it will be accessible on any route.

```hbs
{{ember-shepherd 
currentPath=currentPath 
defaults=shepherdDefaults 
disableScroll=true
modal=isModal 
requiredElements=requiredElements
start=showHelp 
steps=steps}}
```

### currentPath
**currentPath** is used to detect route changes, and cancel the tour when one occurs. If you put the code in your 
application level template, ```currentPath=currentPath``` is all you need. If you are using it somewhere else, you 
will need to pass in ```controllerFor('application').get('currentPath')```.

If you **do not** want the tour to cancel when you switch routes, just do not specify anything for currentPath, but 
this functionality is not yet supported, so you'll have to do some hacky things.

### defaults
**defaults** is used to set the options that will be applied to each step by default. You can pass in any of the options that you can with Shepherd. It will be an object of a form something like:
```js
var shepherdDefaults = 
{
  classes: 'shepherd-element shepherd-open shepherd-theme-arrows',
  scrollTo: false,
  showCancelLink: true
};
```

### disableScroll
**disableScroll** is a boolean, that when set to true, will keep the user from scrolling with the scrollbar, 
mousewheel, arrow keys, etc. You may want to use this to ensure you are driving the scroll position with the tour. 
Thanks to [jquery-disablescroll](https://github.com/ultrapasty/jquery-disablescroll) for this functionality.

### modal
**modal** is a boolean, that should be set to true, if you would like the rest of the screen, other than the current element, greyed out, and the current element highlighted. If you do not need modal functionality, you can remove this option or set it to false.

### requiredElements (optional)
**requiredElements** is an array of objects that indicate DOM elements that are **REQUIRED** by your tour and must 
exist and be visible for the tour to start. If any elements are not present, it will keep the tour from starting.

You can also specify a message, this message can be used to tell the user what they need to do to make the tour work.

You'll want to do something like this:
```js
controllerFor('application').set('requiredElements', [
      {
        selector: '.search-result-element',
        message: 'No search results found. Please execute another search, and try to start the tour again.',
        title: 'No results'
      },
      {
        selector: '.username-element',
        message: 'User not logged in, please log in to start this tour.',
        title: 'Please login'
      },
    ]);

```

### start
**start** should be set to true, when you would like the tour to start. Set it to a variable, and set that variable to true with an action in your Ember app, when you click a button or something, to initiate the tour.

On the demo page, we initiate the tour, supporting both modal, and non-modal, by calling the following actions on the application controller:

```js
actions: {
    toggleHelpModal: function() {
      this.set('isModal', true);
      this.toggleProperty('showHelp');
    },
    toggleHelpNonmodal: function() {
      this.set('isModal', false);
      this.toggleProperty('showHelp');
    }
  }
```

## Installation

* `git clone` this repository
* `npm install`
* `bower install`

## Running

* `ember server`
* Visit your app at http://localhost:4200.

## Running Tests

* `ember test`
* `ember test --server`

## Building

* `ember build`

For more information on using ember-cli, visit [http://www.ember-cli.com/](http://www.ember-cli.com/).
