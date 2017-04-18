/**
 * Event Handler Class
 */
class EventHandler {

  /**
   * Core constructor.
   */
  constructor() {
    this.events = [];
  }

  /**
   * Register an event.
   *
   * @param {string} name  - The name of the event.
   * @param {cb} cb        - The event it's self.
   * @throws {Error}
   * @return {undefined}
   */
  register(name, cb) {
    this.events.forEach((event) => {
      if (event.name === name) {
        throw Error(name + ' already exists in the set of registered events');
      }
    });

    const event = {
      name: name,
      cb: cb
    }

    this.events.push(event);
  }

  /**
   * Trigger an event based on name.
   *
   * @param {string} name - The name of the event to trigger.
   * @return {various}    - Can be anything.
   * @throws {Error}
   */
  trigger(name, ...args) {
    if (!this.events.length > 0) {
      throw Error('There are no registered events.');
    }

    const foundEvent = this.events.filter(event => event.name === name);

    if (!foundEvent > 0) {
      throw Error('could not find ' + name + ' in the list of registered events.');
    }

    if (args.length > 0) {
      return foundEvent[0].cb(...args, this);
    }

    return foundEvent[0].cb(this);
  }

  /**
   * Get all the events.
   *
   * @return {array} events
   */
  getEvents() {
    return this.events;
  }

  /**
   * Clears all events.
   *
   * @return {undefiend} - Returns nothing.
   */
  clearAllEvents() {
    this.events = [];
  }
}

module.exports = EventHandler;
