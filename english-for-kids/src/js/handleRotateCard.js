const handleRotateCard = (e, front, back) => {
  console.log(e)
  if (e.target.closest('.front')) {
    front.classList.add('front-transform');
    back.classList.add('back-transform');
  } else {
    front.classList.remove('front-transform');
    back.classList.remove('back-transform');
  }
};

export default handleRotateCard;
