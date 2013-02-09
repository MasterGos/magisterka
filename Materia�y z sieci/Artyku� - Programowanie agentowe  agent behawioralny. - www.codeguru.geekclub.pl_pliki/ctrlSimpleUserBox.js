ctrlSimpleUserBox = function (divTooltipId) {
    ctrlSimpleUserBox.initializeBase(this);
    this.divTooltip = "#" + divTooltipId;
    this.divTooltipId = divTooltipId;
    
}
ctrlSimpleUserBox.prototype = {
    ShowRanksInfo: function () {        
        TagToTip(this.divTooltipId);

    },
    HideRanksInfo: function () {
        UnTip();
    }
}

ctrlSimpleUserBox.registerClass('ctrlSimpleUserBox', WSSCodeGuruBase);