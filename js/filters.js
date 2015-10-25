var app = angular.module('app');

app.filter('fixlength', function() {
  return function(n, len) {
    var num = parseInt(n, 10);
    len = parseInt(len, 10);
    if (isNaN(num) || isNaN(len)) {
      return n;
    }
    num = '' + num;
    while (num.length < len) {
      num = '0' + num;
    }
    return num;
  };
});

app.filter('fixTime', function() {
  return function(millseconds) {
    var seconds = Math.floor(millseconds / 1000);
    var days = Math.floor(seconds / 86400);
    var hours = Math.floor((seconds % 86400) / 3600);
    var minutes = Math.floor(((seconds % 86400) % 3600) / 60);
    var timeString = '';
    if (days > 0) timeString += (days > 1) ? (days + " days ") : (days + " day ");
    if (hours > 0) timeString += (hours > 1) ? (hours + " hours ") : (hours + " hour ");
    if (minutes >= 0) timeString += (minutes > 1) || (minutes == 0) ? (minutes + " minutes ") : (minutes + " minute ");
    if (timeString == '') timeString = '?';
    return timeString;
  }
});
