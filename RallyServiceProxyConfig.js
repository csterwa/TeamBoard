(function () {
    var Ext = window.Ext4 || window.Ext;

    /**
     * Orca.planning.data.PlanningServiceProxyConfig
     */
    Ext.define('Rally.team.data.RallyServiceProxyConfig', {

        constructor: function(url) {
            this.config = {
                type:'jsonp',
                callbackKey:'jsonp',
                url:url,
                reader:{
                    type:'json',
                    root:'data.results'
                },
                writer:{
                    type:'json',
                    root:'data'
                }
            };
        },

        getProxyConfig: function() {
            return this.config;
        }

    });

})();