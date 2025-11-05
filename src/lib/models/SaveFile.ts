import { Item } from "./items/shared/Items";

export interface SaveFile {
    parcel: string;
    width: number;
    length: number;
    items?: Item[];
}