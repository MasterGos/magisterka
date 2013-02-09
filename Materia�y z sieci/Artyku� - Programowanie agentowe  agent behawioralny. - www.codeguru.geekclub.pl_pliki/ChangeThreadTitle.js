//Kontrolka do obslugi zmiany tematu wątku

//konstruktor klasy
Controls_Forum_ChangeThredTitle = function (threadId, btnChangeThreadTitle, txtNewThreadTitle, lInfoId, divCtrlChangeThreadTitleId, jQueryTitleSelector, correctText, errorText, showText,  saveText) {

    this._threadId = threadId;
    //Przysick akceptujący
    this._btnChangeThreadTitle = $("#" + btnChangeThreadTitle);
    //pole tekstowe z nowym tematem
    this._txtNewThreadTitle = $("#" + txtNewThreadTitle);
    //miejsce na komentraz o niepowodzeni akcji 
    this._lInfo = $("#" + lInfoId);
    //formualrz
    this._divCtrlChangeThreadTitle = $("#" + divCtrlChangeThreadTitleId);
    //tag gdzie wyświetla się opis wątku
    this._titleTags = $(jQueryTitleSelector);
    

    //info gdy uda sie zmienic
    this._correctText = correctText;
    //info gdy nie uda się zmienić
    this._errorText = errorText;
    //tekst na przycisk gdy klikniecie bedzie pokazywało formularz
    this._showText = showText;
    //tekt na przycisk gdy klikniecie bedzie zapisywalo
    this._saveText = saveText;



    this._lInfo.text('');
    this._btnChangeThreadTitle.val(this._showText);
    this._txtNewThreadTitle.val(this._titleTags.last().text().trim());
    that = this;

    $(function () {
        that.initialize();
    });
}

//dodatkowe funkcje klasy
Controls_Forum_ChangeThredTitle.prototype = {
    initialize: function () {
        that = this;
        //podpięcie obsługi dla klikniecia przycisku
        that._btnChangeThreadTitle.click(that.btnChangeThreadTitle_Clicked);
    },

    btnChangeThreadTitle_Clicked: function (s) {
        if (that._divCtrlChangeThreadTitle.css("display") != "none") {
            if (Page_IsValid) {

                var newTitle = that._txtNewThreadTitle.val().trim();
                WSSCodeGuru.Services.ForumService.ChangeThreadTitle(that._threadId, newTitle, that.changeTitleSuccess, that.changeTitleError);
            }
        }
        else {
            that._divCtrlChangeThreadTitle.show();
            that._btnChangeThreadTitle.val(that._saveText);
        }
        return false;
    },
    changeTitleSuccess: function (result) {
        if (result) {
            that._titleTags.text(that._txtNewThreadTitle.val().trim());
            that._lInfo.text(that._correctText);
        }
        else {
            that._lInfo.text(that._errorText);
        }
    },
    changeTitleError: function (errorInfo) {
        that._lInfo.text(that._errorText);
    },
    clear: function () {
        that._txtNewThreadTitle.val('');
        that._divCtrlChangeThreadTitle.hide();
    }
}
//rejestrujemy kontrolke

Controls_Forum_ChangeThredTitle.registerClass('Controls_Forum_ChangeThredTitle', WSSCodeGuruBase);