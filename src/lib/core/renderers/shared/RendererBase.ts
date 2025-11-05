import { highlightService } from "@core/services/highlight.service";
import { ItemBase } from "lib/models/items/shared/ItemBase";
import { VIEW_TYPE } from "lib/models/View";

export abstract class RendererBase<T extends ItemBase> {
    
    protected element!: HTMLElement;

    protected isHighlighted = highlightService.highlighted.derive(
        h => !!(h && this.element?.parentElement === h)
    );

    constructor(
        protected item: T,
        protected view: VIEW_TYPE
    ) {
        const e = this.element = document.createElement('span');
        e.classList.add('rendered');
        this.initialize();
    }

    abstract initialize(): this;

    appendTo(e: HTMLElement) {
        e.appendChild(this.element);
        // attach our watcher here?

        return this;
    }
}