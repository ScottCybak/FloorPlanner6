import { CARDINAL } from "../CARDINAL";
import { ItemBase } from "./shared/ItemBase";
import { TYPE } from "./shared/TYPE";

export interface StairwellItem extends ItemBase {
    type: TYPE.STAIRWELL;
    orientation: CARDINAL;
    width: number;
    length: number;
    height: number;
}