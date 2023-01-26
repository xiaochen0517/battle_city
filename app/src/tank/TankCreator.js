import CanvasUtil from "../utils/CanvasUtil";
import tankPng from "../assert/images/tank.png";

export default class TankCreator {
    mapCanvas;
    canvasWidth = 1275;
    canvasHeight = 900;
    constructor(id) {
        this.mapCanvas = CanvasUtil.creatorCanvasLayout(id, "tank_canvas_id", this.canvasWidth, this.canvasHeight);
    }

    test() {
        const image = new Image(75, 75);
        image.onload = () => {
            this.mapCanvas.drawImage(image, 0, 0, 75, 75);
        };
        image.src = tankPng;
    }
}