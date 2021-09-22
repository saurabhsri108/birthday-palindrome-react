import { MONTH_DAYS, MONTH_DAYS_LEAP } from "./constants";

export const findIfPalindrome = (dob) => {
  const dateOfBirth = dob.split("-");
  const dateFormats = getDateFormats(dateOfBirth);
  const palindromeList = getPalindromeList(dateFormats);
  return palindromeList.length > 0;
};

export const findPrevPalindrome = (dob) => {
  const dateOfBirth = dob.split("-");
  let day = Number(dateOfBirth[2]);
  let month = Number(dateOfBirth[1]);
  let year = Number(dateOfBirth[0]);
  let result = [];
  let countPrevDays = 0;
  while (true) {
    const maxDays = getMaxDays(month, year);
    let dd = String(day);
    let mm = String(month);
    let yyyy = String(year);
    if (day < 10) dd = "0" + dd;
    if (month < 10) mm = "0" + mm;
    console.log({ day, month, year, maxDays });
    const dateOfBirth = `${yyyy}-${mm}-${dd}`;

    const isPalindrome = findIfPalindrome(dateOfBirth);
    if (isPalindrome) {
      result = [{ dd, mm, yyyy }, countPrevDays];
      break;
    } else {
      day -= 1;
      if (day < 1) {
        day = maxDays;
        month -= 1;
        if (month < 1) {
          month = 12;
          year -= 1;
        }
      }
      countPrevDays += 1;
    }
  }
  return result;
};

export const findNextPalindrome = (dob) => {
  const dateOfBirth = dob.split("-");
  let day = Number(dateOfBirth[2]);
  let month = Number(dateOfBirth[1]);
  let year = Number(dateOfBirth[0]);
  let result = [];
  let countNextDays = 0;
  while (true) {
    const maxDays = getMaxDays(month, year);
    let dd = String(day);
    let mm = String(month);
    let yyyy = String(year);
    if (day < 10) dd = "0" + dd;
    if (month < 10) mm = "0" + mm;

    const dateOfBirth = `${yyyy}-${mm}-${dd}`;

    const isPalindrome = findIfPalindrome(dateOfBirth);
    if (isPalindrome) {
      result = [{ dd, mm, yyyy }, countNextDays];
      break;
    } else {
      day += 1;
      if (day > maxDays) {
        day = 1;
        month += 1;
        if (month > 12) {
          month = 1;
          year += 1;
        }
      }
      countNextDays += 1;
    }
  }
  return result;
};

const reverseString = (str) => {
  return str.split("").reverse().join("");
};

const isPalindrome = (str) => {
  return str === reverseString(str);
};

const getDateFormats = (dateOfBirth) => {
  const [year, month, day] = dateOfBirth;
  const ddmmyyyy = day + month + year;
  const mmddyyyy = month + day + year;
  const yyyymmdd = year + month + day;
  return [ddmmyyyy, mmddyyyy, yyyymmdd];
};

const getPalindromeList = (dateFormats) => {
  const palindromes = [];
  for (const dob of dateFormats) {
    if (isPalindrome(dob)) palindromes.push(dob);
  }
  return palindromes;
};

const getMaxDays = (month, year) => {
  const maxDays = MONTH_DAYS[month - 1];
  if (isLeapYear(year)) {
    return MONTH_DAYS_LEAP[month - 1];
  }
  return maxDays;
};

const isLeapYear = (year) => {
  return year % 400 === 0
    ? true
    : year % 100 === 0
    ? false
    : year % 4 === 0
    ? true
    : false;
};

export const previousOutput = (prevDayCount, prevDate) => {
  return `The previous palindrome date was ${prevDayCount} ${
    prevDayCount === 1 ? "day" : "days"
  } ago on ${prevDate.dd}/${prevDate.mm}/${prevDate.yyyy}!`;
};

export const nextOutput = (nextDayCount, nextDate) => {
  return `The next palindrome date is ${nextDayCount} ${
    nextDayCount === 1 ? "day" : "days"
  } later on ${nextDate.dd}/${nextDate.mm}/${nextDate.yyyy}!`;
};

export const palindromeOutput = () => {
  return `Yay! Your birthday is palindrome!`;
};

export const noOutput = () => {
  return `Please select your birthday first`;
};
