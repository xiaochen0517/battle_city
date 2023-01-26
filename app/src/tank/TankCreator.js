import CanvasUtil from "../utils/CanvasUtil";
import tankPng from "../assert/images/tank.png";
import Tank from './Tank.js'

export default class TankCreator {
    mapCanvas;
    canvasWidth = 1275;
    canvasHeight = 900;
    constructor(id) {
        this.mapCanvas = CanvasUtil.creatorCanvasLayout(id, "tank_canvas_id", this.canvasWidth, this.canvasHeight);
    }
    drawTanksCanvas() {
        


    }





}