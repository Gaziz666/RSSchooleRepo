export default function handleEventClickCard(e, toggle, audio) {
  if (!toggle.checked && e.target.className !== 'rotate-btn') {
    audio.play();
  }
}
