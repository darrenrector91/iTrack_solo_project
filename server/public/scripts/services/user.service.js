myApp.service('UserService', ['$http', '$location', function ($http, $location) {
  // console.log('UserService Loaded');
  var self = this;
  var fsClient = filestack.init('ANrUiCs67RpGoTbV2Wtg4z');

  self.userObject = {};
  self.items = {list:[]};
  self.editCatchData = {item:{}};
  self.saveCatchEdit = {item:{}};

  function openPicker() {
    fsClient.pick({
      fromSources: ["local_file_system"],
      accept: ["image/*"],
      maxFiles: 1,
      minFiles: 0,
      transformations: {
        crop: true
      }
    }).then(function (response) {
      // declare this function to handle response
      handleFilestack(response);
    });
  }

  self.getuser = function () {
      // console.log('UserService -- getuser');
      return $http.get('/api/user').then(function (response) {
        if (response.data.username) {
          // user has a current session on the server
          self.userObject.username = response.data.username;
          self.userObject.first_name = response.data.first_name;
          self.userObject.last_name = response.data.last_name;
          self.userObject.city = response.data.city;
          self.userObject.state = response.data.state;
          self.getCatch();
          // console.log(self.userObject);
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
    return $http.get('/api/user/events')
      .then(function (response) {
        self.items.list = response.data;
      })
      .catch(function (response) {
        console.log('error on get request');
      });
    //return promises*****************
  } //end getting table data

  // Send item list to server to be authenticated before adding
  self.addItem = function (data) {
    // console.log('service adding catch data', data);
    return $http.post('/api/user/addItem', data)
      .then(function (response) {
        // console.log('service has added catch');
        self.getCatch();
      })
      .catch(function (err) {
        // console.log('error on post request - adding item');
      })
    self.getCatch();
  } //end add item

  //send table row data from user view to edit catch view form
  self.editCatch = function (items) {
    // console.log('passed items', items);
    self.editCatchData.item = items.items;
  } //end edit catch

  //save catch edit in form and return to user view
  self.saveCatchEdit = function (data) {
    console.log('returned data from CatchEdit: ', data.item.body_of_water);
    return $http.put('/api/user/saveCatchEdit', data)
      .then(function (response) {
        self.saveCatchEdit.item = response.data;
        console.log('response.data: ', response.data);
      })
      .catch(function (error) {
        console.log('save catch edit', error);
      })
  } //end catch edit in form

  //save catch edit in form and return to user view
  self.saveUserInfo = function (data) {
    console.log('returned data from updating user: ', self.userObject.first_name);
    return $http.put('/api/user/saveUserInfo', data)
      .then(function (response) {
        self.saveUserInfo.item = response.data;
        console.log('response.data: ', response.data);
      })
      .catch(function (error) {
        console.log('error in save user info: ', error);
      })
  } //end catch edit in form

  //Delete item from table/database
  self.deleteItem = function (eventid) {
    swal({
        text: "Are you sure you want to delete this Catch Data?",
        icon: "warning",
        buttons: ['No', 'Yes'],
        dangerMode: true
      })
      .then((deleting) => {
        if (deleting) {
          return $http.delete(`/api/user/deleteItem/${eventid}`).then(function (response) {
              swal("Catch data was deleted!")
              self.getCatch();
            })
            .catch(function (error) {
              console.log('deleteItem error', error);
            })
        } else {
          swal({
            text: "No problem!  The data is safe!!",
            icon: "info",
            timer: 2000
          })
        }
      });
  }
}]);