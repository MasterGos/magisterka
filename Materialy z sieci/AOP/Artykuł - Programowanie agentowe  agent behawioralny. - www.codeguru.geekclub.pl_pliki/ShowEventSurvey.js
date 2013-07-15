ShowEventSurvey = function () {
    ShowEventSurvey.initializeBase(this);
    this._hdnMarkAsChangedId = null;
}
ShowEventSurvey.prototype = {
    CloseSurveyWindow: function () {
        parent.location.reload();
    },
    MarkAsChanged: function () {
        $('#' + this._hdnMarkAsChangedId).val('True');
    }
}

ShowEventSurvey.registerClass('ShowEventSurvey', WSSCodeGuruBase);