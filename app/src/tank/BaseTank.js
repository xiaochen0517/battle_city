import {
    AsyncParallelHook
} from "tapable";
import tankUp from "../assert/tank/player/tank_up.gif";
import tankDown from "../assert/tank/player/tank_down.gif";
import tankLeft from "../assert/tank/player/tank_left.gif";
import tankRight from "../assert/tank/player/tank_right.gif";

// 坦克原型
export default class BaseTank {
    /**
     * 图片加载使用
     */
    MAP_IMAGES = [{
            key: "tankUpImage",
            value: tankUp,
        },
        {
            key: "tankDownImage",
            value: tankDown,
        },
        {
            key: "tankLeftImage",
            value: tankLeft,
        },
        {
            key: "tankRightImage",
            value: tankRight,
        },
    ]
    tankImageLoadHook;
    positionX;
    positionY;
    hp;
    direction; // 朝向
    moveSpeed = 2; // 移速
    moveTimer = null;
    tankImage;
    MAP_BLOCK_SIZE = 75;
    MAP_BLOCK_HALF_SIZE = this.MAP_BLOCK_SIZE / 2;

    constructor(tankCanvasContext, x = 0, y = 0, d = 'top') {
        this.tankCanvasContext = tankCanvasContext;
        this.positionX = x;
        this.positionY = y;
        this.direction = d;
    }

    // 绘制自身坦克
    drawTank() {

        this.tankImageLoadHook = new AsyncParallelHook()
        this.MAP_IMAGES.forEach(imgItem => {
            this.tankImageLoadHook.tapPromise(imgItem.key, () => {
                return new Promise((reslove, reject) => {
                    let img = new Image(this.MAP_BLOCK_SIZE, this.MAP_BLOCK_SIZE)
                    img.onload = function () {
                        reslove()
                    }
                    this[imgItem.key] = img
                    this[imgItem.key].src = imgItem.value
                })
            })
        })
        this.tankImageLoadHook.callAsync(() => {
            this.tankCanvasContext.drawImage(this.tankUpImage, this.positionX, this.positionY, this.MAP_BLOCK_SIZE, this.MAP_BLOCK_SIZE);
        });
    }

    topMove() {
        if (this.direction != "TOP") {
            this.direction = "TOP";
        }
        this._setMoveTimer(1);
    }

    bottomMove() {
        if (this.direction != "BOTTOM") {
            this.direction = "BOTTOM";
        }
        this._setMoveTimer(2);
    }

    leftMove() {
        if (this.direction != "LEFT") {
            this.direction = "LEFT";
        }
        this._setMoveTimer(3);
    }

    rightMove() {
        if (this.direction != "RIGHT") {
            this.direction = "RIGHT";
        }
        this._setMoveTimer(4);
    }

    _checkAndClearTimer() {
        if (this.moveTimer != null) {
            clearInterval(this.moveTimer);
        }
    }

    _setMoveTimer(moveForward) {
        this._checkAndClearTimer();
        switch (moveForward) {
            case 1:
                this._setMoveFunction(() => {
                    this.positionY -= this.moveSpeed;
                    this.tankCanvasContext.drawImage(this.tankUpImage, this.positionX, this.positionY, 75, 75);
                })
                break;
            case 2:
                this._setMoveFunction(() => {
                    this.positionY += this.moveSpeed;
                    this.tankCanvasContext.drawImage(this.tankDownImage, this.positionX, this.positionY, 75, 75);
                })
                break;
            case 3:
                this._setMoveFunction(() => {
                    this.positionX -= this.moveSpeed;
                    this.tankCanvasContext.drawImage(this.tankLeftImage, this.positionX, this.positionY, 75, 75);
                })
                break;
            case 4:
                this._setMoveFunction(() => {
                    this.positionX += this.moveSpeed;
                    this.tankCanvasContext.drawImage(this.tankRightImage, this.positionX, this.positionY, 75, 75);
                })
                break;
        }
    }

    _setMoveFunction(fun) {
        this.moveTimer = setInterval(() => {
            this.tankCanvasContext.clearRect(this.positionX, this.positionY, 75, 75);
            fun();
        }, 10);
    }
}