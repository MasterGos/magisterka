///Kontrolka do obslugi wyboru tag-ow

//konstruktor klasy
Controls_Tags_TagsList = function (tbTagInput, redirectUrl) {
    Controls_Tags_TagsList.initializeBase(this);
    //maksymalna ilosc elementow
    this._MAX_ELEMENTS = 50;
    //pole tekstowe do wyszukiwania tagow
    this._tbTagInput = "#" + tbTagInput;
    //metoda wywolywana na potrzeby zapelnienia okienka autowypelniania
    this._autoCompleteCallback = null;
    //tablica na cachowane tagi (aby po kilka razy nie odwolywac sie do serwera po to samo)
    this._cachedTags = new Array();
    //ostanio uzyty prefix
    this._lastPrefix = null;
    //czy trwa ladowanie
    this._isLoading = false;
    //url na ktory sie redirectujemy aby pokazac tag-a
    this._redirectUrl = redirectUrl; 
}

//dodatkowe funkcje klasy
Controls_Tags_TagsList.prototype = {

    //metoda wywolywana po zaladowaniu strony
    onLoad: function () {
        that = this;
        //inicjujemy kontrolke mechanizmem autocomplete
        $(this._tbTagInput).autocomplete(
        {
            source: function (term, callback) {
                that._lastPrefix = term.term;
                that._autoCompleteCallback = callback;

                //jesli jeszcze nei pobieralismy tej kolekcji to lecimy na serwer
                if (that._cachedTags[that._lastPrefix] == null) {
                    //wywolujemy WS w celu dociagniecia tag-ow
                    that._getTagsFromServer(that._lastPrefix, that);
                    //jesli jest to serwujemy z lokalnego cache
                } else {
                    callback(that._convertDictItemsToAutoComplete(
                        that._cachedTags[that._lastPrefix]));
                }
            },
            //rozpoczecie przeszukiwania
            search: function (event, ui) {
                //jesli juz popbieramy dane z serwera to nie robimy nowej akcji
                if (that._isLoading)
                    return false;
            },
            delay: 300,
            minLength: 3
        });
    },

    //metoda wybiera wpisanego taga do kolekcji
    selectTag: function () {
        var text = $(this._tbTagInput).val();
        var tag = null;
        //jesli jest wprowadzony tekst to szukamy odpowiadajacego mu taga-a
        if (text != null && text.length > 0) {
            //szukamy taga w ostatnio przeszukiwanej kolekcji
            if (this._lastPrefix != null && this._cachedTags[this._lastPrefix] != null) {
                tags = this._cachedTags[this._lastPrefix];
                for (i = 0; i < tags.length; ++i) {
                    if (tags[i].Name == text) {
                        tag = tags[i];
                        break;
                    }
                }
            }

            //jesli taga jednak nie bylo w kolekcji to siegamy do serwera
            if (tag == null) {
                this._getTagFromServer(text);
                //jesli byl to obslugujemy jego dodanie
            } else {
                this._goToTag(tag);
            }
        }
        //tutaj bedzie obsluga niepoprawnego tag-u jesli null
        else {
            this._goToTag(tag);
        }
    },

    //metoda dodaje wybrany tag do kolekcji
    _goToTag: function (tag) {
        if (tag == null) {
            alert('Tag niepoprawny');
        } else {
            //redirect na strone tag-a
            var url = this._redirectUrl.replace("0", tag.Name).replace("1", tag.ItemId);
            window.location.href = url; 
        }
    },

    //metoda pobiera pojedynczego taga po jego nazwie
    _getTagFromServer: function (name) {
        this._isLoading = true;
        WSSCodeGuru.Services.TagsService.GetTag(name,
            this._getTagFromServerSuccess,
            this._onServerError, this);
    },

    //poprawne zakonczenie funkcji pobrania pojedynczego tag-a
    _getTagFromServerSuccess: function (result, target) {
        this._isLoading = false;

        target._goToTag(result);
    },

    //metoda dociaga dane z serwera
    _getTagsFromServer: function (prefix, target) {
        target._isLoading = true;
        WSSCodeGuru.Services.TagsService.GetTags(prefix, target._MAX_ELEMENTS,
            target._getTagsFromServerSuccess,
            target._onServerError, target);
    },

    //jesli udalo sie dociagnac dane
    _getTagsFromServerSuccess: function (result, target) {
        target._isLoading = false;
        //przepisujemy elementy z formatu DictItem do wymaganego przez plugin (value/label)
        tags = target._convertDictItemsToAutoComplete(result);

        //dodajemy do cache
        target._cachedTags[target._lastPrefix] = result;
        //wywolujemy metode callback
        target._autoCompleteCallback(tags);
    },

    //jesli wystapil blad
    _onServerError: function (result, target) {
        target._isLoading = false;
        alert("Wystąpił problem przy pobieraniu tagów");
        target._autoCompleteCallback(new Array());
    },

    //Metoda konwertuje obiekty typu DictItem (takie jak po stronie serwera)
    //na to czego potrzebuej kontrolka autocomplete
    _convertDictItemsToAutoComplete: function (dictItems) {
        //przepisujemy elementy z formatu DictItem do wymaganego przez plugin (value/label)
        tags = new Array();

        if (dictItems != null && dictItems.length > 0) {
            $.each(dictItems, function (index, value) {
                tags[index] = value.Name;
            });
        }

        return tags;
    }
}

//rejestrujemy kontrolke
Controls_Tags_TagsList.registerClass('Controls_Tags_TagsList', WSSCodeGuruBase);