'use strict';

// describe('Controller: MainCtrl', function () {

//   // load the controller's module
//   beforeEach(module('passwordsafeApp'));

//   var MainCtrl,
//     scope;

//   // Initialize the controller and a mock scope
//   beforeEach(inject(function ($controller, $rootScope) {
//     scope = $rootScope.$new();
//     MainCtrl = $controller('MainCtrl', {
//       $scope: scope
//     });
//   }));

//   it('should attach a list of awesomeThings to the scope', function () {
//     expect(scope.awesomeThings.length).toBe(4);
//   });
// });
describe('Controller: API', function() {

    it('should respond with PasswordSafe API is running!', function(){
        spyOn($, "ajax");
        expect(getBase()).toEqual("PasswordSafe API is running!");
    });

    function getBase(){
        $.ajax({
            type: "GET",
            url: "/api",
        });
    }
});
