# Arctic Events

[![Build Status](https://travis-ci.org/AdamKyle/arctic-events.svg?branch=master)](https://travis-ci.org/AdamKyle/arctic-events)
[![npm version](https://badge.fury.io/js/arctic-events.svg)](https://badge.fury.io/js/arctic-events)
[![Maintenance](https://img.shields.io/maintenance/yes/2018.svg)]()
[![Made With Love](https://img.shields.io/badge/Made%20With-Love-green.svg)]()

> The actual version is 0.1.0, these badges are always out of date for me or take for ever to update.

The core concept here is to register an event or multiple events and to trigger said events.

I wanted to build this library as a learning exercise more then anything.

## Installing:

```js
yarn add arctic-events

// In your JS:

const EventHandler = require('artic-events');
```

## Getting Started

We need to create an EventHandler which handles the events that you then register, to do this we can extend the class `EventHandler` or we can use it as is. For the examples below, we will extend the class:

```js
class MyEventHandler extends EventHandler {};

const myEventHandler = new myEventHandler();

myEventHandler.register('event', () => {
  console.log('hello world');
});

myEventHandler.trigger('event'); // => hello world.
```

Here we see we register an event, trigger it and see the results.

### Parameters

What if your events takes in parameters?

```js
class MyEventHandler extends EventHandler {};

const myEventHandler = new myEventHandler();

myEventHandler.register('event', (a, b, eventHandler) => {
  console.log(a, b, eventHandler);
});

myEventHandler.trigger('event', 'a', 'b');

// Shows the following:

a,
b,
MyEventHandler { events: [ { name: 'event', cb: [Function] } ] }
```

We have an additional parameter that we pass in. `this` which gives you back the
`EventHandler` class object (in this case the subclass: `MyEventHandler`). You see this with the third param `eventHandler`.
