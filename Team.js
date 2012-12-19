(function () {
    var Ext = window.Ext4 || window.Ext;

    /**
     * Team Model
     */
    Ext.define('Rally.team.data.model.Team', {
        extend:'Ext.data.Model',
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
