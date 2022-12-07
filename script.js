/* Name: My Day 
version: v 0.0.1
Author: Ridwan Alawode 
____________________________________
____________________________________*/

/* Contents

Essential Element .......1.0
Variables.......2.0
Events.......3.0
Functions.......3.0
Initial Function Calls.......3.0
____________________________________*/

/*
Essential Element .......1.0
____________________________________*/
const _ZONE_INDICATOR = document.querySelector('.zone-indicator');
const _TIME = document.querySelector('.time h1');
const _DATE = document.querySelector('.date');
const _WTGB = document.querySelector('.words-to-go-by p');
const _INDICATOR_X = document.querySelector('#indicator-x');
const _INDICATOR_Y = document.querySelector('#indicator-y');

/*
Varaibles .......2.0
____________________________________*/
const yearsOfTheMonth = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const daysOfTheWeek = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thurday',
  'Friday',
  'Saturday',
];

/*
Events .......1.0
____________________________________*/

/*
Function .......1.0
____________________________________*/

const formatTime = (dateObject) => {
  return `${
    (dateObject.getHours() + '').length < 2
      ? '0' + dateObject.getHours()
      : dateObject.getHours()
  }:${
    (dateObject.getMinutes() + '').length < 2
      ? '0' + dateObject.getMinutes()
      : dateObject.getMinutes()
  }:${
    (dateObject.getSeconds() + '').length < 2
      ? '0' + dateObject.getSeconds()
      : dateObject.getSeconds()
  }`;
};

const formatDate = (dateObject) => {
  let month, day, date;
  for (let i = 0, j = yearsOfTheMonth.length; i < j; i++) {
    if (i == dateObject.getMonth()) {
      month = yearsOfTheMonth[i];
    }
  }
  for (let i = 0, j = daysOfTheWeek.length; i < j; i++) {
    if (i == dateObject.getDay()) {
      day = daysOfTheWeek[i];
    }
  }

  if (dateObject.getDate() / 10 > 1 && dateObject.getDate() / 10 < 2) {
    date = dateObject.getDate() + 'th';
  } else {
    switch (dateObject.getDate() % 10) {
      case 1:
        date = dateObject.getDate() + 'st';
        break;
      case 2:
        date = dateObject.getDate() + 'nd';
        break;
      case 3:
        date = dateObject.getDate() + 'rd';
        break;

      default:
        date = dateObject.getDate() + 'th';
        break;
    }
  }

  return `${day}, ${date} ${month}, ${dateObject.getFullYear()}`;
};

const formatColorWTGB = (dateObject) => {
    let hour = dateObject.getHours();
    let color;
    let wtgb;
    if (hour >= 22 || hour < 5) {
        color = 'var(--color-acc-blue100)';
        wtgb = 'Peace, Serenity.'
    } else if (hour >= 5 && hour < 8) {
        color = 'var(--color-acc-green100)';
        wtgb = 'Calm.'
    } else if (hour >= 8 && hour < 17) {
        color = 'var(--color-acc-red100)';
        wtgb = 'Commitment, Focus.'
    } else if (hour >= 17 && hour < 22) {
        color = 'var(--color-acc-orange100)';
        wtgb = 'Remember, Serenity.'
    }

    return [color, wtgb]
} 

const formatPosition = (dateObject) => {
    let position = (dateObject.getHours() + (dateObject.getMinutes() / 60)) * 100
    return position;
} 

const updateView = () => {
    _ZONE_INDICATOR.style.backgroundColor = formatColorWTGB(new Date)[0]
    _TIME.innerHTML = formatTime(new Date);
    _DATE.innerHTML = formatDate(new Date);
    _WTGB.innerHTML = formatColorWTGB(new Date)[1]
    _INDICATOR_X.style.translate  = `${formatPosition(new Date)}px 0`
    _INDICATOR_Y.style.translate  = `0 ${formatPosition(new Date)}px`
}

updateView()

setInterval(() => {
    updateView()
}, 1000);