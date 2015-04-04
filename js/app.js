var angular = angular || {};

var meJson = null;
var blogJson = null;
var contactJson = null;

(function(){
  var app = angular.module('MyApp', ['ngRoute', 'ngSanitize']);
  
  app.config(['$routeProvider',
    function($routeProvider) {
      $routeProvider
        .when('/whois', {
          templateUrl: 'partials/whois.html',
          controller: 'WhoisCtrl'
        })
        .when('/contact', {
          templateUrl: 'partials/contact.html',
          controller: 'ContactCtrl'
        })
        .otherwise({
          templateUrl: 'partials/home.html',
          controller: 'HomeCtrl'
        });
      }
  ]);
  
  /*
   * Controllers
   */
  
  app.controller('IndexCtrl', ['$scope', function($scope){
    $scope.title = 'Edu Ronqui\'s web app';
    $scope.year = new Date().getFullYear();
  }]);
  
  
  /**
   * Whois Controller
   */ 
  app.controller('WhoisCtrl', ['$scope', '$http', function($scope, $http){
    $scope.title = '\\Whois';
    $scope.me = meJson;
    
    // Startup behaviour
    if (!$scope.me){
      $http.get('res/ronqui.json').success(function(data){
        $scope.me = data;
        meJson = data;
      });
    }

  }]);
  
  /**
   * Contact Controller
   */ 
  app.controller('ContactCtrl', ['$scope', '$http', function($scope, $http){
    $scope.title = 'Contact Me';
    $scope.contact = contactJson;
    
    // Startup behaviour
    if (!$scope.contact){
      $http.get('res/contact.json').success(function(data){
        $scope.contact = data;
        contactJson = data;
      });
    }
    
  }]);
  
  /**
   * Home Controller
   */ 
  app.controller('HomeCtrl', ['$scope', '$http', function($scope, $http){
    $scope.title = 'Home';
    $scope.posts = blogJson;
    $scope.blogTitles = [];
    $scope.currentPost = null;
    
    var getPostTitles = function(data){
      $scope.blogTitles = Object.keys(data);
    };
    
    $scope.getPostContent = function (post) {
      $scope.currentPost = $scope.posts[post];
    };
    
    // Startup behaviour
    if (!$scope.posts){
      $http.get('res/blog-posts.json').success(function(data){
        $scope.posts = data;
        blogJson = data;
        
        // callback
        getPostTitles(data);
      });
    } else {
      getPostTitles($scope.posts);
    }
    
  }]);
  
})();