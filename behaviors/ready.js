import BaseBehavior from "./base";

export default class ReadyBehavior extends BaseBehavior {

  activate() {
    this.bot.send('room:ready', { player: this.bot.playerId }, this.bot.publicId);
  }

  getHander(data) {
    if (data[0] === "player:ready") {
      return this.checkSuccess;
    } else {
      return super.getHander(data);
    }
  }

  checkSuccess(data) {
    if (data[1] && data[1].player && data[1].player === this.bot.playerId) {
      this.bot.setBehavior("wait");
    }
  }

}
