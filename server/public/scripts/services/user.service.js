myApp.service('UserService', ['$http', '$location', function($http, $location){
  console.log('UserService Loaded');
  var self = this;
  self.userObject = {};

  self.getuser = function(){
    console.log('UserService -- getuser');
    $http.get('/api/user').then(function(response) {
        if(response.data.username) {
            // user has a current session on the server
            self.userObject.userName = response.data.username;
            console.log('UserService -- getuser -- User Data: ', self.userObject.userName);
        } else {
            console.log('UserService -- getuser -- failure');
            // user has no session, bounce them back to the login page
            $location.path("/home");
        }
    },function(response){
      console.log('UserService -- getuser -- failure: ', response);
      $location.path("/home");
    });
  },

  self.logout = function() {
    console.log('UserService -- logout');
    $http.get('/api/user/logout').then(function(response) {
      console.log('UserService -- logout -- logged out');
      $location.path("/home");
    });
  }

  self.getItems = function () {
    $http.get('/api/data')
      .then(function (response) {
        self.items.list = response.data
      },
    function(response) {
    });
  }
  self.getItems();

  // Send item list to server to be authenticated before adding
  self.addItem = function (data) {
    $http.post('/api/data/addItem', data)
      .then(function(response) {
        // PUT GET REQUEST HERE TO REFRESH THE LIST
        self.getItems();
        self.newItem = ''
        alert('Item has been added!')
      })
      .catch(function(err) {
        self.message = "Something went wrong. Please try again."; 
      })
  }

  //Delete item from table
  self.removeItem = function (id) {
    $http.delete(`/api/data/removeItem/${id}`)
    .then(function (response) {
        self.getItems();  
    })
    .catch(function (response) {
    })
}

}]);
