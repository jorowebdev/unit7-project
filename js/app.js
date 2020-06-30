const navMenu = document.querySelector('.nav');
const menuButton = document.querySelector('.header--menu-button');
const navCloseButton = document.querySelector('.nav--close-button');
const dashboardSection = document.querySelector('.dashboard');
const footer = document.querySelector('.footer');

menuButton.addEventListener('click', () => {
  navMenu.style.width = '62px';
  dashboardSection.style.marginLeft = '62px';
  footer.style.marginLeft = '62px';
});

navCloseButton.addEventListener('click', () => {
  navMenu.style.width = '0';
  navMenu.style.width = '';
  dashboardSection.style.marginLeft = '0';
  footer.style.marginLeft = '0';
});
