//Konstruktor klasy
Controls_Forum_ForumBox = function (aSoonThreads, aUserPosts, ctrlForumBoxDivTrhreads, ctrlForumBoxDivPosts, hlRssThreads, hlRssPosts) {
    Controls_Forum_SlideMenu.initializeBase(this);

    this._aSoonThreads = "#" + aSoonThreads;
    this._aUserPosts = "#" + aUserPosts;
    this._ctrlForumBoxDivTrhreads = "#" + ctrlForumBoxDivTrhreads;
    this._ctrlForumBoxDivPosts = "#" + ctrlForumBoxDivPosts;
    this._hlRssThreads = "#" + hlRssThreads;
    this._hlRssPosts = "#" + hlRssPosts;

 
}

Controls_Forum_ForumBox.prototype = {

    SwitchView: function (threads) {
        if (threads == true) {
            $(this._aSoonThreads).addClass("active");
            $(this._aUserPosts).removeClass("active");
            $(this._ctrlForumBoxDivTrhreads).show();
            $(this._ctrlForumBoxDivPosts).hide();
            $(this._hlRssThreads).show();
            $(this._hlRssPosts).hide();
        }
        else {
            $(this._aSoonThreads).removeClass("active");
            $(this._aUserPosts).addClass("active");
            $(this._ctrlForumBoxDivTrhreads).hide();
            $(this._ctrlForumBoxDivPosts).show();
            $(this._hlRssThreads).hide();
            $(this._hlRssPosts).show();
        }
    }
}

//rejestrujemy kontrolke
Controls_Forum_ForumBox.registerClass('Controls_Forum_ForumBox', WSSCodeGuruBase);