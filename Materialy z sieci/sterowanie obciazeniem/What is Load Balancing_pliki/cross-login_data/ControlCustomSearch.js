var ControlCustomSearch = Class.create({}, {

  load:function() {
    var tpl = this._serverData.tpl;
    var crossDomain = this._serverData.crossDomain;
    if (tpl == "sphinx3")
      $("#cse-search-box  input[type|=submit]").click(this.getHandler("search"));
    if(!crossDomain) {
      if(!$(".suggestDiv").length) {
    	  new SuggestBox('sHead');
      }
    }
    
    //dynamicaly adding script after onload 
    var s = document.createElement("script");
    s.type = "text/javascript";
    s.src = "http://www.google.com/cse/brand?form=cse-search-box&lang=en";
     $("#cse-search-box").after(s);
  },
  
  search: function(e) {
    var target = $("#cse-search-box  input[type|=text]")[0].value;
    target = target.replace(/(\s+)/g, "-");
    location="//s.wisegeek.com/s/"+target; 
    return false;
    
  }
  
}, [Control]);