import NameGenerator from 'name-generator';
import Bot from "./bot";

var namer = new NameGenerator({
  default: {
    digits: 3,
    prefix: "bottleneck"
  }
});

var bots = [];

for (var i=0; i < 1; i++) {
  bots.push(
    new Bot(process.env.URL, namer.next())
  );
}
