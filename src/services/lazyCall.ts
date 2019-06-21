export default class LazyCall {
  timeout?: number;
  delay: number;
  callback: (...args: any[]) => void;

  constructor(delay = 200, callback: any) {
    this.delay = delay;
    this.callback = callback;
  }

  call(...args: any[]) {
    this.cancel();

    this.timeout = window.setTimeout(() => {
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
