import Telefon from "./Telefon";

export default interface TelefonAndroid extends Telefon{
    versiune: string;
    specificatii: string;
    relizul: number;
}