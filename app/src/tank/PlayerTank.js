import BaseTank from "./BaseTank"

// 玩家1 坦克
export default class PlayerTank extends BaseTank {

    upKeyStatus = false;
    downKeyStatus = false;
    leftKeyStatus = false;
    rightKeyStatus = false;

    constructor(tankCanvasContext, x = 0, y = 0, d = 'top') {
        super(tankCanvasContext, x, y, d)
        let _this = this
        document.addEventListener('keydown', (e) => {
            console.log("keydown");
            this.setKeyDownAction(e, _this)
            console.log("up:", this.upKeyStatus, " down:", this.downKeyStatus, " left:", this.leftKeyStatus, " right:", this.rightKeyStatus);
        })
        document.addEventListener('keyup', (e) => {
            this.setKeyUpAction(e, _this)
        })
        // let timer = setInterval(() => {
        //     console.log("up:", this.upKeyStatus, " down:", this.downKeyStatus, " left:", this.leftKeyStatus, " right:", this.rightKeyStatus);
        // }, 500);
    }

    setKeyDownAction(e, _this) {
        switch (e.keyCode) {
            // 左
            case 37:
                this.leftKeyStatus = true;
                _this.leftMove()
                break;
                // 右
            case 39:
                this.rightKeyStatus = true;
                _this.rightMove()
                break;
                // 上
            case 38:
                this.upKeyStatus = true;
                _this.topMove()
                break;
                // 下
            case 40:
                this.downKeyStatus = true;
                _this.bottomMove()
                break;
            default:
                break;
        }
    }

    setKeyUpAction(e, _this) {
        if (e.keyCode < 37 || e.keyCode > 40) {
            return;
        }
        switch (e.keyCode) {
            // 左
            case 37:
                _this.leftKeyStatus = false;
                if (_this.direction == "LEFT") {
                    clearInterval(_this.moveTimer);
                }
                break;
                // 右
            case 39:
                _this.rightKeyStatus = false;
                if (_this.direction == "RIGHT") {
                    clearInterval(_this.moveTimer);
                }
                break;
                // 上
            case 38:
                _this.upKeyStatus = false;
                if (_this.direction == "TOP") {
                    clearInterval(_this.moveTimer);
                }
                break;
                // 下
            case 40:
                _this.downKeyStatus = false;
                if (_this.direction == "BOTTOM") {
                    clearInterval(_this.moveTimer);
                }
                break;
            default:
                break;
        }
        clearInterval(_this.moveTimer);
        _this._arrowKeyUp(_this);
    }

    _arrowKeyUp(_this) {
        if (_this.upKeyStatus) {
            _this.topMove();
        } else if (_this.downKeyStatus) {
            _this.bottomMove();
        } else if (_this.leftKeyStatus) {
            _this.leftMove();
        } else if (_this.rightKeyStatus) {
            _this.rightMove();
        }
    }

}