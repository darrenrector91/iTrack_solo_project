myApp.service('UserService', ['$http', '$location', function ($http, $location) {
  console.log('UserService Loaded');
  var self = this;
  self.userObject = {};
  self.items = {
    list: []
  };

  self.getuser = function () {
      console.log('UserService -- getuser');
      $http.get('/api/user').then(function (response) {
        if (response.data.username) {
          // user has a current session on the server
          self.userObject.userName = response.data.username;
          console.log('UserService -- getuser -- User Data: ', response.data.username);
        } else {
          console.log('UserService -- getuser -- failure');
          // user has no session, bounce them back to the login page
          $location.path("/home");
        }
      }, function (response) {
        console.log('UserService -- getuser -- failure: ', response);
        $location.path("/home");
      });
    },

    self.logout = function () {
      console.log('UserService -- logout');
      $http.get('/api/user/logout').then(function (response) {
        console.log('UserService logged out');
        $location.path("/home");
      });
    }

  self.getCatch = function () {
    console.log('service getting catch data');
    $http.get('/api/user/events')
      .then(function (response) {
        console.log('service has catch data');
        console.log(response);
        self.item.list = response.data.data;
      })
      .catch(function (response) {
        console.log('error on get request');
      });
  }
  self.getCatch();


  // Send item list to server to be authenticated before adding
  self.addItem = function (data) {
    console.log('service adding catch data');
    $http.post('/api/user/events', data)
      .then(function (response) {
        console.log('service has added catch');
        self.getItems();
        self.newItem = '';
        alert('Item has been added!')
      })
      .catch(function (err) {
        console.log('error on post request - adding item');
      })
  }

  //Delete item from table
  self.removeItem = function (id) {
    $http.delete(`/api/data/removeItem/${id}`)
      .then(function (response) {
        self.getItems();
      })
      .catch(function (response) {})
  }

}]);