import { VIEW_TYPE } from "lib/models/View";
import { ViewBase } from "./base.view";

export class PlannerView extends ViewBase {

    viewType = VIEW_TYPE.PLANNER;

    override setHeight() { }

    override setLength(e: HTMLElement, length = 0) {
        e.style.height = `${length}px`
    }

    override setY(e: HTMLElement, y = 0) {
        e.style.top = `${y}px`;
    }
}