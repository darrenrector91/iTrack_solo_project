myApp.controller('EditCatchController', ['UserService', function (UserService) {
  console.log('EditCatchController created');
  var self = this;
  self.userService = UserService;
  self.userObject = UserService.userObject;
  self.items = UserService.items

  // Service to edit the catch data
  // self.editCatch = function (editCatch) {
  //   UserService.editCatch(editCatch);
  // }
}]);