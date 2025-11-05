import { ViewBase } from "@core/views/base.view";
import { PlannerView } from "@core/views/planner.view";
import { Watched } from "@core/Watched";
import { View, VIEW_TYPE } from "lib/models/View";

const viewTypeToView: {[key in VIEW_TYPE]: new () => ViewBase} = {
    [VIEW_TYPE.PLANNER]: PlannerView,
}

class ViewService {

    private _activeView = new Watched<View>({
        type: VIEW_TYPE.PLANNER,
        coords: {x: 0, y: 0},
        zoom: 1,
    });
    
    activeType = this._activeView.derive(v => v.type);    

    constructor() {
        this.activeType.watch(v => this.setActiveView(v));
    }

    setActiveView(type: VIEW_TYPE) {
        const View = viewTypeToView[type];
        if (View) {
            new View().initialize();
        } else {
            console.warn('unable to map that view - does it extend BaseView and is it in our viewTypeToView map?');
        }
    }

    init() { }
}

export const viewService = new ViewService();