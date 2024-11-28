let date = new Date();
let year = date.getFullYear();
let month = date.getMonth();

const currentDate = document.querySelector('.calendar-current-date');
const day = document.querySelector('.calendar-dates');

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

function genCal() {

  const dayFirst = new Date(year, month, 1).getDay();
  const dateLast = new Date(year, month + 1, 0).getDate();
  const dayLast = new Date(year, month, dateLast).getDay();
  const monthLastDayDate = new Date(year, month, 0).getDate();
  let calHTML = '';
  
  for (let i = dayFirst; i > 0; i--) {
    calHTML += `<li class="prev-month">${monthLastDayDate - i + 1}</li>`;
  };

  for (let i = 1; i <= dateLast; i++) {
    let isToday = i === date.getDate()
    && month === new Date().getMonth()
    && year === new Date().getFullYear()
    ? "today"
    : "this-month"
    calHTML += `<li class="${isToday}">${i}</li>`;
  };

  for (let i = dayLast; i < 6; i++) {
    calHTML += `<li class="next-month">${i - dayLast + 1}</li>`;
  };

  currentDate.textContent = `${months[month]} ${year}`
  day.innerHTML = calHTML;
};

genCal();

const prevIcon = document.querySelector('#calendar-prev');
const nextIcon = document.querySelector('#calendar-next');
prevIcon.addEventListener('click', handleGenPrevMonth);
nextIcon.addEventListener('click', handleGenNextMonth);

function handleGenPrevMonth() {
  month = month - 1;

  if (month < 0 || month > 11) {
    date = new Date(year, month, new Date().getDate());
    year = date.getFullYear();
    month = date.getMonth();
  } else {
    date = new Date();
  };
  genCal();
};

function handleGenNextMonth() {
  month = month + 1;

  if (month < 0 || month > 11) {
    date = new Date(year, month, new Date().getDate());
    year = date.getFullYear();
    month = date.getMonth();
  } else {
    date = new Date();
  };
  genCal();
};