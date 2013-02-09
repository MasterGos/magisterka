ProfileSettings = function (  tbEmailId, tbEmailRepeatId, buttonChangeEmailId, divEmailRepeatId) {
    ProfileSettings.initializeBase(this);
   
    

   
    
    this._tbEmail = $("#" + tbEmailId);
    this._tbEmailRepeat = $("#" + tbEmailRepeatId);
    this._buttonChangeEmail = $("#" + buttonChangeEmailId);
    this._divEmailRepeat= $("#" + divEmailRepeatId);

    this.Initialize();
}
ProfileSettings.prototype = {
  
    Initialize: function () {
        that = this;
        $(document).ready(function () {
            
            that._divEmailRepeat.hide();
            that._buttonChangeEmail.click(that.buttonChangeEmailClicked);
        });
    },
   

 
    buttonChangeEmailClicked: function () {
        if (that._divEmailRepeat.css("display") == "none") {
            //jesli div jest niewidoczny to pokazac
            that._divEmailRepeat.show();
            that._tbEmail.removeAttr("disabled");
            that._buttonChangeEmail.hide();
        }
        return false;
    },
    ValidateEmailRepeat: function (s, e) {
        if (that._tbEmail.attr("disabled")) {
            e.IsValid = true;
        }
        else {
            var emailValue = that._tbEmail.val();
            var emailRepeatValue = that._tbEmailRepeat.val();
            if (emailRepeatValue == emailValue) {
                e.IsValid = true;
            }
            else {
                e.IsValid = false;
            }
        }
    }

}

ProfileSettings.registerClass('ProfileSettings', WSSCodeGuruBase);