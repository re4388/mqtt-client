import mqtt from "mqtt";

const local = `mqtt://localhost:1888`;
const ngrokUrl = `mqtt://0.tcp.jp.ngrok.io:11136`;

const client = mqtt.connect(ngrokUrl);

client.on("connect", function () {
  client.subscribe("q1", function (err) {
    if (!err) {
      client.publish("presence", "Hello mqtt");
    }
  });
});

client.on("message", function (topic, message) {
  // message is Buffer
  console.log("topic", topic);
  console.log(message.toString());
  client.end();
});
