import BaseBehavior from "./base";

export default class WaitBehavior extends BaseBehavior {

  activate() {
    // TODO: Talk smack.
  }

  getHander(data) {
    if (data[0] === 'room:game:start') {
      return this.sendReady;
    } else {
      return super.getHander(data);
    }
  }

  sendReady() {
    this.bot.send("ready");
    this.bot.setBehavior("countdown");
  }

}
