//Konstruktor klasy
Controls_Events_EventsBox = function (aSoonEvents, aYourEvents, ctrlEventsBoxDivEvents, ctrlEventsBoxDivYours, hlRssEvents) {
    Controls_Forum_SlideMenu.initializeBase(this);

    this._aSoonEvents = "#" + aSoonEvents;
    this._aYourEvents = "#" + aYourEvents;
    this._ctrlEventsBoxDivEvents = "#" + ctrlEventsBoxDivEvents;
    this._ctrlEventsBoxDivYours = "#" + ctrlEventsBoxDivYours;
    this._hlRssEvents = "#" + hlRssEvents;

}

Controls_Events_EventsBox.prototype = {

    SwitchView: function (threads) {
        if (threads == true) {
            $(this._aSoonEvents).addClass("active");
            $(this._aYourEvents).removeClass("active");
            $(this._ctrlEventsBoxDivEvents).show();
            $(this._ctrlEventsBoxDivYours).hide();
            $(this._hlRssEvents).show();
        }
        else {
            $(this._aSoonEvents).removeClass("active");
            $(this._aYourEvents).addClass("active");
            $(this._ctrlEventsBoxDivEvents).hide();
            $(this._ctrlEventsBoxDivYours).show();
            $(this._hlRssEvents).hide();
        }
    }
}

//rejestrujemy kontrolke
Controls_Events_EventsBox.registerClass('Controls_Events_EventsBox', WSSCodeGuruBase);