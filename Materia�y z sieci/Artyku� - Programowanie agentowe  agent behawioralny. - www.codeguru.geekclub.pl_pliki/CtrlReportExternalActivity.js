


Controls_ClubOnline_CtrlReportExternalActivity = function (tbLink, lLinkDuplicate, hdnLinkDuplicate, ddlExternalCategory, devCategoryDescriptionClass, activityCategoryWindowsPhone7Id) {

    var that = this;

    Controls_ClubOnline_CtrlReportExternalActivity.initializeBase(this);
    //Identyfikator dla textboxa z linkiem
    this.tbLinkId = "#" + tbLink;

    //identyfikator dla tekstu z komunikatem błędu
    this.lLinkDuplicateId = "#" + lLinkDuplicate;

    //identyfikator dla hiddenfielda z informacja czy aktualny widok jest poprawny
    this.hdnLinkDuplicateId = "#" + hdnLinkDuplicate;

    //Identyfikator dla dropDowna z listą kategorii
    this.ddlExternalCategoryId = "#" + ddlExternalCategory;

    //szablon klasy dla diva z opisem
    this.divCategoryDescriptionClass = "." + devCategoryDescriptionClass;

    ///identyfiaktor kategorii
    this.activityCategoryWindowsPhone7Id = activityCategoryWindowsPhone7Id;

    //Ostatnio pokazany div
    this.visbileDescription;

    $(function () {
        that.onLoad();
    });
}

Controls_ClubOnline_CtrlReportExternalActivity.prototype =
{
    onLoad: function () {
        that = this;
        $(that.ddlExternalCategoryId).change(that.ddlExternalCategory_change);
        that.ddlExternalCategory_change();
        if ($(this.hdnLinkDuplicateId).val() == 'true') {
            $(that.lLinkDuplicateId).hide();
        }
        else {
            $(that.lLinkDuplicateId).show();

        }
        $(that.tbLinkId).change(that.CheckExternalActivityWithLinkExists);
        that.CheckExternalActivityWithLinkExists();
    },


    CheckExternalActivityWithLinkExists: function () {
        var link = $(that.tbLinkId).val();
        if (link == '') {
            $(that.lLinkDuplicateId).hide();
        }
        else {
            //sprawdzamy poprawność linku tylko w przypadku, gdy wybrana kategoria jest kategoria WindowsPhone7
            var selectedCategoryValue = $(that.ddlExternalCategoryId).val();
            if (that.activityCategoryWindowsPhone7Id == selectedCategoryValue) {
                WSSCodeGuru.Services.ClubOnlineService.IsExternalActivityExistsByLink(link, function (result) {
                    if (result) {
                        $(that.lLinkDuplicateId).show();
                        $(that.hdnLinkDuplicateId).val(false);
                    }
                    else {
                        $(that.lLinkDuplicateId).hide();
                        $(that.hdnLinkDuplicateId).val(true);
                    }
                }, function (errorInfo) { })
            }
            else {
                $(that.lLinkDuplicateId).hide();
                $(that.hdnLinkDuplicateId).val(true);
            }
        };

    },



    //Obsługa zmiany dropDowna
    ddlExternalCategory_change: function () {
        var selectedValue = $(that.ddlExternalCategoryId).val();
        if (that.visbileDescription != undefined) {
            //ukrycie poprzednio widzianego diva
            $(that.visbileDescription).hide();
        }
        if (selectedValue == -1) {
            that.visbileDescription = undefined;
        }
        else {
            //pokazanie nowego diva
            var divToShow = that.divCategoryDescriptionClass + selectedValue;
            $(divToShow).show();
            that.visbileDescription = divToShow;
        }
    },
    ddlExternalCategory_RequiredValidate: function (source, e) {
        if (e.Value == "-1") {
            e.IsValid = false;
            return;
        }
        e.IsValid = true;
    },
    Date_FormatValidate: function (source, e) {
        var parsed = Date.parse(e.Value);
        if (isNaN(parsed)) {
            e.IsValid = false;
            return;
        }
        e.IsValid = true;
    },
    Link_LengthValidate: function (source, e) {
        e.IsValid = e.Value.length <= 200;
    },
    Link_DuplicateValidate: function (source, e) {
        var isValid = $(this.hdnLinkDuplicateId).val() == 'true';
        e.IsValid = isValid;
    },
    Link_ShouldConsistGuid: function (source, e) {
        e.IsValid = true;
        var selectedCategoryValue = $(that.ddlExternalCategoryId).val();
        if (that.activityCategoryWindowsPhone7Id == selectedCategoryValue) {
            var pattern = "[abcdefABCDEF0-9]{8}-[abcdefABCDEF0-9]{4}-[abcdefABCDEF0-9]{4}-[abcdefABCDEF0-9]{4}-[abcdefABCDEF0-9]{12}";
            var currentLink = $(that.tbLinkId).val();
            if (currentLink != '') {
                if (!currentLink.match(pattern)) {
                    e.IsValid = false;
                }
            }
        }
    }
}

//rejestrujemy kontrolke
Controls_ClubOnline_CtrlReportExternalActivity.registerClass('Controls_ClubOnline_CtrlReportExternalActivity', WSSCodeGuruBase);