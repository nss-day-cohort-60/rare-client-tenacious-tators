/*
This function exports a function named "HumanDate" that is a react component that takes a single prop, "date", which is expected to be a string in the format "YYYY-MM-DD" (for example, "2022-07-12")
*/
export const HumanDate = ({ date }) => {
  /*
  the "new Date()" function is used to create a new Date object from the modified date string.

  The function first uses the "replace" method to replace all instances of "-" with "/" in the input date string.

  This is done because the "new Date()" function expects the date input to be in the format "MM/DD/YYYY" if given as a string.

  Then it uses the "toLocaleDateString" method to format the date object as a string using the options provided in the second argument. The options specify that the string should include the long form of the weekday, the full year, the long form of the month, the day of the month and the time zone America/Chicago.

  the functions returns the formatted date string
   */
  return new Date(date.replace(/-/g, "/")).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "America/Chicago",
  });
};


