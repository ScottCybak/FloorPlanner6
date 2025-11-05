import { ItemBase } from "./shared/ItemBase";
import { TYPE } from "./shared/TYPE";

export interface RoomItem extends ItemBase {
    type: TYPE.ROOM;
    noHelper?: boolean;
}