myApp.controller('EditCatchController', ['UserService', function(UserService) {
    console.log('EditCatchController created');
    var self = this;
    self.userService = UserService;
    self.userObject = UserService.userObject;
    self.items = UserService.items
  
    // // Service to edit the catch data
    // self.editCatch = function (data) {
    //   UserService.editCatch(data);
    //   self.newItem = UserService.newItem
    // }

    // self.editCatch = function (id) {
    //   self.onjectIndex = id;
    //   self.userObject = angular.copy(self.)
    // }
  }]);
  