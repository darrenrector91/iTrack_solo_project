myApp.controller('EditCatchController', ['UserService', function (UserService) {
  console.log('EditCatchController created');
  var self = this;
  self.userService = UserService;
  self.userObject = UserService.userObject;
  self.items = UserService.items;
  self.editCatchData = UserService.editCatchData;

  // Service to edit the catch
  self.editCatch = function (items) {
    self.UserServices.editCatchData = items.items;
  }
}]);