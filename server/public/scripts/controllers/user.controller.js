myApp.controller('UserController', ['UserService', function (UserService) {
  // console.log('UserController created');
  var self = this;
  self.userService = UserService;
  self.userObject = UserService.userObject;
  self.items = UserService.items;
  self.editCatchData = UserService.editCatchData;
  self.editCatch = UserService.editCatch;

  // Service to add item
  self.newItem = UserService.newItem;
  self.addItem = function (data) {
    UserService.addItem(data);
  }
  // Service to delete item
  self.deleteItem = function (eventid) {
    UserService.deleteItem(eventid);
  }

  self.updateItem = function(id, items) {
    UserService.updateItem(id, items);
  }

  
}]);