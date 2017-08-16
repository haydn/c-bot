import BaseBehavior from "./base";

export default class CountdownBehavior extends BaseBehavior {

  constructor(bot) {
    super(bot);
    this.others = [];
  }

  getHander(data) {
    if (data[0] === 'ready') {
      return this.checkPlayer;
    } else if (data[0] === "game:start") {
      return this.pickTarget;
    } else {
      return super.getHander(data);
    }
  }

  checkPlayer(data) {
    if (data[1] && data[1] !== this.bot.playerId) {
      this.others.push(data[1]);
    }
  }

  pickTarget() {

    var n = ~~(Math.random() * this.others.length);

    this.bot.targetId = this.others[n];

    if (this.bot.targetId) {
      this.bot.setBehavior("play");
    }

  }

}
