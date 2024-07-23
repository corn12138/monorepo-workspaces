import * as fabric from 'fabric';
export default function (fabricCanvas) {
    const brush = new fabric.PencilBrush(fabricCanvas);
    brush.width = 50;
    brush.color = 'red';
    brush.strokeLineJoin = 'round';
    brush.strokeLineCap = 'square';
    return brush;
}