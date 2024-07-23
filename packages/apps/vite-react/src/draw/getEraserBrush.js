import * as fabric from 'fabric';

export default function (fabricCanvas) {
    const brush = fabric.EraserBrush
    brush.width = 10;
    return brush;
}