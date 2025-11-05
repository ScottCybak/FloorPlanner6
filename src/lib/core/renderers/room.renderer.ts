import { RoomItem } from "lib/models/items/RoomItem";
import { RendererBase } from "./shared/RendererBase";
import { VIEW_TYPE } from "lib/models/View";
import { TYPE } from "lib/models/items/shared/TYPE";

export class RoomRenderer extends RendererBase<RoomItem> {
    initialize(): this {
        const e = this.element;
        const { item } = this;
        const { label, id, noHelper } = item;

        e.classList.add('room');
        
        this.isHighlighted.watch(isHighlighted => {
            e.style.background = isHighlighted ? 'var(--highlight-color)' : 'var(--floor-color)';
        });

        if (noHelper) {
            return this;
        }

        switch (this.view) {
            case VIEW_TYPE.PLANNER:
                const widths: number[] = [];
                const lengths: number[] = [];
                this.item.items
                    ?.filter(i => i.type === TYPE.WALL)
                    .forEach(i => {
                        lengths.push((i.length ?? 0) + (i.y ?? 0));
                        widths.push((i.width ?? 0) + (i.x ?? 0));
                    });
                const helper = document.createElement('div');
                const maxWidth = Math.max(...widths);
                const maxLength = Math.max(...lengths);

                helper.style.cssText = `
                    display: flex;
                    align-items: center;
                    text-align: center;
                    justify-content: center;
                    width: ${maxWidth}px;
                    height: ${maxLength}px;
                `;
                // <br>${maxWidth}&quot;x${maxLength}&quot;
                helper.innerHTML = `${label ?? id }`;
                e.appendChild(helper);                
                break;
            default:
                console.warn('unhandled roomRenderer.view', this.view);
        }
        
        return this;
    }
}