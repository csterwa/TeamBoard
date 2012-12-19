(function () {
    var Ext = window.Ext4 || window.Ext;

    /**
     * Orca.planning.data.PlanningServiceProxyConfig
     */
    Ext.define('Rally.team.data.RallyServiceProxyConfig', {
        type:'jsonp',
        url:'http://localhost:8080/team-service/api/team',
        callbackKey:'jsonp',
        reader:{
            type:'json',
            root:'data.results'
        }
    });

})();