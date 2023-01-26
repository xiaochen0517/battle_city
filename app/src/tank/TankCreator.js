import CanvasUtil from "../utils/CanvasUtil";
import { Play1Tank } from './Tank.js'

export default class TankCreator {
    mapCanvas;
    canvasWidth = 1275;
    canvasHeight = 900;
    tankList = []
    constructor(id) {
        this.mapCanvas = CanvasUtil.creatorCanvasLayout(id, "tank_canvas_id", this.canvasWidth, this.canvasHeight);
        this.addTank()
    }
    addTank() {
        let play1 = new Play1Tank(this.mapCanvas, 4 * 75, 11 * 75, 'top')
        this.tankList.push(play1)
    }
    drawTanksCanvas() {
        
        this.tankList.forEach(t => t.drawTank())
    }


}