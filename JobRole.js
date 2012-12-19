(function () {
    var Ext = window.Ext4 || window.Ext;

    /**
     * Job Role Model
     */
    Ext.define('Rally.team.data.model.JobRole', {
        extend:'Ext.data.Model',
        fields:[
            { name:'id', type:'string' },
            { name:'name', type:'string' }
        ]
    });
})();