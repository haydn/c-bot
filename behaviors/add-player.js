import BaseBehavior from "./base";

export default class AddPlayerBehavior extends BaseBehavior {

  activate() {
    this.bot.send("player:add", { name: this.bot.name, color: '#ff00ff' }, this.bot.publicId);
  }

  getHander(data) {
    if (data[0] === "room:join") {
      return this.checkSuccess;
    } else {
      return super.getHander(data);
    }
  }

  checkSuccess(data) {
    if (data[1] && data[1].player && data[1].player.client === this.bot.publicId) {
      this.bot.playerId = data[1].player.id;
      this.bot.setBehavior("ready");
    }
  }

}
