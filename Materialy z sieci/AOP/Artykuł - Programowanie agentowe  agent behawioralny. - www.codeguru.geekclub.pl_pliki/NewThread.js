NewThread = function (divForumAssignId, ddlForumToAssignToId, hfSelectedForumId, validationGroup) {
    NewThread.initializeBase(this);
    this.divForumAssign = "#" + divForumAssignId;
    this.ddlForumToAssignTo = "#" + ddlForumToAssignToId;
    this.hfSelectedForum = "#" + hfSelectedForumId;
    this.validationGroup = validationGroup;
    //czy trwa ladowanie
    this._isLoading = false;
}
NewThread.prototype = {
    TagsSelected: function (hSelectedTagIdsId) {
        var selectedTags = $("#" + hSelectedTagIdsId).val();
//      nie ma już potrzeby dynamicznego ładowania tych forów
//        WSSCodeGuru.Services.ForumService.GetForum(selectedTags,
//            this._getForumFromServerSuccess,
//            this._onServerError, this);
    },
    //jesli udalo sie dociagnac dane
    _getForumFromServerSuccess: function (result, target) {
        target._isLoading = false;
        //przepisujemy elementy z formatu DictItem do wymaganego przez plugin (value/label)
        target._convertDictItemsToForumList(result, target);
    },
    //jesli wystapil blad
    _onServerError: function (result, target) {
        target._isLoading = false;
        alert("Wystąpił problem przy pobieraniu forum");
        $(target.divForumAssign).hide();
    },
    //Metoda konwertuje obiekty typu DictItem (takie jak po stronie serwera)
    //na to czego potrzebuje kontrolka DropDownList
    _convertDictItemsToForumList: function (dictItems, target) {
        if (dictItems != null && dictItems.length > 0) {
            $(target.ddlForumToAssignTo).children().remove();
            $.each(dictItems, function (index, value) {
                var newOption = document.createElement("option");
                newOption.text = value.Name;
                newOption.innerHTML = value.Name;
                newOption.value = value.ItemId;
                $(target.ddlForumToAssignTo).append(newOption);
            });
            var newOption = document.createElement("option");
            newOption.text = 'Wybierz forum';
            newOption.innerHTML = 'Wybierz forum';
            newOption.value = 0;
            newOption.selected = true;
            $(target.ddlForumToAssignTo).append(newOption);
            $(target.divForumAssign).show();
        }
        else {
            $(target.divForumAssign).hide();
        }
    },
    PublishThread: function () {
        var validationResult = true;
        if (Page_Validators != undefined && Page_Validators != null) {
            for (var i = 0; i < Page_Validators.length; i++) {
                if (Page_Validators[i].validationGroup == this.validationGroup) {
                    ValidatorValidate(Page_Validators[i]);
                }
                //if condition to check whether the validation was successfull or not.
                if (!Page_Validators[i].isvalid) {
                    validationResult = false;
                }
            }
        }
        if (validationResult == true) {
            $(this.hfSelectedForum).val($(this.ddlForumToAssignTo).val());
            $(this.ddlForumToAssignTo).attr("disabled", "disabled");
        }
        return validationResult;
    },

    DisableDdlForumToAssignTo: function () {
        $(this.ddlForumToAssignTo).attr("disabled", "disabled");
    }
}

NewThread.registerClass('NewThread', WSSCodeGuruBase);