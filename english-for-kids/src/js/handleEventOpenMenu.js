export default function handleEventOpenMenu(e, popup) {
  if (e.target.closest('.logo')) {
    popup.classList.add('visible');
  } else if (e.target.closest('.close-btn') || e.target.classList.contains('popup')) {
    popup.classList.remove('visible');
  }
}