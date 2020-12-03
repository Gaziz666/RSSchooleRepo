export default function handleMouseHoverMenuList(e) {
  const list = e.target.closest('.letter-wrapper');
  const { length } = list.childNodes;
  const maxTransform = 5;
  const half = Math.ceil(length / 2);
  let j = 0;
  if (e.type === 'mouseenter') {
    for (let i = 1; i <= length; i += 1) {
      let transfY = 1;
      if (i <= half) {
        j = i;
        transfY = Math.floor((j * maxTransform) / half);
      } else {
        j -= 1;
        transfY = Math.floor((j * maxTransform) / half);
      }
      list.childNodes[i - 1].classList.add(`transformed${transfY}`);
    }
  } else if (e.type === 'mouseleave') {
    for (let i = 1; i <= length; i += 1) {
      let transfY = 1;
      if (i <= half) {
        j = i;
        transfY = Math.floor((j * maxTransform) / half);
      } else {
        j -= 1;
        transfY = Math.floor((j * maxTransform) / half);
      }
      list.childNodes[i - 1].classList.remove(`transformed${transfY}`);
    }
  }
}
