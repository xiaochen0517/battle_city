import './index.less'
import MapCreator from "./map/MapCreator";
import TankCreator from './tank/TankCreator';

let tankCreator = new TankCreator("myearcher");
tankCreator.init();
let mapCreator = new MapCreator("myearcher");
mapCreator.init();