// Initialize our dates
let date = new Date();
let year = date.getFullYear();
let month = date.getMonth();

// select our elements
const currentDate = document.querySelector('.calendar-current-date');
const day = document.querySelector('.calendar-dates');

// Create list of months so we can use our numerical months from the Date object
// as the index in an array. See, currentDate.textContent for use case
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

  // Init our variable to hold the generated HTML
  let calHTML = '';
  // Generate elements for previous month's dates
  for (let i = dayFirst; i > 0; i--) {
    // and apply "prev-month" class
    calHTML += `<li class="prev-month">${monthLastDayDate - i + 1}</li>`;
  };

  // Generate elements for current month's dates
  // and apply correct classes.
  for (let i = 1; i <= dateLast; i++) {
    // If i is the same as the date for this month
    let isToday = i === date.getDate()
    // and if we are in the right month
    && month === new Date().getMonth()
    // and if it is the right year
    && year === new Date().getFullYear()
    // then apply a "today" class
    ? "today"
    // if not, apply a "this-month" class
    : "this-month"

    calHTML += `<li class="${isToday}">${i}</li>`;
  };

  // Generate elements for next month's dates
  for (let i = dayLast; i < 6; i++) {
    // and apply a "next-month" class
    calHTML += `<li class="next-month">${i - dayLast + 1}</li>`;
  };

  // Update calendar header to correct month and year
  currentDate.textContent = `${months[month]} ${year}`

  // Feed our day element the HTML we generated
  day.innerHTML = calHTML;
};

// call that baby!
genCal();

/* 
  This section handles "moving" to previous or next month.
  But it doesn't really "move". It triggers a regeneration of the currently displayed month.
  This gives the illusion of moving, because *we* imagine it that way.
  (We can also do some fancy transition magic to play it up more if you'd like.)
  
  So all we're doing here is saying, "ah, the left arrow icon was clicked.
  Let's generate new HTML to replace the current month with the dates of the month before it".
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

/** 
 * Two event handlers!
 * There are ways to group these two functions 
 * by calling forEach on the icons. I'm not doing that because I like how
 * redundant this is :P
 */

function handleGenPrevMonth() {
  // Decrement the month
  month = month - 1;

  if (month < 0 || month > 11) {
    // This sets `date` as the current date of the month in the new year 
    date = new Date(year, month, new Date().getDate());
    // console.log(date);
    // Get our year
    year = date.getFullYear();
    // console.log(year);
    // Get our month
    month = date.getMonth();
    // console.log(month);
  } else {
    // or else basically do nothing
    date = new Date();
  };
  // Generate a new calendar with these new variables
  genCal();
};

function handleGenNextMonth() {
  // Increment the month
  month = month + 1;
  // console.log(month)

  if (month < 0 || month > 11) {
    // This sets `date` as the current date of the month in the new year 
    date = new Date(year, month, new Date().getDate());
    // console.log(date);
    // Get our year
    year = date.getFullYear();
    // console.log(year);
    // Get our month
    month = date.getMonth();
    // console.log(month);
  } else {
    // or else basically do nothing
    date = new Date();
  };
  // Generate a new calendar with these new variables
  genCal();
};

/**
 * As you can see, the greater portion of these handlers are the same.
 * We could set up a condition that determines if we should increment or decrement month.
 * The rest should take care of itself.
 */