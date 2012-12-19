(function () {
    var Ext = window.Ext4 || window.Ext;

    /**
     * Team Member Model
     */
    Ext.define('Rally.team.data.model.TeamMember', {
        extend:'Ext.data.Model',
        fields:[
            'id',
            'userRef'
        ],
        belongsTo:'Rally.team.data.model.Team',
        hasOne:{
            associationKey:'jobRole',
            model:'Rally.team.data.model.JobRole',
            foreignKey:'jobRole'
        },
        isFieldVisible:function (field) {
            return true;
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