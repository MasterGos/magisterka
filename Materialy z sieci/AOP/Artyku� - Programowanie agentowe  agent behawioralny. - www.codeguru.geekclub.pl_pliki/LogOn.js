LogOn = function (params) {
    this.params = params;
    LogOn.initializeBase(this);
}
LogOn.prototype = {
    RenderLoginButtons: function (json) {
        var identityProviders = json;
        if (identityProviders.length == 0) {
            alert("Error: No identity providers are associated with this application.");
        }
        document.getElementById(this.params.identityProvidersListContainer).innerHTML = "";
        for (var i in identityProviders) {
            var identityProvider = identityProviders[i];
            var idpList = document.getElementById(this.params.identityProvidersListContainer);
            var button = document.createElement("button");

            if (identityProvider.Name == "Windows Live™ ID") {
                identityProvider.Name = "Microsoft Account";
            }

            button.setAttribute("name", identityProvider.Name);
            button.setAttribute("id", identityProvider.LoginUrl);
            button.className = this.params.buttonCssClass;
            button.onclick = IdentityProviderButtonClicked;
            button.appendChild(document.createTextNode(identityProvider.Name));
            idpList.appendChild(button);
        }
    }
}

LogOn.registerClass('LogOn', WSSCodeGuruBase);