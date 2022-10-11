import mongoose from "mongoose";
import { WebSocket as ws } from "ws";
import { Entry, EntryInterface } from "./utils/Entry";
import { getModel } from "./utils/HelperFunctions";
import dotenv from "dotenv";

dotenv.config();

export async function WebSocket() {
    await mongoose.connect(process.env.DATABASE_URL!);

    const apiKey = process.env.API_KEY;
    const ccStreamer = new ws(
        "wss://streamer.cryptocompare.com/v2?api_key=" + apiKey
    );

    ccStreamer.onopen = function onStreamOpen() {
        var subRequest = {
            action: "SubAdd",
            subs: [
                "24~CCCAGG~BTC~USD~H",
                "24~CCCAGG~BTC~GBP~H",

                "24~CCCAGG~BNB~USD~H",
                "24~CCCAGG~BNB~GBP~H",

                "24~CCCAGG~ETH~USD~H",
                "24~CCCAGG~ETH~GBP~H",
            ],
        };
        ccStreamer.send(JSON.stringify(subRequest));
    };

    /**
     * 
     * @Dev on each "message" recieved from "cryptocompare" Websocket API (in case of hourly OHLC we get a message every 5 minutes) do the following:
     * 
     * 1- Parse the message into EntryInterface to make it easier working the message.
     * 
     * 2- Check if the type of message is 24 (24 is for OHLC messages more info in this page: https://min-api.cryptocompare.com/documentation/websockets?key=Connection&cat=HowToConnect).
     * 
     * 3- Get the correct Model/Schema depnding on the pair recieved.
     * 
     * 4- Check if the database is empty so we can add record directly without checking other params.
     * 
     * 5- Check if another record with the same timestamp exists, if yes update the record via the record Id, else if no then add new record.
     * 
    */
    ccStreamer.on("message", async function incoming(data) {
        let newMessage = JSON.parse(data.toString()) as EntryInterface;
        let pair = newMessage.FROMSYMBOL + newMessage.TOSYMBOL;

        if (newMessage.TYPE != "24") {
            return;
        }

        let model = getModel(pair);

        if ((await model.count({})) > 0) {
            const entries: Array<EntryInterface> = await model.find();
            let entryWithSameTimestamp = entries.find(
                (e) => e.TS == newMessage.TS
            );

            if (entryWithSameTimestamp) {
                console.log("Same first timestamp, updaing the record...");
                let id = entryWithSameTimestamp._id;
                await model.findOneAndUpdate(id, newMessage);
            } else {
                console.log("different first timestamp, adding new record..");
                const entry = new (model as typeof Entry)({
                    ...newMessage,
                });
                await entry.save();
            }
        } else {
            console.log("no record found, adding new...");
            const entry = new (model as typeof Entry)({
                ...newMessage,
            });
            await entry.save();
        }
    });
}
