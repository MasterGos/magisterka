var PageLogin = Class.create({
	onLogin: function()
	{
		Page.getInstance().onLogin();
	}
},{

	init: function()
	{
		if(this._serverData['makeCrossLogin'])
			top.location.reload();
	},

	load: function()
	{
		this.loggedIn = this._serverData['isFacebookUser'];
		//FB.init(this._serverData['api_key'], this._serverData['xd_url']);
		//FB.ensureInit(this.getHandler('onEnsureInitResponce'));
	},

	onEnsureInitResponce: function()
	{
		FB.Connect.get_status().waitUntilReady(this.getHandler('onWaitUntilReadyResponce'));
	},

	onWaitUntilReadyResponce: function(status)
	{
		var that = this;
		setTimeout(function(){
			status = FB.Connect.get_status().result;
			if (	((status === FB.ConnectState.connected) && !that.loggedIn) ||
						((status === FB.ConnectState.appNotAuthorized || status === FB.ConnectState.userNotLoggedIn) && that.loggedIn)
					)
			{
				that.onConnectionStateChanged();
			}
		},1000);
	},

	onConnectionStateChanged: function()
	{
		window.location.reload();
	},

	onLogin: function()
	{
		var data = {};
		data[this._serverData._actions['createFacebookAccount']] = true;
		$.post(window.location.href, data, function(){ window.location.reload(); });
	}

},[Page]);