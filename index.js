const EightBall = require('eightball-extensible');
var config = require('./.config')

var e = new EightBall({"additionalResponses": ['Yeah, nah', 'Sure, why not']});

console.log("Eightball configured with responses:\n" + e.responses.join("\n"));

var RtmClient = require('@slack/client').RtmClient;
var RTM_EVENTS = require('@slack/client').RTM_EVENTS;

var token = config.slack_token || '';

var rtm = new RtmClient(token, {
  logLevel: 'error'
});

rtm.on(RTM_EVENTS.MESSAGE, function handleRtmMessage(message) {
  if (text.match(/\?$/) && Math.random()*10 < 1.5)
  {
    e.consult().then(function(text) {
      rtm.sendMessage(text, message.channel);
    });
  }
});
rtm.start();
