const EventHandler = require('../../src/index');

describe('Registering Events', () => {
  beforeEach(() => {
    eventHandler = new EventHandler();
    eventHandler.clearAllEvents();
  });

  test('success in registering event', () => {
    eventHandler.register('hello.world', (before) => {
      return 'hello world';
    });

    expect(eventHandler.getEvents()).toHaveLength(1);
  });

  test('Duplicate events should throw error', () => {
    eventHandler.register('hello.world', (before) => {
      return 'hello world';
    });

    expect(() => {
      eventHandler.register('hello.world', (before) => {
        return 'hello world';
      });
    }).toThrow();
  });
});

describe('Triggering Events', () => {
  beforeEach(() => {
    eventHandler = new EventHandler();
    eventHandler.clearAllEvents();
  });

  test('success in triggering a regular event', () => {
    eventHandler.register('hello.world', () => {
      return 'hello world';
    });

    expect(eventHandler.trigger('hello.world')).toEqual('hello world');
  });

  test('success in triggering an event with params', () => {
    eventHandler.register('event.with.params', (a, b) => {
      return a + ' ' + b;
    });

    expect(eventHandler.trigger('event.with.params', 'a', 'b')).toEqual('a b');
  });

  test('success in triggering multiple events', () => {
    eventHandler.register('event.with.params', (a, b) => {
      return a + ' ' + b;
    });

    eventHandler.register('event.with.no.params', () => {
      return 'no params'
    });

    expect(eventHandler.trigger('event.with.params', 'a', 'b')).toEqual('a b');
    expect(eventHandler.trigger('event.with.no.params')).toEqual('no params');
  });

  test('eventHandler should be instance of EventHandler', () => {
    eventHandler.register('event.instanceof.check', (eventHandler) => {
      return eventHandler
    });

    expect(eventHandler.trigger('event.instanceof.check')).toBeInstanceOf(EventHandler);
  });

  test('error in triggering event that does not exist', () => {
    expect(() => {
      eventHandler.trigger('event.with.params', 'a', 'b');
    }).toThrow();
  });
});
