/* eslint-disable no-console */
import '../css/style.css';
import '../css/mainPage.css';
import '../css/card.css';
import '../css/menu.css';
import MainPage from './MainPage';
import cardType from './layouts/index.js';

require.context('./../assets/img', true, /\.(png|svg|jpg|gif)$/);
require.context('./../assets/audio', true, /\.(wav|mp3)$/);

new MainPage().init(cardType.cardType);
