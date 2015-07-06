import BaseBehavior from "./base";

export default class ConnectBehavior extends BaseBehavior {

  activate() {
    this.bot.send("whoami", null, this.bot.privateId);
  }

  getHander(data) {
    if (data[0] === this.bot.privateId) {
      return this.getPublicId;
    } else {
      return super.getHander(data);
    }
  }

  getPublicId(data) {
    this.bot.publicId = data[1];
    this.bot.setBehavior("join");
  }

}
