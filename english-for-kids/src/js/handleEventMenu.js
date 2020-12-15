const openMenu = (popup) => {
  popup.classList.add('visible');
};

const closeMenu = (popup) => {
  popup.classList.remove('visible');
};

const loadCard = (e, popup, startPage) => {
  e.target.closest('.nav-menu').childNodes.forEach((list) => {
    list.classList.remove('list-background');
  });
  e.target.closest('.list').classList.add('list-background');
  popup.classList.remove('visible');
  startPage.reloadCard(e.target.closest('.list').dataset.name);
};

export { openMenu, closeMenu, loadCard };
