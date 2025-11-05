import { DoorItem } from "lib/models/items/DoorItem";
import { VIEW_TYPE } from "lib/models/View";
import { registryService } from "@core/services/registry.service";
import { CARDINAL } from "lib/models/CARDINAL";
import { RendererBase } from "./shared/RendererBase";

export class DoorRenderer extends RendererBase<DoorItem> {

    initialize() {
        const e = this.element;
        const item = this.item;
        const parent = registryService.parentById(item.id);
        let widthLonger = true;
        e.classList.add('door');

        switch (this.view) {
            case VIEW_TYPE.PLANNER:
                const { swing, hinge, size } = item;
                const width = (widthLonger ? size : parent?.length);
                const height = widthLonger ? parent?.length : size;
                e.style.cssText = `
                    width: ${width}px;
                    height: ${height}px;
                    border: 1px solid var(--door-color);
                    background: var(--floor-color);
                `;

                const outer = document.createElement('span');
                const inner = document.createElement('span');
                outer.style.cssText = `
                    position: absolute;
                    width: ${size}px;
                    height: ${size}px;
                    border-left: 2px solid var(--door-color);
                    overflow: hidden;
                `;
                inner.style.cssText = `
                    position: absolute;
                    width: 200%;
                    height: 200%;
                    border-radius: 100%;
                    border: 1px dashed var(--door-color);
                `;
                switch (hinge) {
                    case CARDINAL.WEST:
                        break;
                    default:
                        console.warn('unhandled hinge', hinge);
                }
                switch (swing) {
                    case CARDINAL.NORTH:
                        outer.style.top = `-${size}px`;
                        inner.style.left = `-${size}px`;
                        break;
                    default:
                        console.warn('unhandled swing', swing);
                }
                outer.appendChild(inner);
                e.appendChild(outer);
                break;
        }

        this.isHighlighted.watch(isHighlighted => {
            e.style.setProperty('--door-color', isHighlighted ? 'var(--highlight-color)' : 'var(--wall-color)');
        });
        return this;
    }
}