import CanvasUtil from "../utils/CanvasUtil";
import PlayerTank from './PlayerTank.js'

export default class TankCreator {
    mapCanvas;
    MAP_BLOCK_SIZE = 75;
    canvasWidth = 1275;
    canvasHeight = 900;
    tankList = []
    constructor(id) {
        this.mapCanvas = CanvasUtil.creatorCanvasLayout(id, "tank_canvas_id", this.canvasWidth, this.canvasHeight);
        

        this.mapCanvas.strokeStyle = "#fff";
        for (let index = 1; index < 14; index++) {
            this.mapCanvas.moveTo(this.MAP_BLOCK_SIZE * index, 0);
            this.mapCanvas.lineTo(this.MAP_BLOCK_SIZE * index, 900);
            this.mapCanvas.stroke();
        }

        for (let index = 1; index < 12; index++) {
            this.mapCanvas.moveTo(0, this.MAP_BLOCK_SIZE * index);
            this.mapCanvas.lineTo(975, this.MAP_BLOCK_SIZE * index);
            this.mapCanvas.stroke();
        }

        this.addTank();
    }

    addTank() {
        let playerTank = new PlayerTank(this.mapCanvas, 4 * 75, 11 * 75, 'top');
        this.tankList.push(playerTank)
    }

    drawTanksCanvas() {
        this.tankList.forEach(t => t.drawTank());
    }


}