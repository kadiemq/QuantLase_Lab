import { BTCUSD, BTCGBP, BNBUSD, BNBGBP, ETHUSD, ETHGBP, Entry } from "./Entry";

export function getModel(s: string) {
    switch (s) {
        case "BTCUSD":
            return BTCUSD;
        case "BTCGBP":
            return BTCGBP;

        //BNB Cases
        case "BNBUSD":
            return BNBUSD;
        case "BNBGBP":
            return BNBGBP;

        //ETH Cases
        case "ETHUSD":
            return ETHUSD;
        case "ETHGBP":
            return ETHGBP;

        default:
            return Entry;
    }
}
