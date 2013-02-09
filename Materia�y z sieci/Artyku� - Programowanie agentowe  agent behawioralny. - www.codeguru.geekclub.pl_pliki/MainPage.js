var ADDRESSEND = '';

$().ready(function () {
    $('#loginAndPasswordControl_tbLogin').keyup(function (event) {
        var key;

        if (window.event)
            key = window.event.keyCode;     //IE
        else
            key = event.which;     //firefox

        if (key == 13) {
            myPostLogOn();
            event.preventDefault();
            event.stopPropagation();
            return false;
        }
    });

    $('#loginAndPasswordControl_tbPassword_tbPassword').keyup(function (event) {
        var key;

        if (window.event)
            key = window.event.keyCode;     //IE
        else
            key = event.which;     //firefox

        if (key == 13) {
            myPostLogOn();
            event.preventDefault();
            event.stopPropagation();
            return false;
        }
    });

});

$().ready(function () {
    if (window.location.href.toString().indexOf("uzytkownicy") != -1) {
        $("#usersNav").addClass('active');
    } else if (window.location.href.toString().indexOf("uzytkownik") != -1) {
        $("#usersNav").addClass('active');        
    } else if (window.location.href.toString().indexOf("grupy") != -1) {
        $("#groupsNav").addClass('active');
    } else if (window.location.href.toString().indexOf("baza-wiedzy") != -1) {
        $("#articleNav").addClass('active');
    } else if (window.location.href.toString().indexOf("forum") != -1) {
        $("#forumNav").addClass('active');
    } else if (window.location.href.toString().indexOf("kalendarium") != -1) {
        $("#eventsNav").addClass('active');
    } else if (window.location.href.toString().indexOf('aktualnosci') != -1) {
        $("#newsNav").addClass('active');
    } else if (window.location.href.toString().indexOf("geek-club") != -1) {
        $("#clubNav").addClass('active');
    } else if (window.location.href.toString().indexOf("szablony") != -1) {
        $("#galleryOfTemplatesMUXNav").addClass('active');
    } else if (window.location.href.toString().indexOf("projekty") != -1) {
        $("#projectsMUXNav").addClass('active');
    } else if (window.location.href.toString().indexOf("inspiracje") != -1) {
        $("#inspirationsMUXNav").addClass('active');
    } else {
    }
});


