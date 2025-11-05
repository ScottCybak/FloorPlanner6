import { StairwellItem } from "lib/models/items/StairwellItem";
import { RendererBase } from "./shared/RendererBase";
import { CARDINAL } from "lib/models/CARDINAL";
import { calculateStairwell, CalculateStairwellResponse } from "@core/calculateStairwell";
import { Watched } from "@core/Watched";

export class StairwellRenderer extends RendererBase<StairwellItem> {

    // private calculated = new Watched<CalculateStairwellResponse | undefined>(undefined);

    initialize(): this {
        console.log('figure this out...', this);
        
        const item = this.item;
        const e = this.element;
        const { width, height, length, orientation } = item;
        const calculated = calculateStairwell(Math.abs(height), length);

        // this.calculated.set(calculated);

        const { steps, run, warnings} = calculated;
        const hasWarnings = !!warnings.length;
        if (hasWarnings) {
            console.warn('stairwell has issues', warnings);
        }
        switch (orientation) {
            case CARDINAL.NORTH:
                // --stair-color: var(${hasWarnings ? '--warn-color' : '--wall-color'});
                e.style.cssText = `
                    width: ${width}px;
                    height: ${length}px;
                    --stair-color: var(--wall-color);
                `;
                for (let i = 0; i < steps; i++) {
                    const stair = document.createElement('div');
                    stair.style.cssText = `
                        position: absolute;
                        width: ${width}px;
                        height: ${run}px;
                        bottom: ${run * i}px;
                        border-top: 1px solid var(--stair-color);
                    `;
                    e.appendChild(stair);
                }
                break;
            default:
                console.warn('unhandled orientation', orientation);
        }
        
        this.isHighlighted.watch(isHighlighted => {
            e.style.background = isHighlighted ? 'var(--highlight-color)' : '';
        })

        return this;
    }
}