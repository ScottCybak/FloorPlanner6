import { fileService } from "./file.service";
import { highlightService } from "./highlight.service";
import { viewService } from "./view.service";

class AppService {

    protected hostElement!: Element;

    protected readonly title = 'Floor Planner';

    init(
        appendTo: Element | string,
    ): AppService {
        const target = appendTo instanceof Element ? appendTo : document.querySelector(appendTo);
        if (target) {
            this.hostElement = target;
        } else {
            console.warn('unable to attach to an element, are you sure it exists?', appendTo);
        }

        viewService.init();
        highlightService.init();

        fileService.parcel.watch(parcel => {
            document.title = parcel ? `${this.title}: ${parcel}` : this.title;
        });

        return this;
    }
}

export const appService = new AppService();