const navMenu = document.querySelector('.nav');
const menuButton = document.querySelector('.header--menu-button');
const notificationButton = document.querySelector('.header--notification-button');
const notificationBadge = document.querySelector('.header--notification-badge');
const notificationDropdown = document.querySelector('.header--notification-dropdown');
const notificationCardCloseBtn = document.querySelector('.header--notification-item-close-btn');
const navCloseButton = document.querySelector('.nav--close-button');
const dashboardSection = document.querySelector('.dashboard');
const alertsWidget = document.querySelector('.alerts');
const trafficChartNav = document.querySelector('.traffic--nav');
const trafficChartLinks = document.querySelectorAll('.traffic--nav-link');
const trafficCanvas = document.querySelector('#traffic--chart');
const dailyCanvas = document.querySelector('#daily-chart');
const mobileCanvas = document.querySelector('#mobile-chart');
const autcompleteInput = document.querySelector('#userField');
const messageAlert = document.querySelector('.message--alert');
const messageAlertText = document.querySelector('#messageAlert');
const messageUserInput = document.querySelector('#userField');
const messageUserTextArea = document.querySelector('#messageField');
const messageBtn = document.querySelector('#messageSend');
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

const trafficDataHourly = {
  labels: ['7 PM', '8 PM', '9 PM', '10 PM', '11 PM', '12 AM'],
  datasets: [{
    data: [800, 500, 1356, 1900, 1195, 900],
    backgroundColor: 'rgba(116, 118, 191, .3)',
    borderColor: '#7476bf',
    borderWidth: 1,
    lineTension: 0,
    pointRadius: 6,
    pointBackgroundColor: 'white',
    pointBorderWidth: 2
  }]
}

const trafficDataDaily = {
  labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  datasets: [{
    data: [1500, 1550, 1675, 1800, 2000, 2400, 2500],
    backgroundColor: 'rgba(116, 118, 191, .3)',
    borderColor: '#7476bf',
    borderWidth: 1,
    lineTension: 0,
    pointRadius: 6,
    pointBackgroundColor: 'white',
    pointBorderWidth: 2
  }]
}

const trafficDataMonthly = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  datasets: [{
    data: [1100, 500, 750, 800, 600, 1500, 1200, 1356, 1000, 678, 500, 1300],
    backgroundColor: 'rgba(116, 118, 191, .3)',
    borderColor: '#7476bf',
    borderWidth: 1,
    lineTension: 0,
    pointRadius: 6,
    pointBackgroundColor: 'white',
    pointBorderWidth: 2
  }]
}

trafficChartNav.addEventListener('click', (e) => {
  e.target.style.backgroundColor = '#80C98F';
  e.target.style.color = 'white';
  for (i = 0; i < trafficChartLinks.length; i++) {
    if (trafficChartLinks[i].id != e.target.id) {
      trafficChartLinks[i].style.backgroundColor = '';
      trafficChartLinks[i].style.color = 'black';
      trafficChartLinks[i].style.color = '';
    }
  }
  if(e.target.id == 'hourly') {
    trafficChart.data = trafficDataHourly;
  } else if (e.target.id == 'daily') {
    trafficChart.data = trafficDataDaily;
  } else if (e.target.id == 'monthly') {
    trafficChart.data = trafficDataMonthly;
  } else {
    trafficChart.data = trafficData;
  }
  trafficChart.update();
})

let trafficData = {
  labels: ['16-22', '23-29', '30-5', '6-12', '13-19', '20-26', '27-3', '4-10', '11-17', '18-24', '25-31'],
  datasets: [{
    data: [750, 1250, 1000, 2000, 1500, 1750, 1250, 1850, 2250, 1500, 2500],
    backgroundColor: 'rgba(116, 118, 191, .3)',
    borderColor: '#7476bf',
    borderWidth: 1,
    lineTension: 0,
    pointRadius: 6,
    pointBackgroundColor: 'white',
    pointBorderWidth: 2
  }]
}

const trafficOptions = {
  aspectRatio: 2.5,
  maintainAspectRatio: true,
  animation: {
    duration: 0
  },
  scales: {
    yAxes: [{
      gridLines: {
        drawTicks: false
      },
      ticks: {
        beginAtZero: true,
        padding: 10
      }
    }],
    xAxes: [{
      gridLines: {
        drawTicks: false
      },
      ticks: {
        padding: 10
      }
    }]
  },
  legend: {
    display: false
  }
}

let trafficChart = new Chart(trafficCanvas, {
  type: 'line',
  data: trafficData,
  options: trafficOptions
})


const dailyData = {
  labels: ["S", "M", "T", "W", "Th", "F", "Sa"],
  datasets: [{
      label: '# of Hits',
      data: [75, 105, 180, 125, 245, 210, 110],
      backgroundColor: '#7476bf',
      borderWidth: 1,
  }]
};

const dailyOptions = {
  maintainAspectRatio: true,
  scales: {
    yAxes: [{
      gridLines: {
        drawTicks: false
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

const mobileData = {
  labels: ["Desktop", "Tablet", "Phones"],
  datasets: [{
      label: '# of Users',
      data: [2000, 550, 500],
      borderWidth: 0,
      backgroundColor: [
        '#7476bf',
        '#80C98F',
        '#74b1bf'
      ]
  }]
};

const mobileOptions = {
  maintainAspectRatio: true,
  legend: {
    position: 'right',
    labels: {
      boxwidth: 20,
      fontstyle: 'bold'
    }
  }
}

const mobileChart = new Chart(mobileCanvas, {
  type: 'doughnut',
  data: mobileData,
  options: mobileOptions
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
    messageAlertText.innerHTML = ``;
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
    settingsAlertMessage.innerHTML = ``;
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
    settingsAlertMessage.innerHTML = ``;
  }, 2000);
})
