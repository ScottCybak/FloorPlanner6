import { Item } from "lib/models/items/shared/Items";

const itemIndex = new Map<string, Item>();
const parentIndex = new Map<string, string>();

class RegistryService {

    add(id: string, item: Item, parent?: string) {
        itemIndex.set(id, item);
        if (parent) {
            parentIndex.set(id, parent);
        }
    }

    parentById(id: string) {
        const parent = parentIndex.get(id);
        return parent ? itemIndex.get(parent) : undefined;
    }

}

export const registryService = new RegistryService();