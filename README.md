# Arctic Events

The core concept here is to register an event or multiple events and to trigger said events.

I wanted to build this library as a learning exercise more then anything.

## Installing:


## Getting Started

Lets start with a really basic example:

```js
EventHandler.register('event.name', (before) => {
  return 'hello world';
});

EventHandler.trigger('event.name'); // => hello world
```

Theres a couple of interesting things here. One is that we are registering an event called `event.name`.

The second is that we are defining what should happen in the event, which is what should happen when the event is triggered.

The important thing to notice is that we pass in the return value from the `before` event.

```
The below is how the event process is triggered. The return value is always passed
down the event chain.


    Before Event Is Fired
              |
              |
  [Returned Value Is Passed]
              |
              |
     Main Event Is Fired
              |
              |
  [Returned Value Is Passed]
              |
              |
      After Event Is Fired
              |
              |
    [Value is then returned]
```

The core reasoning for this "chain" is because you may have the before run to set up for the call to the actual event that you then have return something you then want managed or "handled" after the core event is fired in an "after event" event.

## Before and After

When you need something to happen before or after an event, or in some cases both, you an define these events with appropriate labels:

```js
EventHandler.register('before.hello.world', () => {
  return 'Hello world.';
}, 'before');

EventHandler.register('hello.world', (beforeEventCbReturnValue) => {
  return beforeEventCbReturnValue + ' How are you?';
});

EventHandler.register('after.hello.world', (mainEventCBReturnValue) => {
  return mainEventCBReturnValue.toLowerCase();
}, 'after');

EventHandler.trigger('hello.world'); // => hello world. how are you?
```

In some cases you may only need to register a `before` or a `after`, just keep in mind the chain, as explained above.

### Multiple Before's and Afters

What if you register multiple before and after events? Will they work the same way?

By default we only use the first before registered and the first after registered, so order does matter.

How ever you can stipulate which before and after events to use by stipulating the `use: {}` option when registering an event.

> ATTN!!
>
> events registered as a type of `before` and `after` will error out if you use
> the `use: {}` option. Only one before and one after can be registered for any given event.

```js
// Assume you have multiple before and after events registered:

EventHandler.register('hello.world', (beforeEventCbReturnValue) => {
  return beforeEventCbReturnValue + ' How are you?';
}, null, {use: {before: 'some.before.event', after: 'some.after.event'}});

```

What we are doing here is stipulating which before and which after event we should use when this event is triggered.

What if you defined a bunch of before and after events, accept one of your events doesn't need any of them?

Suppose you have an event that you don't want any before and after events to run for. you can set up your event the same way:

```js
// Assume you have multiple before and after events registered:

EventHandler.register('hello.world', () => {
  return 'hello world';
}, null, false);

```

Notice here how we pass in `false`. This stipulates that your event will fire with out calling a before or after event.
