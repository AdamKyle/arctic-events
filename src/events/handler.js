const isUndefined = require('lodash/fp/isUndefined');
const isNil = require('lodash/fp/isNil');
const validateType = require('./validators/type');
const validateUse = require('./validators/use');

/**
 * Event Handler Class
 */
class EventHandler {

  /**
   * Core constructor.
   */
  constructor() {
    this.events       = [];
    this.beforeEvents = [];
    this.afterEvents  = [];
  }

  /**
   * Register an event.
   *
   * @param {string} name  - The name of the event.
   * @param {cb} cb        - The event it's self.
   * @param {string} type  - Type: before, after.
   * @param {obj} use      - The use object to efine which.
   *                         before after event to use.
   * @throws {Error}
   * @return {undefined}
   */
  register(name, cb, type, use) {

    this.events.forEach((event) => {
      if (event.name === name) {
        throw Error(name + ' already exists in the set of registered events');
      }
    });

    const event = {
      name: name,
      cb: cb,
      type: validateType(type),
      use: validateUse(use)
    }

    switch (event.type) {
      case "before":
        this.beforeEvents.push(event);
        break;
      case "after":
        this.afterEvents.push(event);
        break;
      default:
        this.events.push(event);
    }
  }

  /**
   * Trigger an event based on name.
   *
   * @param {string} name - The name of the event to trigger.
   * @return {various}    - Can be anything.
   * @throws {Error}
   */
  trigger(name) {
    let returnValue = null;

    if (!this.events.length > 0) {
      throw Error('There are no registered events.');
    }

    this.events.forEach((event) => {
      if (event.name === name) {
        let beforeEventReturnValue = null;
        let cbReturnValue          = null;

        if (!isUndefined(event.use) && event.use !== false) {
          beforeEventReturnValue = this.triggerBeforeEvent(event.use.use.before);
          cbReturnValue          = event.cb(beforeEventReturnValue);

          returnValue = this.triggerAfterEvent(event.use.use.after, cbReturnValue);
        } else if (!isUndefined(event.use) && !event.use) {
          returnValue = event.cb();
        } else {
          beforeEventReturnValue = this.triggerBeforeEvent();
          cbReturnValue          = event.cb(beforeEventReturnValue);

          returnValue = this.triggerAfterEvent(null, cbReturnValue);
        }
      } else {
        throw Error('could not find ' + name + ' in the list of registered events.');
      }
    });

    return returnValue;
  }

  /**
   * Triggers an event before the main event has fired.
   *
   * @param {string} beforeEventToFire - The specific before event to fire.
   * @return {various}                 - Can be anything.
   */
  triggerBeforeEvent(beforeEventToFire) {
    let beforeEventCbReturnValue = null;

    if (this.beforeEvents.length > 0) {
        if (!isUndefined(beforeEventToFire)) {
          this.beforeEvents.forEach((beforeEvent) => {
            if (beforeEvent.name === beforeEventToFire) {
              beforeEventCbReturnValue = beforeEvent.cb();
            }
          });
        } else {
          beforeEventCbReturnValue = this.beforeEvents[0].cb();
        }
    }

    return beforeEventCbReturnValue;
  }

  /**
   * Triggers an event after the main event has fired.
   *
   * @param {string} afterEventToFire - the specific after event to fire.
   * @param {mixed} cbReturnValue     - The main events return value.
   * @return {mixed}                  - Can be anything.
   */
  triggerAfterEvent(afterEventToFire, cbReturnValue) {
    let afterEventCbReturnValue = null;

    if (this.afterEvents.length > 0) {
        if (!isNil(afterEventToFire)) {
          this.afterEvents.forEach((afterEvent) => {
            if (afterEvent.name === afterEventToFire) {
              afterEventCbReturnValue = afterEvent.cb(cbReturnValue);
            }
          });
        } else {
          afterEventCbReturnValue = this.afterEvents[0].cb(cbReturnValue);
        }
    } else {
      afterEventCbReturnValue = cbReturnValue;
    }

    return afterEventCbReturnValue;
  }

  /**
   * Get all the events.
   *
   * @return {array} events
   */
  getEvents() {
    this.events = this.events.concat(this.beforeEvents);
    this.events = this.events.concat(this.afterEvents);

    return this.events;
  }

  /**
   * Clears all events.
   *
   * @return {undefiend} - Returns nothing.
   */
  clearAllEvents() {
    this.events       = [];
    this.beforeEvents = [];
    this.afterEvents  = [];
  }
}

module.exports = EventHandler;
