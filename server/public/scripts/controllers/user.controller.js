myApp.controller('UserController', ['UserService', function (UserService) {
  // console.log('UserController created');
  var self = this;
  self.userService = UserService;
  self.userObject = UserService.userObject;
  self.items = UserService.items

  // Service to add item
  self.newItem = UserService.newItem;
  self.addItem = function (data) {
    UserService.addItem(data);
  }
  // Service to delete item
  self.editCatch = function (id) {
    UserService.editCatch(id);
  }
  // Service to delete item
  self.deleteItem = function (id) {
    UserService.deleteItem(id);
  }
}]);