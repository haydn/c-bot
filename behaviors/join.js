import BaseBehavior from "./base";

export default class JoinBehavior extends BaseBehavior {

  activate() {
    this.bot.send("room:fetch");
  }

  getHander(data) {
    if (data[0] === "room:open") {
      return this.checkRoom;
    } else if (data[0] === this.bot.publicId) {
      return this.checkSuccess;
    } else {
      return super.getHander(data);
    }
  }

  checkRoom(data) {
    this.bot.send(
      "room:join",
      { name: data[1].name },
      this.bot.publicId
    );
  }

  checkSuccess(data) {
    if (data[1] && data[1].success) {
      this.bot.setBehavior("add-player");
    }
  }

}
