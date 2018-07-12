export class Watcher {
  constructor() {
    this.listeners = []
  }

  subscribe(fn) {
    this.listeners.push(fn)
  }

  unSubscribe(fn) {
    this.listeners = this.listeners.filter(l => l !== fn)
  }

  publish() {
    this.listeners.forEach(l => l())
  }
}

export default new Watcher();