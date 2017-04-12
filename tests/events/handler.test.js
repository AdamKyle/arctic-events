const EventHandler = require('../../src/index');

describe('Registering Events', () => {
  beforeEach(() => {
    EventHandler.clearAllEvents();
  });

  test('success in registering event', () => {
    EventHandler.register('hello.world', (before) => {
      return 'hello world';
    });

    expect(EventHandler.getEvents()).toHaveLength(1);
  });

  test('success in registering event of type', () => {
    EventHandler.register('hello.world', (before) => {
      return 'hello world';
    }, 'before');

    expect(EventHandler.getEvents()).toHaveLength(1);
  });

  test('success in registering event with use', () => {
    EventHandler.register('hello.world', (before) => {
      return 'hello world';
    }, null, {use: {before: 'event.name', after: 'event.name' }});

    expect(EventHandler.getEvents()).toHaveLength(1);
  });

  test('success in registering event with use as false', () => {
    EventHandler.register('hello.world', (before) => {
      return 'hello world';
    }, null, false);

    expect(EventHandler.getEvents()).toHaveLength(1);
  });

  test('Invalid type should throw error', () => {
    expect(() => {
      EventHandler.register('hello.world', (before) => {
        return 'hello world';
      }, 'fail');
    }).toThrow();
  });

  test('Invalid use should throw error', () => {
    expect(() => {
      EventHandler.register('hello.world', (before) => {
        return 'hello world';
      }, null, 'bananas');
    }).toThrow();
  });
});

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

  test('success in triggering an event with only an before event', () => {
    EventHandler.register('before.hello.world', () => {
      return 'Hello world.';
    }, 'before');

    EventHandler.register('hello.world', function(beforeEventCbReturnValue) {
      return beforeEventCbReturnValue + ' How are you?';
    });

    expect(EventHandler.trigger('hello.world')).toEqual('Hello world. How are you?');
  });

  test('success in triggering an event with only an after event', () => {

    EventHandler.register('hello.world', function(beforeEventCbReturnValue) {
      return 'Hello world. How are you?';
    });

    EventHandler.register('after.sams.world', (mainEventCBReturnValue) => {
      return mainEventCBReturnValue.toLowerCase();
    }, 'after');

    expect(EventHandler.trigger('hello.world')).toEqual('hello world. how are you?');
  });

  test('cannot find event to trigger, when there are no events', () => {
    expect(() => {
      EventHandler.trigger('some.name');
    }).toThrow();
  });

  test('cannot find event to trigger, when there are events', () => {
    EventHandler.register('hello.world', function(beforeEventCbReturnValue) {
      return 'Hello world. How are you?';
    });

    expect(() => {
      EventHandler.trigger('some.name');
    }).toThrow();
  });
});
