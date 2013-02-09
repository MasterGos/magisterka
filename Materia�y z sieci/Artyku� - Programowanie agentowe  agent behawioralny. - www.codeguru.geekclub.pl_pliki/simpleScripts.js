function initializeSimpleScripts() {
    // inicjalizacja tooltipow dla awatarow uzytkownikow
//    $('.simpleUserBox .author.showTooltip').each(function () {
//        $(this).bind('mouseenter', function () {
//            TagToTip($(this).siblings('.divTooltipOuter').attr('id'), DELAY, 0);
//        }).bind('mouseleave', function () {
//            UnTip();
//        });
//        });
}



$(document).ready(function () {
    //dygnięcie strzałki artykułów
    $('.jqAnimatedArrow').mousedown(function () {
        $(this).addClass("jqAnimatedArrowEvent");
        $(this).animate({
            "margin-right": "5px",
        }, 100, function() {
                // Animation complete.
                $(this).animate({
                    "margin-right": "10px",
                }, 100, function() {
                    $(this).removeClass("jqAnimatedArrowEvent");
                });
            }
        );
    });

    //dygnięcie strzałki pod logo
    $('.logoArrow').mousedown(function () {
        $(this).addClass("logoArrowEvent");
        $(this).animate({
            "left": "-=5px",
        }, 100, function() {
                // Animation complete.
                $(this).animate({
                    "left": "+=5px",
                }, 100, function() {
                    $(this).removeClass("logoArrowEvent");
                });
            }
        );
    });

    //zaznaczanie opcji szukania przez binga
    if ($('.topSearch input[type="checkbox"]').is(':checked')) {
        $('.searchBing').addClass('bing');
        $('#idctrlSearchbox_btnSearch').addClass('bingButton');
        $('.searchBing').val('Wyszukaj w bing');
    } else {
        $('.searchBing').removeClass('bing');
        $('#idctrlSearchbox_btnSearch').removeClass('bingButton');
        $('.searchBing').val('Szukaj...');
    }
    $('.topSearch input[type="checkbox"]').change(function () {
        if ($(this).is(':checked')) {
            $('.searchBing').addClass('bing');
            $('#idctrlSearchbox_btnSearch').addClass('bingButton');
            $('.searchBing').val('Wyszukaj w bing');
        } else {
            $('.searchBing').removeClass('bing');
            $('#idctrlSearchbox_btnSearch').removeClass('bingButton');
            $('.searchBing').val('Szukaj...');
        }
    });

//    //pokazywanie i ukrywanie filtrów
//    $('.filtersWrapper a').click(function () {
//        var box = $(this).parent().attr('id'); //nazwa klikniętego linka
//        $('.' + box).toggle();
//        $(this).parent().toggleClass('active');
//        $('.filters').find("input[type='text']:enabled:first").focus();
//        $('.filters').not('.' + box).hide();
//        $('.filtersWrapper > div').not('#' + box).removeClass('active');
//        return false;
//    });

    //pokazywanie rssów
    $('.toggler').click(function () {
        var sw = $(this).attr('rel');
        $('.' + sw).toggle();
    });

    //caly div klikalny
    $('.filtersWrapper div').click(function () {
        $(this).find('a').trigger('click');
    });

    //przełączanie klasy zakładek w profilu prywatnym
    $('.typePicker a').click(function () {
        $('.typePicker a').removeClass('active');
        $(this).addClass('active');
    });

    //zmiana rozmiaru czcionki w newsie/artykule
    $('.fontSizer a').click(function () {
        var texts = $('h3, .newsLeft div, .newsLeft p'); //lista elementów, w których dokonywania jest zmiana czcionki
        var clicked = $(this).attr('class'); //rodzaj klikniętego przycisku
        var change, fontsize, lineheight; //change - mnożnik, fontsize - tymczasowy rozmiar czcionki

        $('.fontSizer a').removeClass('active');
        $(this).addClass('active');

        change = ($(this).index() * 0.15) + 1; //wielkość czcionki ustalana jest w zależności od kolejności klikniętego linka, każdy kolejny link na liście to +0.15 do rozmiaru czcionki.

        texts.removeAttr('style');
        texts.each(function () {
            fontsize = parseFloat($(this).css('font-size'));
            fontsize = fontsize * change;
            lineheight = parseFloat($(this).css('line-height'));
            lineheight = lineheight * change;
            $(this).css({ 'font-size': fontsize + 'px', 'line-height': lineheight + 'px' });
        });
        $.cookie('wsscgfont', clicked); //wywołanie cookies'ów znajduje się bezpośrednio na stronie z artykułem
        return false
    });

    //pokazywanie chumrki z podpowiedzą w forum dodawanie nowego watku
    $('.howToWritePost .showDescription').hover(function () { $('.howToWritePost .description').show(); }, function () { $('.howToWritePost .description').hide(); });
    $('.howToChooseTags .showDescription').hover(function () { $('.howToChooseTags .description').show(); }, function () { $('.howToChooseTags .description').hide(); });

    // pokazywanie i ukrwanie prawego menu na forum
    $('.slide_questions_button').hover(function () {
        if (!visibleAll) {
            $('.panelLinks').hide();
            $('.panelTags').hide();
            $('.panelQuestions').show();
            $('.panelImportant').hide();
            visibleImportant = false;
            visibleTags = false;
            visibleLinks = false;
            visibleQuestion = true;
        }
    });
    $('.panelQuestions textarea').focus(function () { textareaEnabled = true; });
    $('.panelQuestions textarea').focusout(function () { textareaEnabled = false; });
    $('.panelQuestions').hover(function () { if (!visibleAll) { $('.panelLinks').hide(); $('.panelTags').hide(); $('.panelImportant').hide(); } }, function () { if (visibleAll === false && textareaEnabled !== true) { $(this).hide(); visibleQuestion = false; } });

    $('.slide_links_button').hover(function () {
        if (!visibleAll) {
            $('.panelLinks').show();
            $('.panelTags').hide();
            $('.panelQuestions').hide();
            $('.panelImportant').hide();
            visibleImportant = false;
            visibleTags = false;
            visibleLinks = true;
            visibleQuestion = false;
        }
    });
    $('.panelLinks').hover(function () { if (!visibleAll) { $('.panelTags').hide(); $('.panelImportant').hide(); $('.panelQuestions').hide(); } }, function () { if (visibleAll === false) { $(this).hide(); visibleLinks = false; } });

    $('.slide_tags_button').hover(function () {
        if (!visibleAll) {
            $('.panelLinks').hide();
            $('.panelTags').show();
            $('.panelQuestions').hide();
            $('.panelImportant').hide();
            visibleImportant = false;
            visibleTags = true;
            visibleLinks = false;
            visibleQuestion = false;
        }
    });
    $('.panelTags').hover(function () { if (!visibleAll) { $('.panelLinks').hide(); $('.panelImportant').hide(); $('.panelQuestions').hide(); } }, function () { if (visibleAll === false) { $(this).hide(); visibleTags = false; } });

    $('.slide_important_button').hover(function () {
        if (!visibleAll) { 
            $('.panelLinks').hide(); 
            $('.panelTags').hide();
            $('.panelQuestions').hide();
            $('.panelImportant').show();
            visibleImportant = true;
            visibleTags = false;
            visibleLinks = false;
            visibleQuestion = false;
        }
    });
    $('.panelImportant').hover(function () { if (!visibleAll) { $('.panelLinks').hide(); $('.panelTags').hide(); $('.panelQuestions').hide(); } }, function () { if (visibleAll === false) { $(this).hide(); visibleImportant = false; } });

    //zaznaczanie wiadomości
    function chooseMessages($this) {
        if ($this.is(':checked')) {
            $this.parent().addClass('active');
        } else {
            $this.parent().removeClass('active');
        }
    }

    $('.grayBlock input[type=checkbox]').each(function () {
        chooseMessages($(this));
    });

    $('.grayBlock input[type=checkbox]').click(function () {
        chooseMessages($(this));
    });
    initializeSimpleScripts();

    if (Sys.WebForms != undefined && Sys.WebForms.PageRequestManager != null && Sys.WebForms.PageRequestManager != undefined) {
        Sys.WebForms.PageRequestManager.getInstance().add_endRequest(initializeSimpleScripts);
    }

    //bordery na tabelkach wstawianych przez uzytkownikow
    $('.divPostInner table').each(function () {
        var border = parseInt($(this).attr('border'));
        if (border > 0) {
            $(this).find('td').css({ 'border-style': 'solid', 'border-width': border + 'px' });
        }
    });

});


