const navMenu = document.querySelector('.nav');
const menuButton = document.querySelector('.header--menu-button');
const notificationButton = document.querySelector('.header--notification-button');
const notificationDropdown = document.querySelector('.header--notification-dropdown');
const notificationCardCloseBtn = document.querySelector('.header--notification-item-close-btn');
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
  dashboardSection.style.marginLeft = '';
  footer.style.marginLeft = '0';
  footer.style.marginLeft = '';
});

notificationButton.addEventListener('click', () => {
  if (!notificationDropdown.style.display || notificationDropdown.style.display == 'none') {
    notificationDropdown.style.display = 'block';
  } else {
    notificationDropdown.style.display = 'none';
  }
})

notificationDropdown.addEventListener('click', (e) => {
  if (e.target.nodeName == "SPAN") {
    parentOfCloseBtn = e.target.parentElement;
    if (parentOfCloseBtn.previousElementSibling == null && parentOfCloseBtn.nextElementSibling == null) {
      parentOfCloseBtn.parentElement.removeChild(parentOfCloseBtn);
      notificationDropdown.parentElement.removeChild(notificationDropdown);
    } else if (parentOfCloseBtn.previousSibling || parentOfCloseBtn.nextSibling) {
      parentOfCloseBtn.parentElement.removeChild(parentOfCloseBtn);
    }
  }
})
