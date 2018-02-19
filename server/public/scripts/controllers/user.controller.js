myApp.controller('UserController', ['UserService', function (UserService) {
  // console.log('UserController created');
  var self = this;
  self.userService = UserService;
  self.userObject = UserService.userObject;
  self.items = UserService.items;
  self.editCatch = UserService.editCatch;
  self.deleteItem = UserService.deleteItem;


  // Service to add item
  self.newItem = UserService.newItem;
  self.addItem = function (data) {
    UserService.addItem(data);
  }
  // Service to delete item
  self.deleteItem = function (deleteRow) {
    UserService.deleteItem(deleteRow);
  }

  self.removeFavorite = function(toDelete) {
    MangaService.removeFavorite(toDelete)
}
}]);