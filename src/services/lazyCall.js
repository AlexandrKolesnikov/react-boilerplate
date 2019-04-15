export default class LazyCall {
  constructor(delay = 200, callback) {
    this.delay = delay;
    this.callback = callback;
  }

  call(...args) {
    this.cancel();

    this.timeout = setTimeout(() => {
      if (this.callback) {
        this.callback(...args);
      }
    }, this.delay);
  }

  cancel() {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
  }
}
