import { getRenderer } from "@core/getRenderer";
import { fileService } from "@core/services/file.service";
import { registryService } from "@core/services/registry.service";
import { Item } from "lib/models/items/shared/Items";
import { VIEW_TYPE } from "lib/models/View";

export abstract class ViewBase {

    abstract viewType: VIEW_TYPE;

    protected element!: HTMLElement;
    protected items = fileService.items;
    protected dimensions = fileService.dimensions;

    initialize(): HTMLElement {
        
        const e = this.element = document.createElement('div');
        const host = document.querySelector('#ui-view');
        e.classList.add('view');
        if (!host) {
            console.warn('no element with id="ui-view" was found');
            return e;
        } else {
            host.childNodes.forEach(c => host.removeChild(c));
            host.appendChild(e);
        }
        
        this.dimensions.watch(({width, length}) => {
            this.setWidth(e, width);
            this.setLength(e, length);
        });
        this.items.watch(items => this.addItems(e, items));
        this.afterItemsAdded();

        return e;
    }

    addItems(parent: HTMLElement, items: Item[] = []) {
        // we need to add ourselves to the registry?
        items.forEach(item => {
            const e = document.createElement('div');
            e.classList.add('item', `item-type-${item.type}`);
            this.setCommonAttributes(e, item);
            registryService.add(item.id, item, parent.id);
            // ok, set any special attributes
            const Renderer = getRenderer(item.type);
            if (Renderer) {
                new Renderer(item, this.viewType).appendTo(e);
            }
            parent.appendChild(e);
            if (item?.items) {
                this.addItems(e, item.items);
            }
        });
    }

    private setCommonAttributes(e: HTMLElement, item: Item) {
        const {id, width, length, height, x, y, z } = item;
        e.setAttribute('id', id);
        if (width || width === 0) this.setWidth(e, width);
        if (length || length === 0) this.setLength(e, length);
        if (height || height === 0) this.setHeight(e, height);
        if (x || x === 0) this.setX(e, x);
        if (y || y === 0) this.setY(e, y);
        if (z || z === 0) this.setZ(e, z);
    }

    setWidth(element: HTMLElement, width = 0) {
        element.style.width = `${width}px`; // this is fine
    }

    setHeight(element: HTMLElement, height = 0) {
        element.style.height = `${height}px`; // this ISNT fine
    }

    setLength(element: HTMLElement, length = 0) {
        console.warn('@todo: base.view:setLength');
    }

    setX(element: HTMLElement, x = 0) {
        element.style.left = `${x}px`;
    }

    setY(element: HTMLElement, y = 0) {
        console.warn('@todo: base.view:setY');
    }

    setZ(element: HTMLElement, z = 0) {
        element.style.top = `${z}px`;
    }

    afterItemsAdded() {
        console.log('afterItemsAdded');
    }

}