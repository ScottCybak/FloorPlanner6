import { debounce } from "@core/debounce";
import { listen } from "@core/listen";
import { Watched } from "@core/Watched";

class HighlightService {

    readonly delayMs = 1000 / 120;
    readonly highlightClass = 'highlight';

    private _highlighted = new Watched<HTMLElement | undefined>(undefined);

    highlighted = this._highlighted.asReadonly();

    init() {
        const host = document.querySelector('#ui-view');
        if (host) {
            listen(host, 'mousemove', debounce(this.onMouseMove.bind(this), this.delayMs));
        } else {
            console.warn('unable to find selection host element');
        }
    }

    setHighlighted(highlighted: HTMLElement | undefined) {
        // check to see if previous selection
        const current = this._highlighted.get();
        if (current !== highlighted && current) {
            current.classList.remove(this.highlightClass);
        }
        if (highlighted) {
            highlighted.classList.add(this.highlightClass);
        }
        this._highlighted.set(highlighted);
    }

    onMouseMove(evt: MouseEvent) {
        const { screenX, screenY } = evt;
        this.setHighlighted(
            (document.elementFromPoint(screenX, screenY)?.closest('.item') as HTMLElement) ?? undefined
        );
    }
}

export const highlightService = new HighlightService();