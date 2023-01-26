// import tankPng from "@/assert/images/tank.png";
import tankPng from "../assert/images/tank.png";

let rotateEnum = {
    TOP: '0deg',
    LEFT: '-90deg',
    RIGHT: '90deg',
    BOTTOM: '180deg',
}
// 坦克原型
export class BaseTank {
    positionX;
    positionY;
    hp;
    direction; // 朝向
    moveSpeed = 50; // 移速
    tankPngType = null // 坦克外形
    constructor(tankCanvasContext, x = 0, y = 0, d = 'top', tankPngType = tankPng) {
        this.tankCanvasContext = tankCanvasContext;
        this.positionX = x;
        this.positionY = y;
        this.direction = d;
        this.tankPng = tankPngType
    }
    // 绘制自身坦克
    drawTank() {
        const image = new Image(75, 75);
        image.onload = () => {
            this.tankCanvasContext.drawImage(image, this.positionX, this.positionY, 75, 75);
        };
        image.src = tankPng;
    }
    leftMove() {
        this.direction = "LEFT"
        this.positionX -= this.moveSpeed;
    }
    rightMove() {
        this.direction = "RIGHT"
        this.positionX += this.moveSpeed;
    }
    topMove() {
        this.direction = "TOP"
        this.positionY -= this.moveSpeed;
    }
    bottomMove() {
        this.direction = "BOTTOM"
        this.positionY += this.moveSpeed;
    }
}

// 玩家1 坦克
export class Play1Tank extends BaseTank {
    constructor(tankCanvasContext, x = 0, y = 0, d = 'top') {
        super(tankCanvasContext, x, y, d)
        let _this = this
        document.addEventListener('keydown', (e) => { this.setAction(e, _this) })
    }
    setAction(e, _this) {
        switch (e.keyCode) {
            // 左
            case 37:
                _this.leftMove()
                break;
            // 右
            case 39:
                _this.rightMove()
                break;
            // 上
            case 38:
                _this.topMove()
                break;
            // 下
            case 40:
                _this.bottomMove()
                break;
            default:
                break;
        }
    }

}