$().ready(function () {
    var myHost = window.location.host;
    ADDRESSEND = $("#hiddenUrlEnd").val();
    //    if (myHost.indexOf('wss') != -1) {
    //        $.each($("#mainMenu ul li a"), function () {
    //            $(this).attr("data-temp-href", $(this).attr("href").split("/")[3]);
    //            $(this).attr("href", "http://wss" + ADDRESSEND + "/" + $(this).attr("data-temp-href"));
    //        });
    //    }
    //    else if (myHost.indexOf("codeguru") != -1) {
    //        $.each($("#mainMenu ul li a"), function () {
    //            $(this).attr("data-temp-href", $(this).attr("href").split("/")[3]);
    //            $(this).attr("href", "http://codeguru" + ADDRESSEND + "/" + $(this).attr("data-temp-href"));
    //        });
    //    }
    //    else if (myHost.indexOf("modernux") != -1) {
    //        $.each($("#mainMenu ul li a"), function () {
    //            $(this).attr("data-temp-href", $(this).attr("href").split("/")[3]);
    //            $(this).attr("href", "http://modernux" + ADDRESSEND + "/" + $(this).attr("data-temp-href"));
    //        });
    //    }
    //    else {
    //        $.each($("#mainMenu ul li a"), function () {
    //            $(this).attr("data-temp-href", $(this).attr("href").split("/")[3]);
    //            $(this).attr("href", "#");
    //        });
    //    }

    $("#divMainMenusWraper").mouseleave(function () {
        if ((window.location.host.indexOf('wss') == -1) && (window.location.host.indexOf('codeguru') == -1) && (window.location.host.indexOf('modernux') == -1)) {
            $("#first").removeClass("firstHovered");
            $("#first p").removeClass("hoveredP");
            $("#second").removeClass("secondHovered");
            $("#second p").removeClass("hoveredP");
            $("#third").removeClass("thirdHovered");
            $("#third p").removeClass("hoveredP");

            $.each($("#mainMenu ul li a"), function () {
                if ($(this).attr("href").indexOf("geekclub") != -1) {
                    $(this).attr("data-temp-href", $(this).attr("href").split("/")[3]);
                    var oldHref = $(this).attr("href");
                    oldHref = oldHref.replace("wss.", "");
                    oldHref = oldHref.replace("codeguru.", "");
                    oldHref = oldHref.replace("modernux.", "");
                    $(this).attr("href", oldHref);
                }
            });

            $("#mainMenu").css("background-color", "#C1C1C1");
            $.each($("#mainMenu ul li"), function () {
                //$(this).css("background-color", "#C1C1C1");

                $(this).removeClass("backgroundType2");
                $(this).removeClass("backgroundType3");
                $(this).removeClass("backgroundType235");

                $(this).addClass("backgroundTypeGray");
                $(this).children("a").children("span").css("color", "#656262");
            });

            // zmiana menu dla ModernUX
            $.each($(".modernux-hide"), function () {
                $(this).removeClass("nodisplay");
            });

            $.each($(".modernux-nav"), function () {
                $(this).addClass("nodisplay");
            });
        }


    });

    $("#first").mouseenter(function () {
        $("#first").addClass("firstHovered");
        $("#first p").addClass("hoveredP");
        $("#second").removeClass("secondHovered");
        $("#second p").removeClass("hoveredP");
        $("#third").removeClass("thirdHovered");
        $("#third p").removeClass("hoveredP");

        $.each($("#mainMenu ul li a"), function () {
            if ($(this).attr("href").indexOf("geekclub") != -1) {
                $(this).attr("data-temp-href", $(this).attr("href").split("/")[3]);
                $(this).attr("href", "http://www.wss" + ADDRESSEND.replace(".www","") + "/" + $(this).attr("data-temp-href"));
            }

        });

        $("#mainMenu").css("background-color", "#FF8400");
        $.each($("#mainMenu ul li"), function () {
            //$(this).css("background-color", "#FF8400");

            $(this).removeClass("backgroundTypeGray");
            $(this).removeClass("backgroundType3");
            $(this).removeClass("backgroundType235");

            $(this).addClass("backgroundType2");
            $(this).children("a").children("span").css("color", "white");
        });

        // zmiana menu dla ModernUX
        $.each($(".modernux-hide"), function () {
            $(this).removeClass("nodisplay");
        });

        $.each($(".modernux-nav"), function () {
            $(this).addClass("nodisplay");
        });
    });

    $("#second").mouseenter(function () {
        $("#first").removeClass("firstHovered");
        $("#first p").removeClass("hoveredP");
        $("#second").addClass("secondHovered");
        $("#second p").addClass("hoveredP");
        $("#third").removeClass("thirdHovered");
        $("#third p").removeClass("hoveredP");

        $.each($("#mainMenu ul li a"), function () {
            if ($(this).attr("href").indexOf("geekclub") != -1) {
                $(this).attr("data-temp-href", $(this).attr("href").split("/")[3]);
                $(this).attr("href", "http://www.codeguru" + ADDRESSEND.replace(".www", "") + "/" + $(this).attr("data-temp-href"));
            }

        });

        $("#mainMenu").css("background-color", "#81CB3A");
        $.each($("#mainMenu ul li"), function () {
            //$(this).css("background-color", "#81CB3A");

            $(this).removeClass("backgroundTypeGray");
            $(this).removeClass("backgroundType2");
            $(this).removeClass("backgroundType235");

            $(this).addClass("backgroundType3");
            $(this).children("a").children("span").css("color", "white");
        });

        // zmiana menu dla ModernUX
        $.each($(".modernux-hide"), function () {
            $(this).removeClass("nodisplay");
        });

        $.each($(".modernux-nav"), function () {
            $(this).addClass("nodisplay");
        });
    });

    $("#third").mouseenter(function () {
        $("#first").removeClass("firstHovered");
        $("#first p").removeClass("hoveredP");
        $("#second").removeClass("secondHovered");
        $("#second p").removeClass("hoveredP");
        $("#third").addClass("thirdHovered");
        $("#third p").addClass("hoveredP");

        $.each($("#mainMenu ul li a"), function () {
            if ($(this).attr("href").indexOf("geekclub") != -1) {
                $(this).attr("data-temp-href", $(this).attr("href").split("/")[3]);
                $(this).attr("href", "http://www.modernux" + ADDRESSEND.replace(".www", "") + "/" + $(this).attr("data-temp-href"));
            }

        });

        $("#mainMenu").css("background-color", "#25A9E0");
        $.each($("#mainMenu ul li"), function () {
            //$(this).css("background-color", "#25A9E0");

            $(this).removeClass("backgroundTypeGray");
            $(this).removeClass("backgroundType3");
            $(this).removeClass("backgroundType2");

            $(this).addClass("backgroundType235");
            $(this).children("a").children("span").css("color", "white");
        });

        // zmiana menu dla ModernUX
        $.each($(".modernux-hide"), function () {
            $(this).addClass("nodisplay");
        });

        $.each($(".modernux-nav"), function () {
            $(this).removeClass("nodisplay");
        });
    });


    $("#mainMenu ul li").mouseenter(function () {
        if ($(this).hasClass("backgroundType2")) {
            $(this).removeClass("backgroundType2");
            $(this).addClass("backgroundType2Dark");
        }
        else if ($(this).hasClass("backgroundType3")) {
            $(this).removeClass("backgroundType3");
            $(this).addClass("backgroundType3Dark");
        }
        else if ($(this).hasClass("backgroundType235")) {
            $(this).removeClass("backgroundType235Dark");
            $(this).addClass("backgroundType235Dark");
        }
        else {
            $(this).removeClass("backgroundTypeGray");
            $(this).addClass("backgroundTypeGrayDark");
        }

    });

    $("#mainMenu ul li").mouseleave(function () {
        if ($(this).hasClass("backgroundTypeGrayDark")) {
            $(this).removeClass("backgroundTypeGrayDark");
            $(this).addClass("backgroundTypeGray");
        }
        if ($(this).hasClass("backgroundType2Dark")) {
            $(this).removeClass("backgroundType2Dark");
            $(this).addClass("backgroundType2");
        }
        if ($(this).hasClass("backgroundType3Dark")) {
            $(this).removeClass("backgroundType3Dark");
            $(this).addClass("backgroundType3");
        }
        if ($(this).hasClass("backgroundType235Dark")) {
            $(this).removeClass("backgroundType235Dark");
            $(this).addClass("backgroundType235");
        }
    });
});


