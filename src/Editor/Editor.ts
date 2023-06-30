import { fabric } from 'fabric';

export default class Editor {
    canvas: fabric.Canvas;
    constructor(element: string | HTMLCanvasElement) {
        this.canvas = new fabric.Canvas(element, {
            includeDefaultValues: false,
            preserveObjectStacking: false
        });
    }
    save(propertiesToInclude?: string[]) {
        if (!this.canvas) return;
        const data = this.canvas?.toJSON(['data', ...(propertiesToInclude ?? [])]);
        console.log(data);

        return data;
    }
    async asyncLoad(json: string) {
        return new Promise((resolve) => this.canvas.loadFromJSON(json, resolve));
    }
    load(json: string) {
        this.canvas.loadFromJSON(json, () => {});
    }
}
