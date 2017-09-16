var EightBall = require('./eightball.js');
var config = require('./.config')

var bot = new EightBall();

var RtmClient = require('@slack/client').RtmClient;
var RTM_EVENTS = require('@slack/client').RTM_EVENTS;

var token = config.slack_token || '';

var rtm = new RtmClient(token, {
  logLevel: 'error', // check this out for more on logger: https://github.com/winstonjs/winston
});

rtm.on(RTM_EVENTS.MESSAGE, function handleRtmMessage(message) {
  var r = bot.hear(message.text).then(function(text) {
    if (text)
    {
      rtm.sendMessage(text, message.channel);
    }
  });
});
rtm.start();
