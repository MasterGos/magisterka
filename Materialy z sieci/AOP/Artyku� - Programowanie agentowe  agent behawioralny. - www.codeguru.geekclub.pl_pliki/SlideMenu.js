//Kontrolka obsługująca wysuwany panel boczny na forum

//Konstruktor klasy
Controls_Forum_SlideMenu = function (panelQuestions, panelLinks, panelTags, panelImportant) {
    Controls_Forum_SlideMenu.initializeBase(this);

    this._panelQuestions = "#" + panelQuestions;
    this._panelLinks = "#" + panelLinks;
    this._panelTags = "#" + panelTags;
    this._panelImportant = "#" + panelImportant;

    $(this._panelQuestions).css("display", "none");
    $(this._panelLinks).css("display", "none");
    $(this._panelTags).css("display", "none");
    $(this._panelImportant).css("display", "none");
}

var visibleQuestion = false;
var visibleLinks = false;
var visibleTags = false;
var visibleImportant = false;
var visibleAll = false;
var textareaEnabled = false;

Controls_Forum_SlideMenu.prototype = {
    //Obsluga zdarzenia ukrycia/wysuniecia wszystkich paneli
    clickSlide: function () {
        if (visibleImportant && visibleLinks && visibleQuestion && visibleTags) {
            //chowamy wszystkie panele, gdyz wszystkie sa wysuniete
            $(this._panelImportant).hide();
            $(this._panelTags).hide();
            $(this._panelLinks).hide();
            $(this._panelQuestions).hide();
            visibleImportant = false;
            visibleLinks = false;
            visibleQuestion = false;
            visibleTags = false;
            if (visibleAll) {
                $('.primePanel').removeClass('visibleAll');
                $('.rightPanel').css('display', 'block');
            }
            visibleAll = false;
        }
        else {
            //Nie wszsytkie panele sa wysuniete - wysuwamy wszystkie
            $(this._panelQuestions).show();
            $(this._panelLinks).show();
            $(this._panelTags).show();
            $(this._panelImportant).show();
            visibleImportant = true;
            visibleLinks = true;
            visibleQuestion = true;
            visibleTags = true;
            if (!visibleAll) {
                $('.primePanel').addClass('visibleAll');
                $('.rightPanel').css('display', 'none');
            }
            visibleAll = true;
        }
    },

    clickQuestions: function () {
        if (!visibleAll) {
            $(this._panelQuestions).css("display", "block");
            $(this._panelLinks).css("display", "none");
            $(this._panelTags).css("display", "none");
            $(this._panelImportant).css("display", "none");
            visibleQuestion = true;
            visibleLinks = false;
            visibleTags = false;
            visibleImportant = false;
            visibleAll = false;
        }
    },

    clickLinks: function () {
        if (!visibleAll) {
            $(this._panelQuestions).css("display", "none");
            $(this._panelLinks).css("display", "block");
            $(this._panelTags).css("display", "none");
            $(this._panelImportant).css("display", "none");
            visibleQuestion = false;
            visibleLinks = true;
            visibleTags = false;
            visibleImportant = false;
            visibleAll = false;
        }
    },

    clickTags: function () {
        if (!visibleAll) {
            $(this._panelQuestions).css("display", "none");
            $(this._panelLinks).css("display", "none");
            $(this._panelTags).css("display", "block");
            $(this._panelImportant).css("display", "none");
            visibleQuestion = false;
            visibleLinks = false;
            visibleTags = true;
            visibleImportant = false;
            visibleAll = false;
        }
    },

    clickImportant: function () {
        if (!visibleAll) {
            $(this._panelQuestions).css("display", "none");
            $(this._panelLinks).css("display", "none");
            $(this._panelTags).css("display", "none");
            $(this._panelImportant).css("display", "block");
            visibleQuestion = false;
            visibleLinks = false;
            visibleTags = false;
            visibleImportant = true;
            visibleAll = false;
        }
    }

}

//rejestrujemy kontrolke
Controls_Forum_SlideMenu.registerClass('Controls_Forum_SlideMenu', WSSCodeGuruBase);