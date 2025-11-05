import { Item } from "./Items";

export interface ItemBase {
    id: string;
    label?: string;
    
    x?: number;
    y?: number;
    z?: number;

    length?: number;
    width?: number;
    height?: number;

    items?: Item[];
}