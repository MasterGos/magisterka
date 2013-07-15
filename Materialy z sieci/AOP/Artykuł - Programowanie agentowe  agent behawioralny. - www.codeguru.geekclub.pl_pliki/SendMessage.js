function Pages_Profile_SendMessage(tbUserLoginId, loggedUserLogin) {
    Pages_Profile_SendMessage.initializeBase(this);
    
    this.tbUserLogin = $("#" + tbUserLoginId);
    this.loggedUserLogin = loggedUserLogin;
    
    this.Initialize();
}
Pages_Profile_SendMessage.prototype = {

    Initialize: function () {
        that_Pages_Profile_SendMessage = this;

    },
    cvUserCantSendToYourself_Validate: function (s, e) {
        var l = that_Pages_Profile_SendMessage.tbUserLogin.val();
        var ll = $.trim(l);
        var lll = ll.toLowerCase();
        if (lll == that_Pages_Profile_SendMessage.loggedUserLogin.toLowerCase()) {
            e.IsValid = false;
        } else {
            e.IsValid = true;
        }
    }

}

Pages_Profile_SendMessage.registerClass('Pages_Profile_SendMessage', WSSCodeGuruBase);