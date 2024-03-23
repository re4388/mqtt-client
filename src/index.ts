import mqtt from "mqtt";
// eslint-disable-next-line no-console
import express, {Express, Request, RequestHandler, Response} from 'express'
import bodyParser from 'body-parser'
import 'reflect-metadata'

////////////////////////////////////////////////
/////////////////// MQTT ///////////////////////
////////////////////////////////////////////////

// const queue: string[] = []


// 對外的話，要用 ngrok
const ngrokUrl = `mqtt://0.tcp.jp.ngrok.io:11136`;
const mqttLocalhost1888 = `mqtt://localhost:1888`;
const client = mqtt.connect(mqttLocalhost1888);

client.on("connect", function () {
    client.subscribe("q1", function (err) {
        if (err) {
            console.error(`Failed to subscribe to topic "q1". Error: ${err.message}`);
            return;
        }
        client.publish("q1", "Hello mqtt! client is send the first message after connected");
    });
});

client.on("message", function (topic, message) {
    // message is Buffer
    console.log("topic", topic);
    console.log(message.toString());
    // client.end();
});


////////////////////////////////////////////////
/////////////////// HTTP ///////////////////////
////////////////////////////////////////////////
const app: Express = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
const publishMsg = express.Router();
app.use('/', publishMsg)


async function postMsg(req: Request, res: Response) {
    const { msg } = req.body;
    await sendMsgToMqtt(msg);
    res.status(200).json({
        result: 'success',
    });
};

function sendMsgToMqtt(msg: string) {
    client.publish("q1", msg);
}



// middleware that is specific to this router
function infoLog(req: any, res: any, next: () => void) {
    next();
}

publishMsg.use(infoLog);
publishMsg.post('/publishMsg', postMsg);


app.listen(3111, async () => {
  // debugger
  console.log('Server is running at http://localhost:3111')
})



