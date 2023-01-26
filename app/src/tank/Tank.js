export default class Tank {
    positionX;
    positionY;
    hp;
    direction;
    constructor() {

    }
    init() {
        const image = new Image(75, 75);
        image.onload = () => {
            this.mapCanvas.drawImage(image, 75 * 4, 75 * 11, 75, 75);
        };
        image.src = tankPng;
    }
}