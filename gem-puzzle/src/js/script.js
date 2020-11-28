import GemPuzzle from './Gem-puzzle'; 
import '../css/style.css';
import '../css/popup.css';
import generateLayout from './generateLayout';

require.context('./../assets/img/box', true, /\.(png|svg|jpg|gif)$/);
require.context('./../assets/audio', true, /\.wav$/);

new GemPuzzle(4).init();
generateLayout(4, 0);
