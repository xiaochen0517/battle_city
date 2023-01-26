import './index.less'
import MapCreator from "./map/MapCreator";
import TankCreator from './tank/TankCreator';


let tankCreator = new TankCreator("myearcher");
tankCreator.drawTanksCanvas();
let mapCreator = new MapCreator("myearcher");
mapCreator.init();