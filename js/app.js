const navMenu = document.querySelector('.nav');
const menuButton = document.querySelector('.header--menu-button');
const notificationButton = document.querySelector('.header--notification-button');
const notificationBadge = document.querySelector('.header--notification-badge');
const notificationDropdown = document.querySelector('.header--notification-dropdown');
const notificationCardCloseBtn = document.querySelector('.header--notification-item-close-btn');
const navCloseButton = document.querySelector('.nav--close-button');
const dashboardSection = document.querySelector('.dashboard');
const alertsWidget = document.querySelector('.alerts');
const dailyCanvas = document.querySelector('#daily-chart');
const autcompleteInput = document.querySelector('#userField');
const messageAlert = document.querySelector('.message-alert');
const messageAlertText = document.querySelector('#messageAlert');
const messageUserInput = document.querySelector('#userField');
const messageUserTextArea = document.querySelector('#messageField');
const messageBtn = document.querySelector('#message-send');
const settingsAlert = document.querySelector('.small-notification');
const settingsAlertMessage = document.querySelector('#testMessage');
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

const dailyData = {
  labels: ["S", "M", "T", "W", "Th", "F", "Sa"],
  datasets: [{
      label: '# of Hits',
      data: [75, 105, 180, 125, 245, 210, 110],
      backgroundColor: '#7476bf',
      borderWidth: 1,
      hoverBackgroundColor: '#4d4c72'
  }]
};

const dailyOptions = {
  scales: {
    yAxes: [{
      gridLines: {
        drawTicks: false,
      },
      ticks: {
        beginAtZero: true,
        padding: 10,
        max: 300
      }
    }],
    xAxes: [{
      gridLines: {
        drawTicks: false
      },
      ticks: {
        padding: 10,
      }
    }]
  },
  legend: {
    display: false
  }
}

let dailyChart = new Chart(dailyCanvas, {
  type: 'bar',
  data: dailyData,
  options: dailyOptions
});





$(function(){
  const data = [
    "Dennis Nedry",
    "Dr. Alan Grant",
    "Dr. Ellie Sattler",
    "Dr. Henry Wu",
    "Dr. Ian Malcom",
    "John Hammond",
    "Lex Murphy",
    "Mr. DNA",
    "Ray Arnold",
    "Robert Muldoon",
    "Tim Murphy"
  ];
  $("#userField").autocomplete({
    source:data
  });
});

$('testMessage').slideDown;

messageBtn.addEventListener('click', () => {
  if (messageUserInput.value.length == 0 && messageUserTextArea.value.length == 0) {
    messageAlertText.innerHTML = `both fields required!`;
    messageAlert.style.backgroundColor = "#b91400";
  } else if (messageUserInput.value.length == 0) {
    messageAlertText.innerHTML = `user field required!`;
    messageAlert.style.backgroundColor = "#b91400";
  } else if (messageUserTextArea.value.length == 0) {
    messageAlertText.innerHTML = `message field required!`;
    messageAlert.style.backgroundColor = "#b91400";
  } else {
    messageAlertText.innerHTML = `message sent!`;
    messageAlert.style.backgroundColor = "#80C98F";
    messageUserInput.value = '';
    messageUserTextArea.value = '';
  }
  messageAlert.style.width = '150px';
  messageAlert.style.opacity = '100%';
  setTimeout(() => {
    messageAlert.style.width = '0px';
    messageAlert.style.opacity = '1';
  }, 2000);
  false;
})

settingsSaveBtn.addEventListener('click', () => {
  for (let i = 0; i < checkBoxes.length; i++) {
    localStorage.setItem(checkBoxes[i].value, checkBoxes[i].checked);
  }
  localStorage.setItem(settingsTimezone.id, settingsTimezone.value);
  settingsAlertMessage.innerHTML = `settings saved!`;
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
  }
  settingsTimezone.selectedIndex = 0;
  settingsAlertMessage.innerHTML = `settings cleared!`;
  settingsAlert.style.width = '100px';
  settingsAlert.style.opacity = '100%';
  setTimeout(() => {
    settingsAlert.style.width = '0px';
    settingsAlert.style.opacity = '1';
  }, 2000);
})
