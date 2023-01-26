import './index.less'
import MapCreator from "./map/MapCreator";
import TankCreator from './tank/TankCreator';

let mapCreator = new MapCreator("myearcher");
mapCreator.test();
let tankCreator = new TankCreator("myearcher");
tankCreator.test();