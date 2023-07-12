import fabric from '@fabric';

export default class Editor {
    canvas: fabric.Canvas;
    fabric = fabric;
    constructor(element: string | HTMLCanvasElement) {
        this.canvas = new fabric.Canvas(element, {
            includeDefaultValues: false,
            preserveObjectStacking: false
        });
    }
    save(propertiesToInclude?: string[]) {
        if (!this.canvas) return;
        const data = this.canvas?.toObject(['data', ...(propertiesToInclude ?? [])]);
        return data;
    }
    async asyncLoad(json: string) {
        return new Promise((resolve) => this.canvas.loadFromJSON(json, resolve));
    }
    load(json: string) {
        this.canvas.loadFromJSON(json, () => {});
    }
    add(...object: fabric.Object[]) {
        this.canvas.add(...object);
        const data = this.canvas.getObjects();
        return data;
    }
    remove(object: fabric.Object) {
        this.canvas.remove(object);
        const data = this.canvas.getObjects();
        return data;
    }
}
