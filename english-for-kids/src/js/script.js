import '../css/style.css';
import '../css/mainPage.css';
import '../css/card.css';
import '../css/menu.css';
import MainPage from './MainPage';
import loadCardObj from './cards/loadCardObj';
import CARD_TYPE from './cards/CARD_TYPE';

require.context('./../assets/img', true, /\.(png|svg|jpg|gif)$/);
require.context('./../assets/audio', true, /\.(wav|mp3)$/);

new MainPage().init(loadCardObj(CARD_TYPE.MAIN));
