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