$().ready(function () {
    var logoDiv = $("#divLogoMain");

    logoDiv.removeClass();

    if (window.location.host.indexOf('wss') != -1) {
        logoDiv.addClass("logoWSS");
        $(".logoArrow").show();
        $(".logoArrow").css("left", "125px");
        //        $("#divLogoMain").attr("href", "http://wss" + ADDRESSEND);
    }
    else if (window.location.host.indexOf("codeguru") != -1) {
        logoDiv.addClass("logoCG");
        $(".logoArrow").show();
        $(".logoArrow").css("left", "90px");
        //        $("#divLogoMain").attr("href", "http://codeguru" + ADDRESSEND);
    }
    else if (window.location.host.indexOf("modernux") != -1) {
        logoDiv.addClass("logoUX");
        $(".logoArrow").show();
        $(".logoArrow").css("left", "123px");
        //      $("#divLogoMain").attr("href", "http://modernux" + ADDRESSEND);
    }
    else {
        logoDiv.addClass("logo");
        $("span.logoArrow").hide();
    }
});

$().ready(function () {
    var myHost = window.location.host;


    if (myHost.indexOf('wss') != -1) {
        $("#menuMain").hide();
        $("#menuMainSmall").show();
        $("#firstSmall").addClass("wssPortalMenuSmallClass");

        $("#mainMenu").children("ul").children().addClass("backgroundType2"); //css("background", "#FF8400");
        $("#mainMenu").css("background", "#FF8400");
        $("#calendarEvent2").css("color", "#FF8400");
        $("#newsHeader2").css("color", "#FF8400");
        $("#knowHeader").css("color", "#FF8400");
        $("#mainMenu ul li a span").css("color", "white");

    }
    else if (myHost.indexOf("codeguru") != -1) {
        $("#menuMain").hide();
        $("#menuMainSmall").show();
        $("#secondSmall").addClass("codeguruMenuSmallClass");

        $("#mainMenu").children("ul").children().addClass("backgroundType3"); // css("background", "#81CB3A");
        $("#mainMenu").css("background", "#81CB3A");
        $("#calendarEvent2").css("color", "#81CB3A");
        $("#newsHeader2").css("color", "#81CB3A");
        $("#knowHeader").css("color", "#81CB3A");
        $("#mainMenu ul li a span").css("color", "white");
    }
    else if (myHost.indexOf("modernux") != -1) {
        $("#menuMain").hide();
        $("#menuMainSmall").show();
        $("#thirdSmall").addClass("modernUXMenuSmallClass");

        $("#mainMenu").children("ul").children().addClass("backgroundType235"); // css("background", "#25A9E0");
        $("#mainMenu").css("background", "#25A9E0");
        $("#calendarEvent2").css("color", "#25A9E0");
        $("#newsHeader2").css("color", "#25A9E0");
        $("#knowHeader").css("color", "#25A9E0");
        $("#mainMenu ul li a span").css("color", "white");
    }
    else {
        $("#menuMain").show();
        $("#menuMainSmall").hide();
    }
});

$().ready(function () {
    $("div.simpleUserBox").mouseenter(function () {
        $(this).children(".divTooltipOuter").stop(true, true).animate({ "left": "0px" }, 300);
        $(this).children(".author").stop(true, true).animate({ "left": "70px" }, 300);
    }).mouseleave(function () {
        $(this).children(".divTooltipOuter").stop(true, true).animate({ "left": "-70px" }, 300);
        $(this).children(".author").stop(true, true).animate({ "left": "0" }, 300);
    });
});