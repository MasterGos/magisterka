//Skrypty dla Tiny MCE
//skrypty ktore nie moga byc laczone z racji na strukture katalogow
requireLibrary('/Scripts/newTinyMCE/tiny_mce_src.js');
//konstruktor klasy
Common_TinyMce = function (textBoxId, onChangeScript) {
    Common_TinyMce.initializeBase(this);
    tiny_mce_on_change_script = onChangeScript;
    this.textBoxId = textBoxId;
}

//dodatkowe funkcje klasy
Common_TinyMce.prototype = {
    // funkcja inicjalizująca edytor Tiny MCE na każdym textarea posiadającym klasę "tinymce"
    init: function (enableHtml) {

        tinyMCE.init({
            // General options
            entity_encoding: "raw",
             
            encoding: "xml",
			mode: (!this.textBoxId ? "specific_textareas" : "exact"),
            editor_selector: (!this.textBoxId ? "tinymce" : null),
			elements: this.textBoxId,
            theme: "advanced",
            plugins: "syntaxhl,preview,inlinepopups,style,autolink,advlist,spellchecker,paste,lists,table", //,autolink,lists,spellchecker,pagebreak,style,layer,table,save,advhr,advimage,advlink,emotions,iespell,inlinepopups,insertdatetime,preview,media,searchreplace,print,contextmenu,paste,directionality,fullscreen,noneditable,visualchars,nonbreaking,xhtmlxtras,template",

            // Theme options
            theme_advanced_buttons1: "bold,italic,underline,bullist,numlist,|,link,unlink,anchor,|,blockquote,|,justifyleft,justifycenter,justifyright,justifyfull", //,|,syntaxhl,preview,image,pasteword",
            theme_advanced_buttons2: "formatselect,image,|,table,|,row_before,row_after,delete_row,|,col_before,col_after,delete_col,|,split_cells,merge_cells",
            theme_advanced_buttons3: "pasteword,syntaxhl,|,undo,redo,|" + (enableHtml ? ",code" : "") + ",preview,|,spellchecker",
            theme_advanced_toolbar_location: "top",
            theme_advanced_toolbar_align: "left",
            theme_advanced_statusbar_location: "bottom",
            theme_advanced_resizing: true,
            theme_advanced_blockformats: "p,h3,h4",

            // Skin options
            skin: "wsscg",
            skin_variant: "silver",

            // Example content CSS (should be your site CSS)
            //content_css: "css/style.css",

            // Drop lists for link/image/media/template dialogs
            template_external_list_url: "js/template_list.js",
            external_link_list_url: "js/link_list.js",
            external_image_list_url: "js/image_list.js",
            media_external_list_url: "js/media_list.js",

            // Replace values for the template plugin
            template_replace_values: {
                username: "Some User",
                staffid: "991234"
            },
            file_browser_callback: "WSSCodeGuruBase.TinyMceFileBrowserCallback",
            gecko_spellcheck: true,
            language: "en",
            spellchecker_languages: "+English=en,Polish=pl",
            spellchecker_rpc_url: "/Utils/TinyMceSpellcheck.ashx?module=SpellChecker",

            //jeśli jest wyłączony HTML to niepozwalamy na dodawanie  znaczoga paragrafu <p> na kliknięcie ENTER, a dodanie łamania lini <br/>
            //Zakomentowane, aby generować jednak paragrafy, ale w CSS je ukryć BUG: 48660 
            //            forced_root_block: enableHtml ? undefined : false,
            //            force_br_newlines: enableHtml ? undefined : true,
            //            force_p_newlines: enableHtml ? undefined : false,

            relative_urls: false,
            convert_urls: false,
            setup: function (ed) {
                ed.onSaveContent.add(function (ed, o) {
                    var html = o.content;
                    html = html.replace(/(\.\.\/)+Utils\/ImageRedirect/g, '/Utils/ImageRedirect');
                    o.content = html;
                });
                ed.onPostRender.add(function (ed, cm) {
                    if (!enableHtml) {
                        var iframe = document.getElementById(ed.id + "_ifr");
                        $(iframe.contentWindow.document.body).find("p").css("margin", "0 0 0 0");
                    }
                });
                ed.onChange.add(function (ed, l) {
                    if (!enableHtml) {
                        var iframe = document.getElementById(ed.id + "_ifr");
                        $(iframe.contentWindow.document.body).find("p").css("margin", "0 0 0 0");
                    }
     if (tiny_mce_on_change_script && tiny_mce_on_change_script != '')
                        eval(tiny_mce_on_change_script);
                
                });
            },
            paste_preprocess: function (pl, o) {
                //upraszczanie wklejanej tesci tylko gdy jesy wyłączona edycja html
                if (!enableHtml) {
                    //możliwe kombinacje brów które można uznać za nadmiarowe
                    var redundantBrTemplates =
                [
                "<br>\n<br>",
                "</br>\n</br>",
                "</br>\r\n</br>",
                "<br>\r\n<br>"
                ];
                    var redundantBrTemplatesCount = redundantBrTemplates.length;
                    //wyczyszczenie znaczników p,span z nadmiarowego formaowania
                    o.content = o.content.replace(new RegExp('<p[^>]*>', 'g'), '<p>');
                    o.content = o.content.replace(new RegExp('<span[^>]*>', 'g'), '<span>');
                    //funkcja sprawdzajaca, czy 
                    var hasRedundantBR = function (text) {
                        var textLength = text.length;
                        var subText = text.substring(textLength - 10, textLength);

                        for (var i = 0; i < redundantBrTemplatesCount; i++) {
                            if (subText.indexOf(redundantBrTemplates[i]) != -1) {
                                return true;
                            }
                        }
                        return false;
                    };

                    while (hasRedundantBR(o.content)) {
                        var result = -1;
                        var result1 = o.content.lastIndexOf("<br>");
                        var result2 = o.content.lastIndexOf("</br>");
                        if (result1 != -1 && result2 != -1) {
                            if (result1 > result2) {
                                result = result1;
                            } else {
                                result = result2;
                            }
                        } else {
                            if (result1 != -1) {
                                result = result1;
                            }
                            if (result2 != -1) {
                                result = result2;
                            }
                        }
                        o.content = o.content.substring(0, result);
                    }
                }
            },
            paste_auto_cleanup_on_paste: true
        });
    },
    initSimple: function (enableHtml) {
        tinyMCE.init(
        {
            // General options
            entity_encoding: "raw",
            encoding: "xml",

mode: (!this.textBoxId ? "specific_textareas" : "exact"),
            editor_selector: (!this.textBoxId ? "tinymce" : null),
            elements: this.textBoxId,
            theme: "advanced",
            plugins: "syntaxhl,preview,inlinepopups,style,autolink,advlist,spellchecker,paste,lists,table", //,autolink,lists,spellchecker,pagebreak,style,layer,table,save,advhr,advimage,advlink,emotions,iespell,inlinepopups,insertdatetime,preview,media,searchreplace,print,contextmenu,paste,directionality,fullscreen,noneditable,visualchars,nonbreaking,xhtmlxtras,template",

            // Theme options
            theme_advanced_buttons1: "bold,italic,underline,bullist,numlist,|,link,unlink,anchor,|,blockquote,|,justifyleft,justifycenter,justifyright,justifyfull,|formatselect,|,undo,redo,|" +(enableHtml ? ",code" : "")+",preview", //,|,syntaxhl,preview,image,pasteword",
            theme_advanced_buttons2: "", //"formatselect,image,|,tablecontrols",
            theme_advanced_buttons3: "", //"pasteword,syntaxhl,|,undo,redo,|" + (enableHtml ? ",code" : "") + ",preview,|,spellchecker",
            theme_advanced_toolbar_location: "top",
            theme_advanced_toolbar_align: "left",
            theme_advanced_statusbar_location: "bottom",
            theme_advanced_resizing: true,
            theme_advanced_blockformats: "p,h3,h4",

            // Skin options
            skin: "wsscg",
            skin_variant: "silver",

            // Example content CSS (should be your site CSS)
            //content_css: "css/style.css",

            // Drop lists for link/image/media/template dialogs
            template_external_list_url: "js/template_list.js",
            external_link_list_url: "js/link_list.js",
            external_image_list_url: "js/image_list.js",
            media_external_list_url: "js/media_list.js",

            // Replace values for the template plugin
            template_replace_values: {
                username: "Some User",
                staffid: "991234"
            },
            file_browser_callback: "WSSCodeGuruBase.TinyMceFileBrowserCallback",
            gecko_spellcheck: true,
            language: "en",
            spellchecker_languages: "+English=en,Polish=pl",
            spellchecker_rpc_url: "/Utils/TinyMceSpellcheck.ashx?module=SpellChecker",
            relative_urls: false,
            convert_urls: false,
            setup: function (ed) {
                ed.onSaveContent.add(function (ed, o) {
                    var html = o.content;
                    html = html.replace(/(\.\.\/)+Utils\/ImageRedirect/g, '/Utils/ImageRedirect');
                    o.content = html;
                });
  ed.onChange.add(function (ed, o) {
                    if (tiny_mce_on_change_script && tiny_mce_on_change_script != '')
                        eval(tiny_mce_on_change_script);
                });
            },
            paste_auto_cleanup_on_paste: true
        }

        );
    },
    initSimpleElements: function (elementsIds) {
        tinyMCE.init(
        {
            // General options
            entity_encoding: "raw",
            encoding: "xml",

            mode: "exact",
            elements: elementsIds,
            theme: "advanced",
            plugins: "syntaxhl,preview,inlinepopups,style,autolink,advlist,spellchecker,paste,lists,table", //,autolink,lists,spellchecker,pagebreak,style,layer,table,save,advhr,advimage,advlink,emotions,iespell,inlinepopups,insertdatetime,preview,media,searchreplace,print,contextmenu,paste,directionality,fullscreen,noneditable,visualchars,nonbreaking,xhtmlxtras,template",

            // Theme options
            theme_advanced_buttons1: "bold,italic,underline,bullist,numlist,|,link,unlink,anchor,|,blockquote,|,justifyleft,justifycenter,justifyright,justifyfull,|formatselect,|,undo,redo,|,code,preview", //,|,syntaxhl,preview,image,pasteword",
            theme_advanced_buttons2: "", //"formatselect,image,|,tablecontrols",
            theme_advanced_buttons3: "", //"pasteword,syntaxhl,|,undo,redo,|" + (enableHtml ? ",code" : "") + ",preview,|,spellchecker",
            theme_advanced_toolbar_location: "top",
            theme_advanced_toolbar_align: "left",
            theme_advanced_statusbar_location: "bottom",
            theme_advanced_resizing: true,
            theme_advanced_blockformats: "p,h3,h4",

            // Skin options
            skin: "wsscg",
            skin_variant: "silver",

            // Example content CSS (should be your site CSS)
            //content_css: "css/style.css",

            // Drop lists for link/image/media/template dialogs
            template_external_list_url: "js/template_list.js",
            external_link_list_url: "js/link_list.js",
            external_image_list_url: "js/image_list.js",
            media_external_list_url: "js/media_list.js",

            // Replace values for the template plugin
            template_replace_values: {
                username: "Some User",
                staffid: "991234"
            },
            file_browser_callback: "WSSCodeGuruBase.TinyMceFileBrowserCallback",
            gecko_spellcheck: true,
            language: "en",
            spellchecker_languages: "+English=en,Polish=pl",
            spellchecker_rpc_url: "/Utils/TinyMceSpellcheck.ashx?module=SpellChecker",
            relative_urls: false,
            convert_urls: false,
            setup: function (ed) {
                ed.onSaveContent.add(function (ed, o) {
                    var html = o.content;
                    html = html.replace(/(\.\.\/)+Utils\/ImageRedirect/g, '/Utils/ImageRedirect');
                    o.content = html;
                });
            },
            paste_auto_cleanup_on_paste: true
        }

        );
    }
}

//rejestrujemy klasę
Common_TinyMce.registerClass('Common_TinyMce', WSSCodeGuruBase);


