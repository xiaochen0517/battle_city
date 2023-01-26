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
    moveSpeed = 2; // 移速
    tankPngType = null // 坦克外形
    moveTimer = null;
    tankImage;
    constructor(tankCanvasContext, x = 0, y = 0, d = 'top', tankPngType = tankPng) {
        this.tankCanvasContext = tankCanvasContext;
        this.positionX = x;
        this.positionY = y;
        this.direction = d;
        this.tankPng = tankPngType
    }
    // 绘制自身坦克
    drawTank() {
        this.tankImage = new Image(75, 75);
        this.tankImage.onload = () => {
            this.tankCanvasContext.drawImage(this.tankImage, this.positionX, this.positionY, 75, 75);
        };
        this.tankImage.src = tankPng;
    }

    leftMove() {
        if (this.moveTimer != null) {
            clearInterval(this.moveTimer);
        }
        this.moveTimer = setInterval(() => {
            console.log("left", this.positionX);
            this.tankCanvasContext.clearRect(this.positionX, this.positionY, 75, 75);
            this.direction = "LEFT"
            this.positionX -= this.moveSpeed;
            this.tankCanvasContext.drawImage(this.tankImage, this.positionX, this.positionY, 75, 75);
        }, 10);
    }

    rightMove() {
        if (this.moveTimer != null) {
            clearInterval(this.moveTimer);
        }
        this.moveTimer = setInterval(() => {
            this.tankCanvasContext.clearRect(this.positionX, this.positionY, 75, 75);
            this.direction = "RIGHT"
            this.positionX += this.moveSpeed;
            this.tankCanvasContext.drawImage(this.tankImage, this.positionX, this.positionY, 75, 75);
        }, 10);
    }

    topMove() {
        if (this.moveTimer != null) {
            clearInterval(this.moveTimer);
        }
        this.moveTimer = setInterval(() => {
            this.tankCanvasContext.clearRect(this.positionX, this.positionY, 75, 75);
            this.direction = "TOP"
            this.positionY -= this.moveSpeed;
            this.tankCanvasContext.drawImage(this.tankImage, this.positionX, this.positionY, 75, 75);
        }, 10);
    }

    bottomMove() {
        if (this.moveTimer != null) {
            clearInterval(this.moveTimer);
        }
        this.moveTimer = setInterval(() => {
            this.tankCanvasContext.clearRect(this.positionX, this.positionY, 75, 75);
            this.direction = "BOTTOM"
            this.positionY += this.moveSpeed;
            this.tankCanvasContext.drawImage(this.tankImage, this.positionX, this.positionY, 75, 75);
        }, 10);
    }
}

// 玩家1 坦克
export class Play1Tank extends BaseTank {
    constructor(tankCanvasContext, x = 0, y = 0, d = 'top') {
        super(tankCanvasContext, x, y, d)
        let _this = this
        document.addEventListener('keydown', (e) => {
            this.setKeyDownAction(e, _this)
        })
        document.addEventListener('keyup', (e) => {
            this.setKeyUpAction(e, _this)
        })
    }

    setKeyDownAction(e, _this) {
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

    setKeyUpAction(e, _this) {
        switch (e.keyCode) {
            // 左
            case 37:
                if (_this.direction == "LEFT") {
                    clearInterval(_this.moveTimer);
                }
                break;
                // 右
            case 39:
                if (_this.direction == "RIGHT") {
                    clearInterval(_this.moveTimer);
                }
                break;
                // 上
            case 38:
                if (_this.direction == "TOP") {
                    clearInterval(_this.moveTimer);
                }
                break;
                // 下
            case 40:
                if (_this.direction == "BOTTOM") {
                    clearInterval(_this.moveTimer);
                }
                break;
            default:
                break;
        }
    }

}