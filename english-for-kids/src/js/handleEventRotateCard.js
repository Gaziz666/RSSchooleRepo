const rotateCard = (front, back) => {
  front.classList.add('front-transform');
  back.classList.add('back-transform');
};

const reversRotateCard = (front, back) => {
  front.classList.remove('front-transform');
  back.classList.remove('back-transform');
};

export { rotateCard, reversRotateCard };
