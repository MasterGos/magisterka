///Kontrolka do obslugi wyboru tag-ow

//konstruktor klasy
Controls_Tags_TagsPicker = function (tbTagInput, divTagsPanel, divTagTemplate, hSelectedTagIds, divBtnClear, afterDeleteScript) {
    Controls_Tags_TagsPicker.initializeBase(this);
    //maksymalna ilosc elementow
    this._MAX_ELEMENTS = 50;
    //pole tekstowe do wyszukiwania tagow
    this._tbTagInput = "#" + tbTagInput;
    //div do pokazywania wybranych tagow
    this._divTagsPanel = "#" + divTagsPanel;
    //szablon pojedynczego, wybranego taga
    this._divTagTemplate = "#" + divTagTemplate;
    //ukryte pole do ktorego wpisujemy id-ki wybranych tagow (beda dostepne po stronie serwera)
    this._hSelectedTagIds = "#" + hSelectedTagIds;
    //div zawierajaca linka do usuwania wszystkich tagow
    this._divBtnClear = "#" + divBtnClear;
    //metoda wywolywana na potrzeby zapelnienia okienka autowypelniania
    this._autoCompleteCallback = null;
    //tablica na cachowane tagi (aby po kilka razy nie odwolywac sie do serwera po to samo)
    this._cachedTags = new Array();
    //ostanio uzyty prefix
    this._lastPrefix = null;
    //czy trwa ladowanie
    this._isLoading = false;
    //wybrane tagi
    this._selectedTags = new Array();
    //skrypt po usunięciu taga
    this._afterDeleteScript = afterDeleteScript;
}

//dodatkowe funkcje klasy
Controls_Tags_TagsPicker.prototype = {

    //metoa wywolywana po zaladowaniu strony
    onLoad: function (tagsFromServer) {
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
            /*open: function (event, ui) {
                
            },
            close: function (event, ui) {
            //alert("zamkniety");
            },*/
            delay: 300,
            minLength: 1
        });

        //inicjalizujemy mechanizm poczatkowymi tagami
        for (i = 0; i < tagsFromServer.length; ++i)
            this._addSelectedTag(tagsFromServer[i]);
    },

    //metoda wybiera wpisanego taga do kolekcji
    selectTag: function () {
        var text = $(this._tbTagInput).val();
        var tag = null;
        //jesli jest wprowadzony tekst to szukamy odpowiadajacego mu taga-a
        if (text != null && text.length > 0) {
            //jesli dany tag jest juz wybrany to nic wiecej nie robimy
            for (i = 0; i < this._selectedTags.length; ++i)
                if (this._selectedTags[i].Name == text)
                    return;

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
                this._addSelectedTag(tag);
            }
        }
        //tutaj bedzie obsluga niepoprawnego tag-u jesli null
        else {
            this._addSelectedTag(tag);
        }
    },

    //czyscimy wszystkie tagi
    clearTags: function () {
        //usuwamy wszystkie tagi
        $('[id^="' + $(this._divTagTemplate).attr("id") + '_"]').remove();
        this._selectedTags = new Array();
        $(this._hSelectedTagIds).val("");
    },

    //metoda dodaje wybrany tag do kolekcji
    _addSelectedTag: function (tag) {
        if (tag == null) {
            alert('Tag niepoprawny');
        } else {
            //oznaczamy tag jako wybrany
            this._selectedTags.push(tag);
            //robimy kopie szablonu
            var tagClone = $(this._divTagTemplate).clone();

            //ustawiamy jej wlasciwosci
            tagClone.find("#tName").text(tag.Name);
            var tagId = tagClone.find("#tId");
            tagId.attr("id", tag.ItemId);
            tagClone.attr("id", $(this._divTagTemplate).attr("id") + "_" + tag.ItemId);
            //zdarzenie usuniecia tag-a
            that = this;
            tagId.click(
                function (event) {
                    that._removeTag(tagClone, tag, that);
                }
            );
            //wrzucamy id-ki do hidena
            this._setHiddenTagsIds(this);
            //dodajemy do listy tagow
            tagClone.appendTo($(this._divTagsPanel));
            //pokazujemy tag-a
            tagClone.show();

            //pokazujemy div-a zawierajacego tagi jesli nie zostal wczesniej pokazany
            if ($(this._divTagsPanel).children().length > 1) {
                $(this._divTagsPanel).show();
                $(this._divBtnClear).show();
            }

            //czyscimy pole
            $(this._tbTagInput).val("");
        }
    },

    //Metoda usuwa tag-a
    _removeTag: function (divTag, tag, target) {
        //usuwamy z DOM-a
        divTag.remove();

        //ukrywamy div-a zawierajacego tagi jesli nie ma zadnych elementow
        if ($(this._divTagsPanel).children().length < 2) {
            $(this._divTagsPanel).hide();
            $(this._divBtnClear).hide();
        }

        //usuwamy z kolekcji
        for (i = 0; i < target._selectedTags.length; ++i)
            if (target._selectedTags[i].ItemId === tag.ItemId) {
                target._selectedTags.splice(i, 1);
                break;
            }
        //updatujemy ukryte pole
            target._setHiddenTagsIds(target);

        //wykonujemy dodatkowy skrypt jeżeli został podany
        if (this._afterDeleteScript)
            eval(this._afterDeleteScript);

    },

    //Metoda wrzuca do hiddena zaznaczone id-ki
    _setHiddenTagsIds: function (target) {
        var ids = "";

        $.each(target._selectedTags, function (index, value) {
            ids += value.ItemId + ";";
        });
        //wrzucamy idki do hidden-a
        $(target._hSelectedTagIds).val(ids);
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
        target._isLoading = false;

        target._addSelectedTag(result);
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
Controls_Tags_TagsPicker.registerClass('Controls_Tags_TagsPicker', WSSCodeGuruBase);