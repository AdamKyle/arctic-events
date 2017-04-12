const EventHandler = require('../../src/index');

describe('Triggering Events', () => {
  beforeEach(() => {
    EventHandler.clearAllEvents();
  });

  test('success in triggering a regular event', () => {
    EventHandler.register('hello.world', (before) => {
      return 'hello world';
    });

    expect(EventHandler.trigger('hello.world')).toEqual('hello world');
  });

  test('success in triggering an event with before and after events', () => {
    EventHandler.register('before.hello.world', () => {
      return 'Hello world.';
    }, 'before');

    EventHandler.register('hello.world', function(beforeEventCbReturnValue) {
      return beforeEventCbReturnValue + ' How are you?';
    });

    EventHandler.register('after.hello.world', (mainEventCBReturnValue) => {
      return mainEventCBReturnValue.toLowerCase();
    }, 'after');

    expect(EventHandler.trigger('hello.world')).toEqual('hello world. how are you?');
  });

  test('success in triggering an event with specific before and after events', () => {
    EventHandler.register('before.hello.world', () => {
      return 'Hello world.';
    }, 'before');

    EventHandler.register('before.sams.world', () => {
      return 'Hello Sam.';
    }, 'before');

    EventHandler.register('hello.world', function(beforeEventCbReturnValue) {
      return beforeEventCbReturnValue + ' How are you?';
    }, null, {use: {before: 'before.sams.world', after: 'after.sams.world'}});

    EventHandler.register('after.hello.world', (mainEventCBReturnValue) => {
      return mainEventCBReturnValue.toUpperCase();
    }, 'after');

    EventHandler.register('after.sams.world', (mainEventCBReturnValue) => {
      return mainEventCBReturnValue.toLowerCase();
    }, 'after');

    expect(EventHandler.trigger('hello.world')).toEqual('hello sam. how are you?');
  });

  test('success in triggering an event with no before or after events', () => {
    EventHandler.register('before.hello.world', () => {
      return 'Hello world.';
    }, 'before');

    EventHandler.register('before.sams.world', () => {
      return 'Hello Sam.';
    }, 'before');

    EventHandler.register('hello.world', function(beforeEventCbReturnValue) {
      return 'hello world';
    }, null, false);

    EventHandler.register('after.hello.world', (mainEventCBReturnValue) => {
      return mainEventCBReturnValue.toUpperCase();
    }, 'after');

    EventHandler.register('after.sams.world', (mainEventCBReturnValue) => {
      return mainEventCBReturnValue.toLowerCase();
    }, 'after');

    expect(EventHandler.trigger('hello.world')).toEqual('hello world');
  });
});
