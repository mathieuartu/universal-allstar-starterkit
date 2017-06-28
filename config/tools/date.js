module.exports = {
  getNextMonth: function(monthCode){
    var months = {
      0: "jan",
      1: "feb",
      2: "mar",
      3: "apr",
      4: "may",
      5: "jun",
      6: "jul",
      7: "aug",
      8: "sep",
      9: "oct",
      10: "nov",
      11: "dec"
    };

    var queriedMonth = new Date(monthCode),
      queriedMonthNb = queriedMonth.getMonth(),
      queriedYearNb = queriedMonth.getFullYear(),
      nextMonth = queriedMonthNb+1;

    if(nextMonth == 12){
      nextMonth = 0;
      queriedYearNb+=1;
    }

    return {
      month: queriedMonth,
      nextMonth: new Date(months[nextMonth]+queriedYearNb)
    }
  }
};
