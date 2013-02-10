AbuseReport = function (captchaId) {
    AbuseReport.initializeBase(this);
    this.captchaId = captchaId;
}
AbuseReport.prototype = {
    ValidateCaptchaNotEmpty: function (source, arguments) {
        var captchaTxt = $('input[type="text"][name$="' + this.captchaId + '"]');
        if (captchaTxt.val() == '')
            arguments.IsValid = false;
    }
}

AbuseReport.registerClass('AbuseReport', WSSCodeGuruBase);