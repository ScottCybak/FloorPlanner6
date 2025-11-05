import { ItemBase } from "./shared/ItemBase";
import { TYPE } from "./shared/TYPE";

export interface WallItem extends ItemBase {
    type: TYPE.WALL,
}
