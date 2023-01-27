import {
    AsyncParallelHook
} from "tapable";
import CanvasUtil from "../utils/CanvasUtil";
// 地图图片资源
import grass from "@/assert/map/grass.gif";
import steels from "@/assert/map/steels.gif";
import symbol from "@/assert/map/symbol.gif";
import walls from "@/assert/map/walls.gif";
import water from "@/assert/map/water.gif";

export default class MapCreator {

    /**
     * 图片加载使用
     */
    MAP_IMAGES = [{
            key: "grassImage",
            value: grass,
        },
        {
            key: "steelsImage",
            value: steels
        },
        {
            key: "symbolImage",
            value: symbol
        },
        {
            key: "wallsImage",
            value: walls
        },
        {
            key: "waterImage",
            value: water
        }
    ]

    /**
     * 1：草 2：铁墙 3：基地 4：砖墙 5：水
     */
    MAP_DATA = [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        1, 1, 4, 4, 4, 0, 4, 4, 4, 0, 4, 4, 4, 0,
        1, 1, 4, 0, 4, 2, 2, 2, 2, 2, 2, 2, 2, 0,
        1, 1, 4, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4,
        5, 5, 5, 5, 4, 4, 4, 4, 4, 5, 5, 5, 5, 5,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        2, 2, 2, 2, 4, 4, 4, 4, 4, 4, 2, 2, 2, 2,
        4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 4, 4, 4, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 4, 3, 4, 0, 0, 0, 0, 0, 0
    ]

    /**
     * 1: %% 2: -- 3: -% 4: %- 5: %- 6: -% 7: -- 8: --
     *    --    %%    -%    %-    --    --    %-    -%
     */
    MAP_DAMAGE_DATA = [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        1, 2, 3, 4, 5, 6, 7, 8, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
    ]
    CANVAS_WIDTH = 1275;
    CANVAS_HEIGHT = 900;
    MAP_BLOCK_SIZE = 75;
    MAP_BLOCK_HALF_SIZE = this.MAP_BLOCK_SIZE / 2;
    mapCanvas;

    /**
     * 创建图层
     * @param {*} id 
     */
    constructor(id) {
        this.mapCanvas = CanvasUtil.creatorCanvasLayout(id, "map_canvas_id", this.CANVAS_WIDTH, this.CANVAS_HEIGHT);
        this.loadMAP_IMAGES()
    }

    /**
     * 加载图片
     */
    loadMAP_IMAGES() {
        this.hook = new AsyncParallelHook()
        this.MAP_IMAGES.forEach(imgItem => {
            this.hook.tapPromise(imgItem.key, () => {
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
    }

    


    init() {
        this.hook.callAsync(() => {
            for (let heightIndex = 0; heightIndex < 12; heightIndex++) {
                for (let widthIndex = 0; widthIndex < 13; widthIndex++) {
                    let mapItem = this.MAP_DATA[heightIndex * 14 + widthIndex];
                    let imageDrawPositionX = widthIndex * this.MAP_BLOCK_SIZE;
                    let imageDrawPositionY = heightIndex * this.MAP_BLOCK_SIZE;
                    switch (mapItem) {
                        case 1:
                            this._drawMapOnCanvas(this.grassImage, imageDrawPositionX, imageDrawPositionY);
                            break;
                        case 2:
                            this._drawMapOnCanvas(this.steelsImage, imageDrawPositionX, imageDrawPositionY);
                            break;
                        case 3:
                            this._drawMapOnCanvas(this.symbolImage, imageDrawPositionX, imageDrawPositionY);
                            break;
                        case 4:
                            let mapDamageItem = this.MAP_DAMAGE_DATA[heightIndex * 14 + widthIndex];
                            if (mapDamageItem != 0) {
                                this.setDamageWalls(mapDamageItem, imageDrawPositionX, imageDrawPositionY);
                            } else {
                                this._drawMapOnCanvas(this.wallsImage, imageDrawPositionX, imageDrawPositionY);
                            }
                            break;
                        case 5:
                            this._drawMapOnCanvas(this.waterImage, imageDrawPositionX, imageDrawPositionY);
                            break;
                    }
                }
            }
        })
    }

    _drawMapOnCanvas(image, positionX, positionY) {
        this.mapCanvas.drawImage(image, positionX, positionY, this.MAP_BLOCK_SIZE, this.MAP_BLOCK_SIZE);
    }

    MAP_IMAGES_SIZE = 60;
    MAP_IMAGES_HALF_SIZE = 30;

    setDamageWalls(mapDamageItem, positionX, positionY) {
        let halfPositionX = positionX + this.MAP_BLOCK_HALF_SIZE;
        let halfPositionY = positionY + this.MAP_BLOCK_HALF_SIZE;
        switch (mapDamageItem) {
            case 1:
                this._drawDamagedWalls(0, 0, this.MAP_IMAGES_SIZE, this.MAP_IMAGES_SIZE, positionX, positionY);
                break;
            case 2:
                this._drawDamagedWalls(0, 0, this.MAP_IMAGES_SIZE, this.MAP_IMAGES_SIZE, positionX, halfPositionY);
                break;
            case 3:
                this._drawDamagedWalls(this.MAP_IMAGES_SIZE, 0, this.MAP_IMAGES_SIZE, this.MAP_IMAGES_SIZE, halfPositionX, positionY);
                break;
            case 4:
                this._drawDamagedWalls(0, 0, this.MAP_IMAGES_SIZE, this.MAP_IMAGES_SIZE, positionX, positionY);
                break;
            case 5:
                this._drawDamagedWalls(0, 0, this.MAP_IMAGES_SIZE, this.MAP_IMAGES_SIZE, positionX, positionY);
                break;
            case 6:
                this._drawDamagedWalls(this.MAP_IMAGES_SIZE, 0, this.MAP_IMAGES_SIZE, this.MAP_IMAGES_SIZE, halfPositionX, positionY);
                break;
            case 7:
                this._drawDamagedWalls(0, this.MAP_IMAGES_SIZE, this.MAP_IMAGES_SIZE, this.MAP_IMAGES_SIZE, positionX, halfPositionY);
                break;
            case 8:
                this._drawDamagedWalls(this.MAP_IMAGES_SIZE, this.MAP_IMAGES_SIZE, this.MAP_IMAGES_SIZE, this.MAP_IMAGES_SIZE, halfPositionX, halfPositionY);
                break;
        }
    }

    _drawDamagedWalls(imageX, imageY, imageWidth, imageHeight, positionX, positionY) {
        this.mapCanvas.drawImage(this.wallsImage, imageX, imageY, imageWidth, imageHeight, positionX, positionY, this.MAP_BLOCK_HALF_SIZE, this.MAP_BLOCK_HALF_SIZE);
    }
}