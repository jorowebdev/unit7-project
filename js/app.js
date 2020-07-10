const navMenu = document.querySelector('.nav');
const menuButton = document.querySelector('.header--menu-button');
const notificationButton = document.querySelector('.header--notification-button');
const notificationBadge = document.querySelector('.header--notification-badge');
const notificationDropdown = document.querySelector('.header--notification-dropdown');
const notificationCardCloseBtn = document.querySelector('.header--notification-item-close-btn');
const navCloseButton = document.querySelector('.nav--close-button');
const dashboardSection = document.querySelector('.dashboard');
const alertsWidget = document.querySelector('.alerts');
const settingsAlert = document.querySelector('.small-notification');
const checkBoxes = document.querySelectorAll('.widget-checkbox');
const settingsTimezone = document.querySelector('#timezone');
const settingsSaveBtn = document.querySelector('#save');
const settingsCancelBtn = document.querySelector('#cancel');
const footer = document.querySelector('.footer');

const supportsLocalStorage = () => {
  try {
    return 'localStorage' in window && window ['localStorage'] !== null;
  } catch(e) {
    return false;
  }
}

window.onload = () => {
  const alertsContainer = document.createElement("DIV");
  alertsContainer.classList.add("alerts--container");
  alertsContainer.innerHTML = `
    <div class="alerts--card">
      <h5 class="alerts--card-title">Alert!</h5>
      <p class="alerts--card-text">This is an alert.</p>
      <i class="alerts--card-close-btn material-icons-round">close</i>
    </div>
  `;
  alertsWidget.appendChild(alertsContainer);

  if (supportsLocalStorage()) {
    for (let i = 0; i < checkBoxes.length; i++) {
      if (localStorage.getItem(checkBoxes[i].value) === "true") {
        checkBoxes[i].checked = true;
      } else {
        checkBoxes[i].checked = false;
      }
    }
    if (localStorage.getItem(settingsTimezone.id) != null) {
      settingsTimezone.value = localStorage.getItem(settingsTimezone.id);
    }
  }
};

// window.onload = () => {
//   if (supportsLocalStorage()) {
//     for (let i = 0; i < checkBoxes.length; i++) {
//       if (localStorage.getItem(checkBoxes[i].value) === "true") {
//         checkBoxes[i].checked = true;
//       } else {
//         checkBoxes[i].checked = false;
//       }
//     }
//     settingsTimezone.value = localStorage.getItem(settingsTimezone.id);
//   }
// }

menuButton.addEventListener('click', () => {
  if (!navMenu.style.width || navMenu.style.width == '0') {
    navMenu.style.width = '62px';
    dashboardSection.style.marginLeft = '62px';
    footer.style.marginLeft = '62px';
  } else {
    navMenu.style.width = '0';
    navMenu.style.width = '';
    dashboardSection.style.marginLeft = '0';
    dashboardSection.style.marginLeft = '';
    footer.style.marginLeft = '0';
    footer.style.marginLeft = '';
  }
});

// menuButton.addEventListener('click', () => {
//   navMenu.style.width = '62px';
//   dashboardSection.style.marginLeft = '62px';
//   footer.style.marginLeft = '62px';
// });

// navCloseButton.addEventListener('click', () => {
//   navMenu.style.width = '0';
//   navMenu.style.width = '';
//   dashboardSection.style.marginLeft = '0';
//   dashboardSection.style.marginLeft = '';
//   footer.style.marginLeft = '0';
//   footer.style.marginLeft = '';
// });

notificationButton.addEventListener('click', () => {
  notificationBadge.remove();
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

alertsWidget.addEventListener('click', (e) => {
  if (e.target.nodeName == "I") {
    parentOfCloseBtn = e.target.parentElement;
    parentOfCloseBtn.parentElement.removeChild(parentOfCloseBtn);
    alertsWidget.removeChild(alertsWidget.firstElementChild);
  }
})

settingsSaveBtn.addEventListener('click', () => {
  for (let i = 0; i < checkBoxes.length; i++) {
    localStorage.setItem(checkBoxes[i].value, checkBoxes[i].checked);
  }
  localStorage.setItem(settingsTimezone.id, settingsTimezone.value);
  settingsAlert.style.width = '92.11px';
  settingsAlert.style.opacity = '100%';
  setTimeout(() => {
    settingsAlert.style.width = '0px';
    settingsAlert.style.opacity = '1';
  }, 2000);
})

settingsCancelBtn.addEventListener('click', () => {
  localStorage.clear();
  for (let i = 0; i < checkBoxes.length; i++) {
    checkBoxes[i].checked = false;
    console.log(checkBoxes[i].checked);
  }
  settingsTimezone.selectedIndex = 0;
})
