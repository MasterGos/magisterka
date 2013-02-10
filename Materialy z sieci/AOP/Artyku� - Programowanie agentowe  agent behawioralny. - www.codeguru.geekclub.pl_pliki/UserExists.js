UserExists = function (txtUserLoginID, hlUserCheckID, lResultTrueID, lResultFalseID) {
    UserExists.initializeBase(this);
    var that = this;

    this.txtUserLogin = $("#" + txtUserLoginID);
    this.hlUserCheck = $("#" + hlUserCheckID);
    this.lResultTrue = $("#" + lResultTrueID);
    this.lResultFalse = $("#" + lResultFalseID);

    this.lResultTrue.hide();
    this.lResultFalse.hide();


    var checkUserExist = function () {

        var login = that.txtUserLogin.val();
        if (login == '') {
            that.lResultTrue.hide();
            that.lResultFalse.show();
        } else {
            WSSCodeGuru.Services.UserService.IsUserExist(login, function (result) {
                if (result) {
                    that.lResultTrue.show();
                    that.lResultFalse.hide();
                } else {
                    that.lResultTrue.hide();
                    that.lResultFalse.show();
                }
            }, function (errorInfo) {
            });
        }
        return false;
    };


    this.hlUserCheck.click(checkUserExist);
    
};
UserExists.prototype = {  
   
};

UserExists.registerClass('UserExists', WSSCodeGuruBase);