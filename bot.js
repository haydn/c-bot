import uuid from 'uuid';
import chalk from 'chalk';
import WebSocket from 'faye-websocket';
import ConnectBehavior from './behaviors/connect';
import AddPlayerBehavior from './behaviors/add-player';
import JoinBehavior from './behaviors/join';
import ReadyBehavior from './behaviors/ready';
import WaitBehavior from './behaviors/wait';
import CountdownBehavior from './behaviors/countdown';
import PlayBehavior from './behaviors/play';

export default class Bot {

  constructor(url, name) {

    this.url  = url;
    this.name = name;

    this.privateId = uuid.v4();
    this.publicId  = null;
    this.targetId = null;

    this._webSocket = null;

    this._behaviors = {
      "connect":    new ConnectBehavior(this),
      "add-player": new AddPlayerBehavior(this),
      "join":       new JoinBehavior(this),
      "ready":      new ReadyBehavior(this),
      "wait":       new WaitBehavior(this),
      "countdown":  new CountdownBehavior(this),
      "play":       new PlayBehavior(this)
    };

    this._behavior = null;

    this.init();

  }

  init() {

    this._webSocket = new WebSocket.Client(this.url);

    this._webSocket.on('open', this.onOpen.bind(this));
    this._webSocket.on('message', this.onMessage.bind(this));
    this._webSocket.on('error', this.onError.bind(this));
    this._webSocket.on('close', this.onClose.bind(this));

    this.setBehavior(null);

  }

  destroy() {
    this.setBehavior(null);
    this._webSocket = null;
  }

  setBehavior(name) {

    if (name === null || this._behaviors[name]) {
      console.log(chalk.cyan(this.name, 'behavior'), name);
    } else {
      console.log(chalk.red(this.name, 'behavior'), name);
    }

    if (this._behavior && this._behaviors[this._behavior]) {
      this._behaviors[this._behavior].deactivate();
    }

    this._behavior = name;

    if (this._behavior && this._behaviors[this._behavior]) {
      this._behaviors[this._behavior].activate();
    }

  }

  onOpen(event) {
    console.log(chalk.cyan(this.name, 'open'));
    this.setBehavior("connect");
  }

  onMessage(event) {

    var behavior = this._behaviors[this._behavior];

    if (behavior) {

      JSON.parse(event.data).forEach((data) => {

        var handler = behavior.getHander(data);

        if (handler) {
          console.log(chalk.green(this.name, "<-"), data);
          handler.call(behavior, data);
        } else {
          console.log(chalk.red(this.name, "<-"), data);
        }

      });

    }

  }

  onError(event) {
    console.log(chalk.red(this.name, 'error'), event);
  }

  onClose(event) {
    console.log(chalk.cyan(this.name, 'close'), event.code, event.reason);
    this.destroy();
  }

  send(...data) {
    console.log(chalk.yellow(this.name, '->'), data);
    this._webSocket.send(JSON.stringify([data]));
  }

}
