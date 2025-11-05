export enum VIEW_TYPE {
    PLANNER = 'planner',
}

interface ViewBase {
    coords: {x: number, y: number };
    zoom: number;
}

interface PlannerView extends ViewBase {
    type: VIEW_TYPE.PLANNER,
}

export type View = PlannerView;