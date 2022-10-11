import express, { Express, Request, Response } from "express";
import { WebSocket } from "./websocket";
import { getModel } from "./utils/HelperFunctions";
import { EntryInterface } from "./utils/Entry";

WebSocket();

const app: Express = express();
const port = 3000;

app.get("/getdata", async (req: Request, res: Response) => {
    let tokenPair = req.query.pair?.toString();
    const supportedPairs = [
        "btcusd",
        "btcgbp",
        "ethusd",
        "ethgbp",
        "bnbusd",
        "bnbgbp",
    ];

    if (!tokenPair || !supportedPairs.includes(tokenPair)) {
        res.status(400).send(
            "Invalid request, should be /getdata?pair=<pair>, Pairs avaliable: [btcusd], [btcgbp], [ethusd], [ethgbp], [bnbusd], and [bnbgbp]"
        );

        return;
    }
    let model = getModel(tokenPair!.toUpperCase());
    let entries: Array<EntryInterface> = await model.find().sort("-TS");

    res.json(entries);
});

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
