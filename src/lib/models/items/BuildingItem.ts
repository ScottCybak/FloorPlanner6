import { ItemBase } from "./shared/ItemBase";
import { TYPE } from "./shared/TYPE";

export interface BuildingItem extends ItemBase {
    type: TYPE.BUILDING;
}