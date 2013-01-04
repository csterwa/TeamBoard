(function () {
    var Ext = window.Ext4 || window.Ext;

    /**
     * Team Model
     */
    Ext.define('Rally.team.data.model.Team', {
        extend:'Ext.data.Model',
        proxy:new Rally.team.data.RallyServiceProxyConfig('http://localhost:8080/team-service/api/team').getProxyConfig(),
        fields:[
            'id',
            'projectRef'
        ],
        hasMany:{
            name:'teamMembers',
            model:'Rally.team.data.model.TeamMember'
        }
    });
})();
