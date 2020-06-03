const navMenu = document.querySelector('.nav');
const menuButton = document.querySelector('.header--menu-button');
const navCloseButton = document.querySelector('.nav--close-button');
const dashboardSection = document.querySelector('.dashboard');

menuButton.addEventListener('click', () => {
  navMenu.style.width = '72px';
  dashboardSection.style.marginLeft = '72px';
});

navCloseButton.addEventListener('click', () => {
  navMenu.style.width = '0';
  dashboardSection.style.marginLeft = '0';
});
