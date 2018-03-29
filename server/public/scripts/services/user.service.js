myApp.service('UserService', ['$http', '$location', '$mdDialog', function ($http, $location, $mdDialog) {
  // console.log('UserService Loaded');
  var self = this;
  var fsClient = filestack.init('ANrUiCs67RpGoTbV2Wtg4z');

  self.userObject = {};
  self.items = {list: []};
  self.editCatchData = {item: {}};
  self.saveCatchEdit = {item: {}};
  self.image = {list: []};
  self.results = {list: []};
  self.map = {list:[]};

  self.imageModal = function (items, ev) {
    $mdDialog.show({
      controller: ImageModalController,
      controllerAs: 'vm',
      templateUrl: '../views/templates/image-modal.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      mapURL: '',
      clickOutsideToClose: true,
      resolve: {
        item: function () {
          return items;
        }
      }
    })
    console.log(templateUrl);
  }

  function ImageModalController($mdDialog, item, UserService) {
    const self = this;
    self.items = item;
    console.log(self.items);
    
    self.closeModal = function () {
      self.hide();
    }
  }

  self.mapLocation = function (items, ev) {
    console.log('service showing lake', items.body_of_water);
    const API = 'AIzaSyBm4aUk3dBt6BGPOdW3eqCB6njJPTH-f6s';
    let water = items.body_of_water;
    console.log('water', water);
    $mdDialog.show({
      controller: MapModalController,
      controllerAs: 'vm',
      templateUrl: '../views/templates/map-modal.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose: true,
      template: 'ng-src=https://www.google.com/maps/embed/v1/place?key=AIzaSyBm4aUk3dBt6BGPOdW3eqCB6njJPTH-f6s&q=Chicago',
      resolve: {
        item: function () {
          return items;
        }
      }
    })
  }

  function MapModalController($mdDialog, item, UserService) {
    const self = this;
    self.map = item;
    console.log(item.body_of_water);
    self.closeModal = function () {
      self.hide();
    }
  }

  self.openPicker = function openPicker(image) {
    fsClient.pick({
      fromSources: [
        "local_file_system",
        "url",
        "imagesearch",
        "facebook",
        "instagram",
        "googledrive",
        "dropbox"
      ],
      accept: ["image/*"],
      maxFiles: 1,
      minFiles: 0,
      transformations: {
        crop: true,
        circle: true,
        rotate: true
      }
    }).then(function (response) {
      self.image.list = response.filesUploaded;
      console.log('response from filestack', self.image.list);
      self.getImageURL(self.image.list);
    });
  }

  self.getImageURL = function (response) {
    // loop to get filestack image url 
    for (let i = 0; i < response.length; i++) {
      imageURL = response[i].url;
    }
    // console.log('image URL:', imageURL);
    self.image.list = imageURL;
    // console.log(self.image.list);
  }

  // Send item list to server
  self.addItem = function (data) {
    // console.log('in addItem:', self.image.list);
    data.image_url = self.image.list;

    // console.log('service adding catch data', data);
    return $http.post('/api/user/addItem', data)
      .then(function (response) {
        swal("Form data and image were successfully added to the table!")
        console.log(data);
        self.getCatch();
      })
      .catch(function (err) {
        // console.log('error on post request - adding item');
      })
  } //end add item

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
          // console.log('UserService -- getuser -- failure');
          // user has no session, bounce them back to the login page
          $location.path("/home");
        }
      }, function (response) {
        // console.log('UserService -- getuser -- failure: ', response);
        $location.path("/home");
      });
    },
    self.logout = function () {
      // console.log('UserService -- logout');
      swal({
          text: "Do you want to log out?",
          icon: "warning",
          buttons: ['No', 'Yes'],
          dangerMode: true
        })
        .then((loggingOut) => {
          if (loggingOut) {
            return $http.get('/api/user/logout')
              .then(function (response) {
                swal("User was logged out!")
                self.getuser();
                $location.path("/home");
              })
          } else {
            swal({
              text: "User will remain logged in!",
              icon: "info"
            })
          }
        });
    }

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
              // console.log('deleteItem error', error);
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


  // getting table data for user view table from events table in database
  self.getCatch = function () {
    return $http.get('/api/user/events')
      .then(function (response) {
        // console.log(response);
        self.items.list = response.data;
      })
      .catch(function (response) {
        // console.log('error on get request');
      });
  } //end getting table data



  //send table row data from user view to edit catch view form
  self.editCatch = function (items) {
    // console.log('passed items', items);
    self.editCatchData.item = items.items;
  } //end edit catch

  //save catch edit in form and return to user view
  self.saveCatchEdit = function (data) {
    // console.log('returned data from CatchEdit: ', data.item.body_of_water);
    return $http.put('/api/user/saveCatchEdit', data)
      .then(function (response) {
        self.saveCatchEdit.item = response.data;
        // console.log('response.data: ', response);
        // console.log(data);

      })
      .catch(function (error) {
        // console.log('save catch edit', error);
      })
  } //end catch edit in form

  //save catch edit in form and return to user view
  self.saveUserInfo = function (data) {
    // console.log('returned data from updating user: ', self.userObject.first_name);
    return $http.put('/api/user/saveUserInfo', data)
      .then(function (response) {
        self.saveUserInfo.item = response.data;
        self.getuser();
        // console.log('response.data: ', response.data);
      })
      .catch(function (error) {
        // console.log('error in save user info: ', error);
      })

  } //end catch edit in form


}]);