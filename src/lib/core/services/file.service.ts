import { Watched } from "@core/Watched";
import { SaveFile } from "lib/models/SaveFile";

class FileService {

    private _file = new Watched<SaveFile | undefined>(undefined);

    items = this._file.derive(file => file?.items ?? []);
    
    dimensions = this._file.derive(file => ({
        width: file?.width || 0,
        length: file?.length || 0
    }));

    parcel = this._file.derive(file => file?.parcel);

    init() {}

    loadFile(file: SaveFile) {
        this._file.set(file);
    }
}

export const fileService = new FileService();