import clone from 'lodash/clone';

class WatcherBase {

  constructor(targetDefault = null) {
    this.target = targetDefault;
    this.subscribers = new Map();
  }

  set(target) {
    this.target = target;
    this.triggerSubscriber(this.target);
  }

  register(target, subscriber) {
    this.subscribers.set(target, subscriber);
    subscriber.call(target, this.target);
  }

  unregister(target) {
    this.subscribers.delete(target);
  }

  triggerSubscriber(target) {
    this.subscribers.forEach((subscriber, obj) => {
      try {
        subscriber.call(obj, clone(target));
      } catch (e) {
        console.warn('Watcher error:', e);
      }
    });
  }
}

export default WatcherBase;