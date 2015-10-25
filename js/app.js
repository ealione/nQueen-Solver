(function() {

  var app = angular.module('app', ['ngMaterial', 'ngMdIcons', 'ngMessages', 'sticky']);

  app.config(["$mdIconProvider", "$mdThemingProvider", function($mdIconProvider, $mdThemingProvider) {
    $mdIconProvider
      .iconSet('communication', 'img/icons/sets/communication-icons.svg', 24)
      .iconSet("social", 'img/icons/sets/social-icons.svg', 24);

    var customOrange = $mdThemingProvider.extendPalette('deep-orange', {
      'contrastDefaultColor': 'dark',
      'contrastLightColors': ['300', '400', '500', '600', '700', '800', '900', 'A100', 'A200']
    });
    $mdThemingProvider.definePalette('customOrange', customOrange);

    $mdThemingProvider.theme('default')
      .primaryPalette('light-blue')
      .accentPalette('customOrange');
  }]);

}());
