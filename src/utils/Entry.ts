import { Schema, model, connect, Types } from "mongoose";

export interface EntryInterface {
    _id: Types.ObjectId;
    TYPE: string;
    MARKET: string;
    FROMSYMBOL: string;
    TOSYMBOL: string;
    TS: number;
    UNIT: string;
    ACTION: string;
    OPEN: number;
    HIGH: number;
    LOW: number;
    CLOSE: number;
    VOLUMEFROM: number;
    VOLUMETO: number;
    TOTALTRADES: number;
    FIRSTTS?: number;
    LASTTS?: number;
    FIRSTPRICE?: number;
    MAXPRICE?: number;
    MINPRICE?: number;
    LASTPRICE?: number;
}

export const entrySchema = new Schema<EntryInterface>({
    TYPE: { type: String, required: true },
    MARKET: { type: String, required: true },
    FROMSYMBOL: { type: String, required: true },
    TOSYMBOL: { type: String, required: true },
    TS: { type: Number, required: true },
    UNIT: { type: String, required: true },
    ACTION: { type: String, required: true },
    OPEN: { type: Number, required: true },
    HIGH: { type: Number, required: true },
    LOW: { type: Number, required: true },
    CLOSE: { type: Number, required: true },
    VOLUMEFROM: { type: Number, required: true },
    VOLUMETO: { type: Number, required: true },
    TOTALTRADES: { type: Number, required: true },
    FIRSTTS: { type: Number, required: false },
    LASTTS: { type: Number, required: false },
    FIRSTPRICE: { type: Number, required: false },
    MAXPRICE: { type: Number, required: false },
    MINPRICE: { type: Number, required: false },
    LASTPRICE: { type: Number, required: false },
});

//Default Schema
export const Entry = model<EntryInterface>("Entry", entrySchema);

//BTC Schemas
export const BTCUSD = model<EntryInterface>("BTCUSD", entrySchema);
export const BTCGBP = model<EntryInterface>("BTCGBP", entrySchema);

//BNB Schemas
export const BNBUSD = model<EntryInterface>("BNBUSD", entrySchema);
export const BNBGBP = model<EntryInterface>("BNBGBP", entrySchema);

//ETH Schemas
export const ETHUSD = model<EntryInterface>("ETHUSD", entrySchema);
export const ETHGBP = model<EntryInterface>("ETHGBP", entrySchema);
