// import generateCardLayout from './generateCardLayout';

export default function handleEventOpenMenu(e, popup, startPage) {
  if (e.target.closest('.logo')) {
    popup.classList.add('visible');
  } else if (e.target.closest('.close-btn') || e.target.classList.contains('popup')) {
    popup.classList.remove('visible');
  } else if (e.target.closest('.list')) {
    popup.classList.remove('visible');
    startPage.reloadCard(e.target.closest('.list').dataset.name);
  }
}
