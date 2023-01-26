export default class CanvasUtil {

    static creatorCanvasLayout(boxId, canvasId, width = 200, height = 200) {
        let canvasBox = document.getElementById(boxId);
        let canvasDiv = document.createElement("canvas");
        canvasDiv.setAttribute("id", canvasId);
        canvasDiv.setAttribute("style", "background:black;")
        canvasBox.append(canvasDiv);
        return canvasDiv.getContext("2d");
    }
}