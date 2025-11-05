import { CARDINAL } from "../CARDINAL";
import { ItemBase } from "./shared/ItemBase";
import { TYPE } from "./shared/TYPE";

export interface DoorItem extends ItemBase {
    type: TYPE.DOOR;
    size: number;
    hinge: CARDINAL;
    swing: CARDINAL;
}