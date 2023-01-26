import CanvasUtil from "../utils/CanvasUtil";

export default class MapCreator {
    mapCanvas;
    canvasWidth = 1000;
    canvasHeight = 700;
    constructor(id) {
        this.mapCanvas = CanvasUtil.creatorCanvasLayout(id, "map_canvas_id", this.canvasWidth, this.canvasHeight);
    }

    test() {
        this.mapCanvas.fillStyle = "#000";
        this.mapCanvas.fillRect(0, 0, this.canvasWidth, this.canvasHeight)
        this.mapCanvas.strokeStyle = "#fff";
        this.mapCanvas.moveTo(0, 0);
        this.mapCanvas.lineTo(200, 100);
        this.mapCanvas.stroke();
    }
}