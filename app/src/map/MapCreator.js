import CanvasUtil from "../utils/CanvasUtil";

export default class MapCreator {
    mapCanvas;
    constructor(id) {
        this.mapCanvas = CanvasUtil.creatorCanvasLayout(id, "map_canvas_id", 1000, 700);
    }

    test() {
    }
}