///Kontrolka do dodawania i edycji pytań

//konstruktor klasy
Controls_Surveys_QuestionsEditor = function () {
    Controls_Surveys_QuestionsEditor.initializeBase(this);
    this.btnEditQuestionClientID = null;
    this.hdnQuestionToEditClientID = null;
    this.btnDeleteQuestionClientID = null;

    this.txtQuestionContentClientID = null;
    this.rbtnMultipleChoiceClientID = null;
    this.txtMultipleChoiceAnswersClientID = null;
    this.txtSigleChoiceAnswersClientID = null;
    this.txtAnswerLengthLimitClientID = null;
    this.chkNoLengthLimitClientID = null;
    this.hdnQuestionIdClientID = null;
};

//dodatkowe funkcje klasy
Controls_Surveys_QuestionsEditor.prototype = {

    //pokazuje okienko edycji pytania i ewentualnie powoduje załadowanie danych pytania
    showEditBox: function (questionId) {
        // zresetuj okienko edycji
        $("#" + this.txtQuestionContentClientID).val('');
        $("#" + this.rbtnMultipleChoiceClientID).click();
        $("#" + this.txtMultipleChoiceAnswersClientID).val('');
        $("#" + this.txtSigleChoiceAnswersClientID).val('');
        $("#" + this.txtAnswerLengthLimitClientID).val('');
        $("#" + this.chkNoLengthLimitClientID).attr('checked', '');
        if (questionId != null) {
            $("#" + this.hdnQuestionToEditClientID).val(questionId);
            $("#" + this.btnEditQuestionClientID).click();
        }
        else {
            $("#" + this.hdnQuestionIdClientID).val('');
        }
        $("#divEditQuestion").show();
    },
    //powoduje usunięcie pytania
    clickDeleteQuestion: function (questionId) {
        if (questionId != null) {
            $("#" + this.hdnQuestionToEditClientID).val(questionId);
            $("#" + this.btnDeleteQuestionClientID).click();
        }
    },
    //chowa okienko edycji pytania
    hideEditBox: function () {
        $("#divEditQuestion").hide();
    }
};

//rejestrujemy kontrolke
Controls_Surveys_QuestionsEditor.registerClass('Controls_Surveys_QuestionsEditor', WSSCodeGuruBase);