$(document).ready(function ($) {

    $.fn.extend({
        textCounter: function (givenOptions) {
            return this.each(function () {
                var $this = $(this),
                options = $.extend({
                    maxChars: 512,
                    maxCharsWarning: 492,
                    msgFontSize: '12px',
                    msgFontColor: '#000000',
                    msgFontFamily: 'Arial',
                    msgTextAlign: 'right',
                    msgWarningColor: '#F00',
                    msgAppendMethod: 'insertAfter'
                }, givenOptions);

                if (options.maxChars <= 0) return;

                // create counter element
                var textCounter = $("<div class=\"textCounter\">&nbsp;</div>");
                var jqEasyCounterMsgStyle = {
                    'font-size': options.msgFontSize,
                    'font-family': options.msgFontFamily,
                    'color': options.msgFontColor,
                    'text-align': options.msgTextAlign,
                    'width': $this.width(),
                    'opacity': 0
                };
                textCounter.css(jqEasyCounterMsgStyle);
                // append counter element to DOM
                textCounter[options.msgAppendMethod]($this);

                // bind events to this element
                $this
				.bind('keydown keyup keypress', doCount)
				.bind('focus paste', function () { setTimeout(doCount, 10); })
				.bind('blur', function () { textCounter.stop().fadeTo('fast', 0); return false; });

                function doCount() {
                    var val = $this.val(),
					length = val.length

                    if (length >= options.maxChars) {
                        val = val.substring(0, options.maxChars);
                    };

                    if (length > options.maxChars) {
                        // keep scroll bar position
                        var originalScrollTopPosition = $this.scrollTop();
                        $this.val(val.substring(0, options.maxChars));
                        $this.scrollTop(originalScrollTopPosition);
                    };

                    if (length >= options.maxCharsWarning) {
                        textCounter.css({ "color": options.msgWarningColor });
                    } else {
                        textCounter.css({ "color": options.msgFontColor });
                    };

                    textCounter.html('Wykorzystane znaki: ' + $this.val().length + "/" + options.maxChars);
                    textCounter.stop().fadeTo('fast', 1);
                };
            });
        }
    });

});

