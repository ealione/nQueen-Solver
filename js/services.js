var app = angular.module('app');

app.service('queenService', ["$rootScope", function($rootScope) {

  this.checkSolution = function(board) {

    //console.log("Checking if solution ", board, " is valid.");

    for (var i = 0; i < board.length; i++) {
      for (var j = i + 1; j < board.length; j++) {
        if (Math.abs(board[i] - board[j]) == Math.abs(i - j)) {
          return false;
        };
      };
    };

    //console.log("Solution valid...");
    return true;
  };

  this.propagate = function(depth, board) {

    //console.log("Current state >> depth:", depth, " board: ", board, " counter: ", $scope.counter);

    $rootScope.currentSolution = board.slice();

    $rootScope.totalTests = $rootScope.totalTests + 1

    var validSolution = this.checkSolution(board);
    if ((depth == board.length + 1) && (validSolution)) {
      $rootScope.counter = $rootScope.counter + 1;

      $rootScope.solutions.push($rootScope.currentSolution);

      //console.log("Found solution [", $rootScope.counter, "] ", $rootScope.currentSolution);
    };

    if (depth <= board.length) {
      for (var i = 1; i <= board.length; i++) {
        if (!(board.indexOf(i) > -1)) {
          var prev = board[depth - 1];
          board[depth - 1] = i;
          this.propagate(depth + 1, board);
          board[depth - 1] = prev;
        };
      };
    };

  };

  this.knownSolutions = [{
    n: '1',
    fundamental: '1',
    all: '1',
    time: '0'
  }, {
    n: '2',
    fundamental: '0',
    all: '0',
    time: '0'
  }, {
    n: '3',
    fundamental: '0',
    all: '0',
    time: '0'
  }, {
    n: '4',
    fundamental: '1',
    all: '2',
    time: '1'
  }, {
    n: '5',
    fundamental: '2',
    all: '10',
    time: '1'
  }, {
    n: '6',
    fundamental: '1',
    all: '4',
    time: '1'
  }, {
    n: '7',
    fundamental: '6',
    all: '40',
    time: '1'
  }, {
    n: '8',
    fundamental: '12',
    all: '92',
    time: '1'
  }, {
    n: '9',
    fundamental: '46',
    all: '352',
    time: '1'
  }, {
    n: '10',
    fundamental: '92',
    all: '724',
    time: '1'
  }, {
    n: '11',
    fundamental: '341',
    all: '2680',
    time: '2'
  }, {
    n: '12',
    fundamental: '1787',
    all: '14200',
    time: '9'
  }, {
    n: '13',
    fundamental: '9233',
    all: '73712',
    time: '50'
  }, {
    n: '14',
    fundamental: '45752',
    all: '365596',
    time: '250'
  }, {
    n: '15',
    fundamental: '285053',
    all: '2279184',
    time: '1600'
  }, {
    n: '16',
    fundamental: '1846955',
    all: '14772512',
    time: '10500'
  }, {
    n: '17',
    fundamental: '11977939',
    all: '95815104',
    time: '160000'
  }, {
    n: '18',
    fundamental: '83263591',
    all: '666090624',
    time: '1200000'
  }, {
    n: '19',
    fundamental: '621012754',
    all: '4968057848',
    time: '5500000'
  }, {
    n: '20',
    fundamental: '4878666808',
    all: '39029188884',
    time: '73860000'
  }, {
    n: '21',
    fundamental: '39333324973',
    all: '314666222712',
    time: '630000000'
  }, {
    n: '22',
    fundamental: '336376244042',
    all: '2691008701644',
    time: '?'
  }, {
    n: '23',
    fundamental: '3029242658210',
    all: '24233937684440',
    time: '?'
  }, {
    n: '24',
    fundamental: '28439272956934',
    all: '227514171973736',
    time: '?'
  }, {
    n: '25',
    fundamental: '275986683743434',
    all: '2207893435808352',
    time: '?'
  }, {
    n: '26',
    fundamental: '2789712466510289 ',
    all: '22317699616364044',
    time: '?'
  }];
}]);
