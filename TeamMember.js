(function () {
    var Ext = window.Ext4 || window.Ext;

    /**
     * Team Member Model
     */
    Ext.define('Rally.team.data.model.TeamMember', {
        extend:'Ext.data.Model',
        proxy:new Rally.team.data.RallyServiceProxyConfig('http://localhost:8080/team-service/api/teammember').getProxyConfig(),
        fields:[
            'id',
            'userRef',
            'jobRoleId'
        ],
        belongsTo:'Rally.team.data.model.Team',
        isFieldVisible:function (field) {
            return false;
        },
        isCustomField:function (field) {
            return false;
        },
        getField:function(fieldName) {
            if (this.fields.contains(fieldName)) {
                return null;
            } else {
                return this.fields.get(fieldName);
            }
        }
    });
})();