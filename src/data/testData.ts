import { WallItem } from "lib/models";
import { CARDINAL } from "lib/models/CARDINAL";
import { RoomItem } from "lib/models/items/RoomItem";
import { Item } from "lib/models/items/shared/Items";
import { TYPE } from "lib/models/items/shared/TYPE";
import { SaveFile } from "lib/models/SaveFile";

// this is all assuming a top-down design
// width => css.width
// height => unused
// length => css.height
            // h.room('patio', 98, 202.5, 0, 47.5, dims.ext, undefined, CARDINAL.EAST),
            // h.room('main', 270, 288, 98, 0, dims.ext, undefined),
            // h.room('rear', 243, 266, 98 + 270, (288 - 266) / 2, dims.ext, undefined, CARDINAL.WEST),
const s = {
    ext: 6,
    int: 4,
    height: 96,
    nub: 6,
    doors: {
        int: 32,
        ext: 36,
    },
    patio: {
        width: 98,
        length: 202.5,
        y: 47.5,
    },
    main: {
        width: 270,
        length: 288,
    },
    rear: {
        width: 243,
        length: 266,
    },
    living: {
        length: 144, // target
    },
    guest: {
        width: 0,
        length: 0,
    },
    stairs: {
        width: 52,
        length: 135,
    }
}
s.guest.width = (s.main.width - (s.ext * 2)) / 2;
s.guest.length = s.main.length - (s.ext * 2) - s.living.length - s.int;

const h = {
    room: (id: string, width: number, length: number, x: number, y: number, thick: number, height = 96, hide = CARDINAL.NONE): RoomItem => {
        return {
            type: TYPE.ROOM,
            id,
            x,
            y,
            items: [
                (hide & CARDINAL.NORTH) === CARDINAL.NORTH ? undefined : {
                    type: TYPE.WALL,
                    id: `${id}-wall-n`,
                    width,
                    length: thick,
                    height,
                } as WallItem,
                (hide & CARDINAL.WEST) === CARDINAL.WEST ? undefined : {
                    type: TYPE.WALL,
                    id: `${id}-wall-w`,
                    width: thick,
                    length: length - (thick * 2),
                    height,
                    y: thick,
                } as WallItem,
                (hide & CARDINAL.EAST) === CARDINAL.EAST ? undefined : {
                    type: TYPE.WALL,
                    id: `${id}-wall-e`,
                    width: thick,
                    length: length - (thick * 2),
                    height,
                    y: thick,
                    x: width - thick,
                } as WallItem,
                (hide & CARDINAL.SOUTH) === CARDINAL.SOUTH ? undefined : {
                    type: TYPE.WALL,
                    id: `${id}-wall-s`,
                    width,
                    length: thick,
                    height,
                    y: length - thick,
                } as WallItem
            ].filter(x => !!x),
        };
    }
}

const items: Item[] = [
    {
        type: TYPE.BUILDING,
        id: 'house',
        x: 12,
        y: 12,
        items: [
            h.room('patio', s.patio.width, s.patio.length, 0, s.patio.y, s.ext, undefined, CARDINAL.EAST),
            h.room('main', s.main.width, s.main.length, s.patio.width, 0, s.ext, undefined),
            h.room('rear', s.rear.width, s.rear.length, s.patio.width + s.main.width, (s.main.length - s.rear.length) / 2, s.ext, undefined, CARDINAL.WEST),
        ],
    },
    {
        type: TYPE.BUILDING,
        id: 'garage',
        // x: s.patio.width + s.main.width + s.rear.width + (32 * 12),
        // y: s.rear.length + (s.main.length - s.rear.length) / 2 - 12,
        y: s.main.length + 48,
        x: s.patio.width,
        items: [
            h.room('garage', 24 * 12, 24 * 12, 0, 0, 10),
        ],
    },
];
const register = new Map<string, Item>();
function updateRegister(all: Item[]) {
    all.forEach(i => {
        register.set(i.id, i);
        if (i.items) {
            updateRegister(i.items);
        }
    })
}
updateRegister(items);

(register.get('main') as RoomItem).noHelper = true;
(register.get('rear') as RoomItem).noHelper = true;
// (register.get('rear') as RoomItem).noHelper = true;

const addItemTo = (parentId: string, callback: (p: Item) => Item[]) => {
    const parent = register.get(parentId);
    if (parent) {
        const newItems = callback(parent);
        parent.items?.push(...newItems);
        updateRegister(newItems);
    }
}
addItemTo('main', parent => [
    { // guest bedroom
        type: TYPE.ROOM,
        id: 'guest-bed',
        x: s.ext,
        y: s.ext,
        items: [
            {
                type: TYPE.WALL,
                id: 'bed-divider',
                width: s.int,
                length: s.guest.length,
                x: s.guest.width - (s.int / 2),
            },
            {
                type: TYPE.WALL,
                id: 'guest-south',
                width: s.guest.width - (s.int / 2),
                length: s.int,
                y: s.guest.length - s.int,
                items: [
                    {
                        type: TYPE.DOOR,
                        id: 'guest-door',
                        size: s.doors.int,
                        hinge: CARDINAL.WEST,
                        swing: CARDINAL.NORTH,
                        x: s.nub,
                    },
                ]
            },
        ],
    }
]);
addItemTo('rear', parent => [
    { // stairs
        type: TYPE.ROOM,
        id: 'stairs',
        x: s.rear.width - s.stairs.width - s.ext,
        y: s.ext,
        noHelper: true,
        items: [
            {
                type: TYPE.WALL,
                id: 'stair-wall-w',
                width: s.int,
                length: s.stairs.length,
            },
            {
                type: TYPE.WALL,
                id: 'stair-wall-s',
                width: s.stairs.width - s.int,
                length: s.int,
                x: s.int,
                y: s.stairs.length - s.int - 2, // @todo - what is this nub?
                items: [
                    {
                        type: TYPE.DOOR,
                        id: 'stair-door',
                        x: s.nub,
                        size: s.doors.ext,
                        hinge: CARDINAL.WEST,
                        swing: CARDINAL.SOUTH,
                    }
                ]
            },
            {
                type: TYPE.STAIRWELL,
                id: 'stairwell',
                x: s.int,
                y: 12,
                orientation: CARDINAL.NORTH,
                width: s.stairs.width - s.int,
                length: s.stairs.length - 2 - s.int - 12,
                height: -7 * 12,
            }
        ]
    }
])


// console.log('register', register);
export const testData: SaveFile = {
    parcel: '14-12-300-009',
    width: 1320 * 12,
    length: 165 * 12,
    items,
}