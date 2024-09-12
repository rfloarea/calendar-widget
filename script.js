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
  "October",
  "November",
  "December"
];

// The main function responsible for generating the correct HTML
function genCal() {
  // Get the first day of the month
  const dayFirst = new Date(year, month, 1).getDay();
  // console.log("First day of the month:", dayFirst);
  // Get the last date of the month
  const dateLast = new Date(year, month + 1, 0).getDate();
  // console.log("Last date of the month:", dateLast);
  // Get the day of `dateLast`
  const dayLast = new Date(year, month, dateLast).getDay();
  // console.log("The day of the last date of the month (0-6 == sun-sat):", dayLast);
  // Get the last day date of previous month
  const monthLastDayDate = new Date(year, month, 0).getDate();
  // console.log("Last day date of the previous month:", monthLastDayDate);

  // Init variable to hold the generated HTML
  let calHTML = '';
  // Generate elements for previous month's dates
  for (let i = dayFirst; i > 0; i--) {
    // console.log(dayFirst);
    calHTML += `<li>${monthLastDayDate - i + 1}</li>`;
  };

  // Generate elements for current month's dates
  for (let i = 1; i <= dateLast; i++) {
    // console.log(i);
    // Apply class to the element that is the current date
    // If today is the the right day of the week
    let isToday = i === date.getDate()
    // and if we are in the right month
    && month === new Date().getMonth()
    // and if it is the right year
    && year === new Date().getFullYear()
    // then apply a class of "active"
    ? "active"
    // if not, leave class blank
    : ""

    calHTML += `<li class="${isToday}">${i}</li>`;
  };

  // Generate elements for next month's dates
  for (let i = dayLast; i < 6; i++) {
    // console.log(i);
    calHTML += `<li>${i - dayLast + 1}</li>`;
  };

  // Set calendar header to correct month and year
  currentDate.textContent = `${months[month]} ${year}`

  // Display calendar
  day.innerHTML = calHTML;
};

genCal();




/* 
  This section handles "moving" to previous or next month.
  But it doesn't really "move". It triggers a regeneration of the currently displayed month.
  This gives the illusion of moving, because *we* imagine it that way.
  (We can also do some fancy transition magic to play it up more.)
  
  So all we're doing here is saying, "ah, the left arrow icon was clicked.
  Let's generate new HTML to replace the current month with the month before it".
  The same but reversed for the right arrow.
*/

// Set up selectors on icons
const prevIcon = document.querySelector('#calendar-prev');
const nextIcon = document.querySelector('#calendar-next');

// Set up event listeners
prevIcon.addEventListener('click', handleGenPrevMonth);
nextIcon.addEventListener('click', handleGenNextMonth);

/*
Since months are numbers in this system (Jan = 0, Dec = 11),
and we are incrementing and decrementing in order to "navigate",
we will eventually reach negative (decrement) or greater than 11 (increment)
which our system doesn't know how to handle (there is no month mapped to -5).

So we have to check if `month` is less than 0, or greater than 11.
If it is either of those, we have to create new dates for that new year.
If it's not (if it's within bounds), then we continue as usual.
*/ 

// Event handlers
function handleGenPrevMonth() {
  // Decrement the month variable
  month = month - 1;
  console.log(month)

  if (month < 0 || month > 11) {
    // This sets `date` as the current date of the month in the new year 
    date = new Date(year, month, new Date().getDate());
    console.log(date);
    // year number
    year = date.getFullYear();
    console.log(year);
    // month number
    month = date.getMonth();
    console.log(month);
  } else {
    // or else basically do nothing?
    date = new Date();
  };
  // Generate a new calendar
  genCal();
};
function handleGenNextMonth() {
  // Increment the month
  month = month + 1;
  console.log(month)

  if (month < 0 || month > 11) {
    // This sets `date` as the current date of the month in the new year 
    date = new Date(year, month, new Date().getDate());
    console.log(date);
    // year number
    year = date.getFullYear();
    console.log(year);
    // month number
    month = date.getMonth();
    console.log(month);
  } else {
    // or else basically do nothing
    date = new Date();
  };
  // Generate a new calendar
  genCal();
};