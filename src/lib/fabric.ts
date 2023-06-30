import { fabric } from 'fabric';

const f1 = fabric.Object.prototype.toObject;
fabric.Object.prototype.toObject = function (include) {
    const obj = f1.call(this, [...(include ?? [])]);
    delete obj.version;
    return obj;
};

const f2 = fabric.Canvas.prototype.toObject;
fabric.Canvas.prototype.toObject = function (include) {
    const obj = f2.call(this, [...(include ?? [])]);
    delete obj.version;
    return obj;
};

export default fabric;
