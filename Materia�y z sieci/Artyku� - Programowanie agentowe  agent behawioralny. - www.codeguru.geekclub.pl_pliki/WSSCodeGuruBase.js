WSSCodeGuruBase = function () {
    this.defaultButtonID = null;
    this.datePickerStartDate = null;
    this.maxLengthForCheck;


    this.tinyMceBlobDirectory = "None";
    this.tinyMceFileUploadData = null;
}
WSSCodeGuruBase.prototype = {

    GetFckEditorPlainTextLength: function (fckid) {
        var fck = FCKeditorAPI.GetInstance(fckid);
        var htmlcontent = fck.GetHTML();
        var strTagStrippedText = htmlcontent.replace(/<\/?[^>]+(>|$)/g, "");
        var subSection = strTagStrippedText.substring(strTagStrippedText.length - 6, strTagStrippedText.length);
        //Opera dodaje spacje na koniec :/
        var browserName = navigator.appName;
        if (browserName == "Opera")
            if (subSection == "&nbsp;") {
                strTagStrippedText = strTagStrippedText.substring(0, strTagStrippedText.length - 6);
            }
        strTagStrippedText = strTagStrippedText.replace(/&nbsp;/g, " ");
        strTagStrippedText = strTagStrippedText.replace(/&oacute;/g, "ó");
        return strTagStrippedText.length;
    },
    SearchFocus: function (textboxId, defaultText) {
        if ($("#" + textboxId).val() == defaultText)
            $("#" + textboxId).val('');
    },
    SearchBlur: function (textboxId, searchText) {
        if ($("#" + textboxId).val() == '')
            $("#" + textboxId).val(searchText);
    },
    ClientSearch: function (textboxId, defaultText) {
        if ($("#" + textboxId).val() == defaultText)
            return false;
        else
            return true;
    },
    DefaultButton: function (e) {
        var evt = e ? e : window.event;
        var bt = document.getElementById(this.defaultButtonID);
        if (bt != null) {
            if (typeof bt == 'object') {
                if (evt.keyCode == 13) {
                    bt.click();
                    return false;
                }
            }
        }
    },
    //callback dla TinyMCE otwierający okienko wyboru obrazka
    TinyMceFileBrowserCallback: function (field_name, url, type, win) {
        if (type == 'image') {
            var cmsURL = "/ImageUpload.aspx?Method=ShowImageUpload&dir=" + this.tinyMceBlobDirectory;
            
            if (this.tinyMceFileUploadData != null)
                cmsURL += "&data=" + this.tinyMceFileUploadData;


            tinyMCE.activeEditor.windowManager.open({
                file: cmsURL,
                title: 'Wstaw obraz',
                width: 420,
                height: 400,
                resizable: "yes",
                inline: "yes",
                close_previous: "no"
            }, {
                window: win,
                input: field_name
            });
            return false;
        }
    },
    CheckForMaxLength: function (sender, args) {
        var controlToValidate = $("#" + sender.id).attr('controltovalidate');
        var lengthOfControlText = $("#" + controlToValidate).val().length;
        if (lengthOfControlText <= this.maxLengthForCheck)
            args.IsValid = true;
        else
            args.IsValid = false;
    },
    ValidatePassword: function (source, arguments) {
        var passw = arguments.Value;
        if (passw.length < 8 || passw.length > 64 || // właściwa długość
            (passw.search(/[0-9]/g) == -1 && // co najmniej jedna cyfra lub
            passw.search(/[^A-Za-z0-9]/g) == -1 // co najmniej jeden znak specjalny             
            )) 
            arguments.IsValid = false;
    },
    ValidateDateValue: function (source, arguments) {
        //sprawdzamy format daty
        var input = arguments.Value;
        var checkFormat = input.match(/(\d{4})-(\d{1,2})-(\d{1,2})/g);
        if (checkFormat == null)
            arguments.IsValid = false;
        else {
            //jeśli format jest ok, sprawdzamy wartości liczbowe
            var parts = input.match(/(\d+)/g);
            var d = new Date(parts[0], parts[1] - 1, parts[2]);
            arguments.IsValid = (d.getFullYear() == parts[0] && d.getMonth() == parts[1] - 1 && d.getDate() == parts[2]);
        }
    },
    EncodeHTML: function (str) {
        var div = document.createElement('div');
        var text = document.createTextNode(str);
        div.appendChild(text);
        return div.innerHTML;
    },
    InitDatepicker: function () {
        Date.firstDayOfWeek = 0;
        Date.format = 'yyyy-mm-dd';
        $(".date-pick").datePicker();
        if (this.datePickerStartDate != null && this.datePickerStartDate != '')
            $('.date-pick').dpSetStartDate(this.datePickerStartDate);
    },
    RedirectParent: function (url) {
        parent.location.href = url;
    },
    CheckUncheckCheckBox: function(mainCheckBoxId, classOthersCheckBoxs)
    {
      $(function () {
                   $("#"+mainCheckBoxId).change(function (changeArgs) {
                     if($("#" + mainCheckBoxId + ":checked").length == 0)
                       {
                        $("." + classOthersCheckBoxs).removeAttr("checked");
                       }
                       else
                       {
                       $("." + classOthersCheckBoxs).attr("checked","checked");
                       }
                   });
               });
    }
}
WSSCodeGuruBase.registerClass('WSSCodeGuruBase');
