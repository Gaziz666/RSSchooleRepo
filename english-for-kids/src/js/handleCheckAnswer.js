import handleEventClickCard from './handleEventClickCard';

const handleCheckAnswer = (e, container, index) => {
  const audioName = container.childNodes[index].firstChild.id;
  const card = e.target;
  if (card.dataset.name === audioName) {
    card.classList.add('inactive');
    card.removeEventListner('click', func);
  } else {

  }
  console.log('work listenet');
  console.log(card.dataset.name);
  console.log(container.childNodes[index].firstChild.id);
};

export default handleEventClickCard;
