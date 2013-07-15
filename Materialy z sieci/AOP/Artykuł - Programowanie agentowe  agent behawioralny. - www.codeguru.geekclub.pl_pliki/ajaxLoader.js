/*
ajaxLoader.js
	* Wersja 1.0.0 
	* Data ostatniej modyfikacji: 2009-02-09
	* Opis: Zestaw funkcji służących do pokazywania i chowania loadera przy postbackach ajaxowych
	* Parametry:
        ** sender - parametr niezbędny do tego, żeby funkcję wywołać podczas postbacku ajaxowego
        ** args - j.w.
	* Autorzy: Justyna Jóźwik justynaj(at)k2.pl
	* Uwagi: Wymaga biblioteki jQuery (http://jquery.com)
	* Copyright (c) 2009 K2 Internet (http://k2.pl) All Rights Reserved.
*/


var msie6 = jQuery.browser.msie && (jQuery.browser.version < 7);
var htmlOverflow = "";

function showAjaxLoader(sender, args)
{
    var layerBg, layerContent, layerFakeFrame;
    var bgWidth, bgHeight, layerTop, layerLeft, layerWidth, layerHeight, marginTop, marginLeft;
    if ($('#loaderBgLayer').length > 0) {
        return;
    }
    layerBg = $('<div id="loaderBgLayer">&nbsp;</div>');
    layerContent = $('<div id="loaderLayer"><span>Czekaj...</span></div>');
    $(document.body).append(layerBg).append(layerContent);
    if (layerBg.css("display") != "none") {
        return;
    }
    layerWidth = layerContent.width();
    layerHeight = layerContent.height();
    if(msie6) { 
        htmlOverflow = document.getElementsByTagName('html')[0].style.overflow;
        document.getElementsByTagName('html')[0].style.overflow = "hidden";
        layerFakeFrame = $('<iframe id="loaderFakeFrame" frameborder="0" width="100%" height="100%" ></iframe>')
        layerBg.before(layerFakeFrame);
        marginTop = (document.documentElement.clientHeight - layerHeight) / 2 + "px";
        marginLeft = (document.documentElement.clientWidth - layerWidth) / 2 + "px";
        layerTop = document.documentElement.scrollTop;
        layerLeft = document.documentElement.scrollLeft;
        layerContent.css({"position": "absolute", "top": layerTop, "left": layerLeft});
        layerBg.css({"position": "absolute", "top": layerTop, "left": layerLeft});
        layerFakeFrame.css({"top": layerTop, "left": layerLeft});
    }
    else {
        marginTop = (0 - layerHeight) / 2 + "px";
        marginLeft = (0 - layerWidth) / 2 + "px";
    }
    layerBg.show();
    layerContent.css({ "margin-top": marginTop, "margin-left": marginLeft, "width" : layerWidth, "height" : layerHeight});
    layerContent.show();
}

function hideAjaxLoader(sender, args)
{
    $('#loaderBgLayer').remove();
    $('#loaderLayer').remove();
    if(msie6) {        
        $('#loaderFakeFrame').remove();
        document.getElementsByTagName('html')[0].style.overflow = htmlOverflow;
    }
}
