(function() {

  var app = angular.module('app');

  var MainController = function($scope, $rootScope, queenService, $timeout, $mdDialog) {

    $scope.updateBoard = function(sol) {
      $board = ChessBoard('solutionBoard', $scope.toFenString(sol));
    };

    $scope.updateStatistics = function() {
      $scope.totalPositions = Math.pow($scope.queens, 2);
      $scope.totalPlaces = Math.pow($scope.totalPositions, $scope.queens);
      $scope.thisStat = $scope.readByValue($scope.queens);
    };

    $scope.readByValue = function(value) {

      var result = $scope.knownSolutions.filter(function(o) {
        return o.n == value;
      });

      return result ? result[0] : null;
    }

    $scope.toFenString = function(inArray) {

      //console.log("About to convert ", inArray, " to a FEN string.");

      var tempArray = inArray.slice();
      var result = '';
      for (var i = 0; i < tempArray.length; i++) {
        tempArray[i] = (tempArray[i] - 1) > 0 ? (tempArray[i] - 1) : '';
        tempArray[i] = tempArray[i] + "q/";
        result = result + tempArray[i];
      }

      var tempLength = result.replace(/[^/]/g, "").length

      for (var i = tempLength; i < 8; i++) {
        result = result + "8/";
      }

      //console.log("Converted it into ", result);
      return result.substring(0, result.length - 1);;
    };

    $scope.queens1 = function(number) {

      $scope.isLoading = true;

      // Variables.
      $rootScope.counter = 0;
      $rootScope.totalTests = 0;
      $rootScope.currentSolution = [];
      $rootScope.solutions = [];

      //console.log("Solving for [", number, "] queens");

      var board = Array.apply(null, Array(number)).map(Number.prototype.valueOf, 0);
      //Array(number + 1).join('0').split('').map(parseFloat)
      //console.log("Initial vector created with: ", board);

      //console.log("Starting...");

      var start = new Date().getTime();
      $timeout(function() {
        queenService.propagate(1, board);
        $scope.isLoading = false;
      }, 0);

      var end = new Date().getTime();
      $scope.runtime = end - start;
    };

    $scope.myExerciseBoard = function(ev, index, solution) {
      $mdDialog.show({
        controller: function($scope) {
          $scope.nowSolvingIndex = index;
          $scope.nowSolvingSolution = solution;          
        },
        templateUrl: 'templates/mySolutionBoard.tpl.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose: true
      })
    };

    // Variables.
    $scope.queens = 8;
    $scope.isLoading = false;

    // Statistics.
    $scope.totalPositions = Math.pow($scope.queens, 2);
    $scope.totalPlaces = Math.pow($scope.totalPositions, $scope.queens);
    $scope.knownSolutions = queenService.knownSolutions;
    $scope.thisStat = $scope.readByValue($scope.queens);

  };

  var MenuController = function($scope, $mdDialog) {

    $scope.menuItems = [{
      label: "About",
      link: "",
      icon: "whatshot"
    }, {
      label: "Whoami",
      link: "",
      icon: "insert_emoticon"
    }, {
      label: "Fork this",
      link: "",
      icon: "github-box"
    }];

    $scope.announceClick = function(index) {
      $mdDialog.show(
        $mdDialog.alert()
        .title('You clicked!')
        .content('You clicked the menu item ' + index)
        .ok('Nice')
      );
    };

  };

  app.controller('MainController', ["$scope", "$rootScope", "queenService", "$timeout", "$mdDialog", MainController]);
  app.controller('MenuController', ["$scope", "$mdDialog", "queenService", MenuController]);
}());

//http://gregtrowbridge.com/a-bitwise-solution-to-the-n-queens-problem-in-javascript/
//http://liujoycec.github.io/
//http://jsfiddle.net/g/Bs66R/1/