//Obsługa wcisniecia 'enter' po wprowadzeniu słow kluczowych w textboxie wyszukiwarki
function doClick(buttonName, textBoxName, e) {
    var key;

    if (window.event)
        key = window.event.keyCode;     //IE
    else
        key = e.which;     //firefox
    var tb = document.getElementById(textBoxName);
    if ($(tb).is(":focus") && Page_ClientValidate()) {
        if (key == 13) {
            var btn = document.getElementById(buttonName);
            if (btn != null) {
                btn.click();
                event.keyCode = 0
            }
        }
    }
}

//Obsługa wcisniecia 'enter' po wprowadzeniu słow kluczowych w textboxie wyszukiwarki
function doClickNoValid(buttonName, textBoxName, e) {
    var key;

    if (window.event)
        key = window.event.keyCode;     //IE
    else
        key = e.which;     //firefox
    var tb = document.getElementById(textBoxName);
    if ($(tb).is(":focus")) {
        if (key == 13) {
            var btn = document.getElementById(buttonName);
            if (btn != null) {
                btn.click();
                event.keyCode = 0
            }
        }
    }
}

//Obsługa wcisniecia 'enter' po wprowadzeniu hasła
function doClickLogin(buttonName, textBoxName, e) {
    var key;

    if (window.event)
        key = window.event.keyCode;     //IE
    else
        key = e.which;     //firefox
    var tb = document.getElementById(textBoxName);
    if (Page_ClientValidate()) {
        if (key == 13) {
            var btn = document.getElementById(buttonName);
            if (btn != null) {
                btn.click();
                event.keyCode = 0
            }
        }
    }
}

$('document').ready(function () {
//    $('.description .showTooltip').each(function () {
//        $(this).bind('mouseenter', function () {
//            TagToTip($(this).siblings('.divTooltipOuter').attr('id'), DELAY, 0);
//        }).bind('mouseleave', function () {
//            UnTip();
//        });
//    });
});