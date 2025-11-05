import { BuildingItem } from "../BuildingItem";
import { DoorItem } from "../DoorItem";
import { RoomItem } from "../RoomItem";
import { StairwellItem } from "../StairwellItem";
import { WallItem } from "../WallItem";

export type Item = RoomItem | WallItem | BuildingItem | DoorItem | StairwellItem;