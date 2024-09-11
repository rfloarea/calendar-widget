let date = new Date();
console.log("Current date:", date)
let year = date.getFullYear();
let month = date.getMonth();

const currentDate = document.querySelector('.calendar-current-date');
const day = document.querySelector('.calendar-dates');

// A list of months so we can use our numerical month from the Date object
// as the index in an array. See, currentDate.textContent
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
  "November",
  "December"
];

// The main function responsible for generating the correct HTML
function genCal() {
  // Get the first day of the month
  const dayFirst = new Date(year, month, 1).getDay();
  console.log("First day of the month:", dayFirst);
  // Get the last date of the month
  const dateLast = new Date(year, month + 1, 0).getDate();
  console.log("Last date of the month:", dateLast);
  // Get the day of `dateLast`
  const dayLast = new Date(year, month, dateLast).getDay();
  console.log("The day of the last date of the month (0-6 == sun-sat):", dayLast);
  // Get the last day date of previous month
  const monthLastDayDate = new Date(year, month, 0).getDate();
  console.log("Last day date of the previous month:", monthLastDayDate);

  // Init variable to hold the generated HTML
  let calHTML = '';
  // Generate elements for previous month's dates
  for (let i = dayFirst; i > 0; i--) {
    console.log(dayFirst);
    calHTML += `<li>${monthLastDayDate - i + 1}</li>`;
  };
  console.log(calHTML); // <empty string>

  // Generate elements for current month's dates
  for (let i = 1; i <= dateLast; i++) {
    console.log(i);
    calHTML += `<li>${i}</li>`;
  };

  // Generate elements for next month's dates
  for (let i = dayLast; i < 6; i++) {
    console.log(i);
    calHTML += `<li>${i - dayLast + 1}</li>`;
  };

  // Set calendar header to correct month and year
  currentDate.textContent = `${months[month]} ${year}`

  // Display calendar
  day.innerHTML = calHTML;
};

genCal();