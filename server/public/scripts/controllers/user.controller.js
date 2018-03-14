myApp.controller('UserController', ['UserService', function (UserService) {
  // console.log('UserController created');
  var self = this;
  self.userService = UserService;
  self.userObject = UserService.userObject;
  self.items = UserService.items;
  self.editCatchData = UserService.editCatchData;
  self.editCatch = UserService.editCatch;
  self.saveCatchEdit = UserService.saveCatchEdit;
  self.saveUserInfo = UserService.saveUserInfo;

  // Service to add item
  self.newItem = UserService.newItem;
  self.addItem = function (data) {
    UserService.addItem(data);
    self.newItem = '';
  };
  // Service to delete item
  self.deleteItem = function (eventid) {
    UserService.deleteItem(eventid);
  };

  // save edited catch data
  self.saveCatchEdit = function (data) {
    UserService.saveCatchEdit(data);
  };

  // saving user data 
  self.saveUserInfo = function (data) {
    UserService.saveUserInfo(data);
  };

  // uploading files using filestack
  self.openPicker = function (image) {
    UserService.openPicker(image);
  };

  // finding body of water on map
  self.mapLocation = function (items) {
    UserService.mapLocation(items)
    console.log('from controller ', items);
    console.log('location from controller' , items.event_city, items.event_state);
    
    
  };
}]);