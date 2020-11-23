export default function handleEventOpenMenu(e, popup) {
  console.log(e.target.classList[0])
  if (e.target.closest('.logo')) {
    popup.classList.add('visible');
  } else if (e.target.closest('.close-btn') || e.target.classList[0] === 'popup') {
    popup.classList.remove('visible');
  }
}