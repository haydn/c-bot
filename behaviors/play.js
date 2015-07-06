import BaseBehavior from "./base";

export default class PlayBehavior extends BaseBehavior {

  activate() {

    this.currentPos = { x: 0, y: 0 };
    this.previousPos = { x: 0, y: 0 };
    this.targetPos = { x: 0, y: 0 };

    this.interval = setInterval(this.update.bind(this), 100);

  }

  deactivate() {
    clearInterval(this.interval);
  }

  getHander(data) {
    if (data[0] === 'position') {
      return this.updatePosition;
    } else if (data[0] === 'end') {
      return this.end;
    } else {
      return super.getHander(data);
    }
  }

  updatePosition(data) {
    if (data[1]) {
      if (data[1][0] === this.bot.playerId) {
        this.previousPos = this.currentPos;
        this.currentPos = {
          x: data[1][1][0],
          y: data[1][1][1]
        };
      } else if (data[1][0] === this.bot.targetId) {
        this.targetPos = {
          x: data[1][1][0],
          y: data[1][1][1]
        };
      }
    }
  }

  update() {

    var angleToTarget = Math.atan2(this.targetPos.y - this.currentPos.y, this.targetPos.x - this.currentPos.x);
    var angleOfTravel = Math.atan2(this.currentPos.y - this.previousPos.y, this.currentPos.x - this.previousPos.x);
    var difference = (angleToTarget - angleOfTravel);

    if (difference > Math.PI) {
      difference -= Math.PI * 2;
    }

    if (difference < -Math.PI) {
      difference += Math.PI * 2;
    }
    // console.log(angleToTarget, angleOfTravel, difference);

    if (difference > 0) {
      this.bot.send('player:move', { avatar: this.bot.playerId, move: 1 });
    } else {
      this.bot.send('player:move', { avatar: this.bot.playerId, move: -1 });
    }

  }

  end() {
    this.bot.setBehavior("ready");
  }

}
