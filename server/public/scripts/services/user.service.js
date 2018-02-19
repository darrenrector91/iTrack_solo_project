myApp.service('UserService', ['$http', '$location', function ($http, $location) {
  // console.log('UserService Loaded');
  var self = this;
  self.userObject = {};
  self.items = {
    list: []
  };
  self.editCatchData = {
    item: {}
  };
  self.saveCatchEdit = {
    item: {}
  };

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

  // getting table data for user view table from events table in database
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
  }//end getting table data

  // Send item list to server to be authenticated before adding
  self.addItem = function (data) {
    console.log('service adding catch data');
    $http.post('/api/user/addItem', data)
      .then(function (response) {
        console.log('service has added catch');
        self.getCatch();
      })
      .catch(function (err) {
        console.log('error on post request - adding item');
      })
    self.getCatch();
  }//end add item

  //send table row data from user view to edit catch view form
  self.editCatch = function (items) {
    console.log('passed items', items);
    self.editCatchData.item = items.items;
  }//end edit catch

  //save catch edit in form and return to user view
  self.saveCatchEdit = function (eventid) {
    console.log('returned data from CatchEdit', eventid);
    $http.put(`/api/user/saveCatchEdit/${eventid}`)
    .then(function (response) {
      console.log('saveCatchEdit', response);
      // self.getCatch();
    })  
    .catch(function (error) {
      console.log('save catch edit', error);
    })  
  }//end catch edit in form

  //Delete item from table/database
  self.deleteItem = function(eventid) {
    console.log('deleteItem eventid ',eventid);
    $http.delete(`/api/user/deleteItem/${eventid}`)
      .then(function (response) {
        self.getCatch();
      })
  }//end delete table/database row
}]);