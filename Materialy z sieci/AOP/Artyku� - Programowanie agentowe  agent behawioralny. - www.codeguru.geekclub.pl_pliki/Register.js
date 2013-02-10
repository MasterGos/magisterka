Register = function (cbAcceptBylawId, cbAcceptPersonalDataId, tbLoginId, btnRegisterId, lblUserExistsErrorMessageId, hdnValidUserLoginExistsId) {
    Register.initializeBase(this);
    this.cbAcceptBylaw = "#" + cbAcceptBylawId;
    this.cbAcceptPersonalData = "#" + cbAcceptPersonalDataId;
    this.lblUserExistsErrorMessage = "#" + lblUserExistsErrorMessageId;
    this.tbLogin = "#" + tbLoginId;
    this.btnRegister = "#" + btnRegisterId;
    this.hdnValidUserLoginExists = "#" + hdnValidUserLoginExistsId;

    var that = this;


    this.ChechUserExist = function () {
        var login = $(that.tbLogin).val();
        if (login == '') {
            $(that.lblUserExistsErrorMessage).hide();
        }
        else {
            WSSCodeGuru.Services.UserService.IsUserExist(login, function (result) {
                if (result) {
                    $(that.lblUserExistsErrorMessage).show();
                    $(that.hdnValidUserLoginExists).val(false);
                }
                else {
                    $(that.lblUserExistsErrorMessage).hide();
                    $(that.hdnValidUserLoginExists).val(true);
                }
            }, function (errorInfo) { })
        };
    };

    $(this.tbLogin).change(that.ChechUserExist);
    that.ChechUserExist();



}
Register.prototype = {
    AcceptBylaw: function (source, arguments) {
        if ($(this.cbAcceptBylaw).attr("checked") != true)
            arguments.IsValid = false;
    },

    AcceptData: function (source, arguments) {
        if ($(this.cbAcceptPersonalData).attr("checked") != true)
            arguments.IsValid = false;
    },
    UserExistsValidate: function (source, arguments) {
        var isValid = $(this.hdnValidUserLoginExists).val()  == 'true';
        arguments.IsValid = isValid;
        var sds = isValid;
    }
}

Register.registerClass('Register');