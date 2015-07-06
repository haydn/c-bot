export default class BaseBehavior {

  constructor(bot) {
    this.bot = bot;
  }

  activate() {
    return;
  }

  deactivate() {
    return;
  }

  getHander(data) {
    return null;
  }

}
