export default function handlePlayToggle(e, container) {
  if (e.target.checked) {
    container.childNodes.forEach((child) => {
      console.log(child)
      if (child.className === 'card-name') {
        child.classList.add('margin-top__0');
      }
    });
  } else {
    container.childNodes.forEach((child) => {
      if (child.className === 'card-name') {
        child.classList.remove('margin-top__0');
      }
    });
  }
}
