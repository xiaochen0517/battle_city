import './index.less'
import MapCreator from "./map/MapCreator";
import TankCreator from './tank/TankCreator';


let mapCreator = new MapCreator("myearcher");
mapCreator.init();
let tankCreator = new TankCreator("myearcher");
setInterval(() => {
    tankCreator.drawTanksCanvas();
}, 10);