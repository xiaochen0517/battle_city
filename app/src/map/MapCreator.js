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
// 地图加载使用
let loadImages = [{
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

export default class MapCreator {

    /**
     * 1：草 2：铁墙 3：基地 4：砖墙 5：水
     */
    map = [
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
    mapDamage = [
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
    canvasWidth = 1275;
    canvasHeight = 900;
    oneBoxSize = 75;
    halfBoxSize = this.oneBoxSize/2;
    mapCanvas;

    /**
     * 创建图层
     * @param {*} id 
     */
    constructor(id) {
        this.mapCanvas = CanvasUtil.creatorCanvasLayout(id, "map_canvas_id", this.canvasWidth, this.canvasHeight);
        this.loadMapImages()
    }

    /**
     * 加载图片
     */
    loadMapImages() {
        this.hook = new AsyncParallelHook()
        loadImages.forEach(imgItem => {
            this.hook.tapPromise(imgItem.key, () => {
                return new Promise((reslove, reject) => {
                    let img = new Image(75, 75)
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
            console.log('map is load end')

            this.mapCanvas.strokeStyle = "#fff";
            for (let index = 1; index < 14; index++) {
                this.mapCanvas.moveTo(75 * index, 0);
                this.mapCanvas.lineTo(75 * index, 900);
                this.mapCanvas.stroke();
            }

            for (let index = 1; index < 12; index++) {
                this.mapCanvas.moveTo(0, 75 * index);
                this.mapCanvas.lineTo(975, 75 * index);
                this.mapCanvas.stroke();
            }

            for (let heightIndex = 0; heightIndex < 12; heightIndex++) {
                for (let widthIndex = 0; widthIndex < 13; widthIndex++) {
                    let mapItem = this.map[heightIndex * 14 + widthIndex];
                    switch (mapItem) {
                        case 1:
                            this.mapCanvas.drawImage(this.grassImage, widthIndex * 75, heightIndex * 75, 75, 75);
                            break;
                        case 2:
                            this.mapCanvas.drawImage(this.steelsImage, widthIndex * 75, heightIndex * 75, 75, 75);
                            break;
                        case 3:
                            this.mapCanvas.drawImage(this.symbolImage, widthIndex * 75, heightIndex * 75, 75, 75);
                            break;
                        case 4:
                            let mapDamageItem = this.mapDamage[heightIndex * 14 + widthIndex];
                            if (mapDamageItem != 0) {
                                this.setDamageWalls(mapDamageItem, widthIndex, heightIndex);
                            } else {
                                this.mapCanvas.drawImage(this.wallsImage, widthIndex * 75, heightIndex * 75, 75, 75);
                            }
                            break;
                        case 5:
                            this.mapCanvas.drawImage(this.waterImage, widthIndex * 75, heightIndex * 75, 75, 75);
                            break;
                    }
                }
            }
        })
    }

    setDamageWalls(mapDamageItem, widthIndex, heightIndex) {
        let drawWidth = widthIndex * this.oneBoxSize;
        let drawHeight = heightIndex * this.oneBoxSize;
        let drawHalfWidth = drawWidth + this.halfBoxSize;
        let drawHalfHeight = drawHeight + this.halfBoxSize;
        switch (mapDamageItem) {
            case 1:
                this.mapCanvas.drawImage(this.wallsImage, 0, 0, 60, 30, drawWidth, drawHeight, this.oneBoxSize, this.halfBoxSize);
                break;
            case 2:
                this.mapCanvas.drawImage(this.wallsImage, 0, 0, 60, 30, drawWidth, drawHalfHeight, this.oneBoxSize, this.halfBoxSize);
                break;
            case 3:
                this.mapCanvas.drawImage(this.wallsImage, 30, 0, 30, 60, drawHalfWidth, drawHeight, this.halfBoxSize, this.oneBoxSize);
                break;
            case 4:
                this.mapCanvas.drawImage(this.wallsImage, 0, 0, 30, 60, drawWidth, drawHeight, this.halfBoxSize, this.oneBoxSize);
                break;
            case 5:
                this.mapCanvas.drawImage(this.wallsImage, 0, 0, 30, 30, drawWidth, drawHeight, this.halfBoxSize, this.halfBoxSize);
                break;
            case 6:
                this.mapCanvas.drawImage(this.wallsImage, 30, 0, 30, 30, drawHalfWidth, drawHeight, this.halfBoxSize, this.halfBoxSize);
                break;
            case 7:
                this.mapCanvas.drawImage(this.wallsImage, 0, 30, 30, 30, drawWidth, drawHalfHeight, this.halfBoxSize, this.halfBoxSize);
                break;
            case 8:
                this.mapCanvas.drawImage(this.wallsImage, 30, 30, 30, 30, drawHalfWidth, drawHalfHeight, this.halfBoxSize, this.halfBoxSize);
                break;
        }
    }

}