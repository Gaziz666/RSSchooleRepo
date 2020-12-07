const openMenu = (popup) => {
  popup.classList.add('visible');
};

const closeMenu = (popup) => {
  popup.classList.remove('visible');
};

const loadCard = (e, popup, startPage) => {
  popup.classList.remove('visible');
  startPage.reloadCard(e.target.closest('.list').dataset.name);
};

export { openMenu, closeMenu, loadCard };
