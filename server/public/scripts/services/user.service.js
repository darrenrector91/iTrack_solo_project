myApp.service('UserService', ['$http', '$location', function ($http, $location) {
  // console.log('UserService Loaded');
  var self = this;
  self.userObject = {};
  self.items = {list:[]};
  self.editCatchData = {item:{}};
  self.updateItem = {catchItem:{}};

  self.getuser = function () {
      // console.log('UserService -- getuser');
      $http.get('/api/user').then(function (response) {
        if (response.data.username) {
          // user has a current session on the server
          self.userObject.userName = response.data.username;
          self.userObject.first_name = response.data.first_name;
          self.userObject.last_name = response.data.last_name;
          self.userObject.city = response.data.city;
          self.userObject.state = response.data.state;
          self.getCatch();
          // console.log('UserService -- getuser -- User Data: ', response.data.id);
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
    // console.log('service getting catch data');
    $http.get('/api/user/events')
      .then(function (response) {
        // console.log('service has catch data');
        // console.log(response);
        self.items.list = response.data;
        console.log('response.data', response.data);
        // console.log(self.items.list);
        
      })
      .catch(function (response) {
        console.log('error on get request');
      });
  }

  // Send item list to server to be authenticated before adding
  self.addItem = function (data) {
    console.log('service adding catch data');
    $http.post('/api/user/addItem', data)
      .then(function (response) {
        swal("Good job!", "You added catch data!", "success");
        console.log('service has added catch');
        self.getCatch();
      })
      .catch(function (err) {
        console.log('error on post request - adding item');
      })
    self.getCatch();

  }

  self.editCatch = function (items) {
    console.log('passed items', items);
    self.editCatchData.item = items.items;
  }

  //Delete item from table
  self.deleteItem = function (eventid) {
    console.log('deleted row');
    $http.delete(`/api/user/deleteItem/${eventid}`)
      .then(function (response) {
        self.getCatch();
      })
      .catch(function (response) {})
  }

  self.updateItem = function(items) {
    console.log('updated catch item: ', items);
    self.updateItem.catchItem = items.items;
    $http.put('/updateItem/', items)
        .then(function (response) {
            self.getGames();
        })
        .catch(function (response) {
            console.log('error on put updated catch item', response);
        });
};

  // self.editTaskObject.duedate = $filter('date')(self.editTaskObject.duedate, "MM-dd-yyyy");
  // self.editTaskObject.duedate = new Date(self.editTaskObject.duedate);
}]);