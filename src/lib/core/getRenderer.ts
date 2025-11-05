import { ItemBase } from "lib/models/items/shared/ItemBase";
import { TYPE } from "lib/models/items/shared/TYPE";
import { VIEW_TYPE } from "lib/models/View";
import { DoorRenderer } from "./renderers/door.renderer";
import { RendererBase } from "./renderers/shared/RendererBase";
import { RoomRenderer } from "./renderers";

type RendererConstructor<T extends ItemBase> = new (item: T, view: VIEW_TYPE) => RendererBase<T>;

const rendererMap: Partial<{
    [key in TYPE]: RendererConstructor<any>;
}> = {
    [TYPE.DOOR]: DoorRenderer,
    [TYPE.ROOM]: RoomRenderer,
}

export const getRenderer = (type: TYPE) => {
    const RenderClass = rendererMap[type];
    if (!RenderClass) {
        // console.warn('unable to find render class', type);
    }
    return RenderClass;
}