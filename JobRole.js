(function () {
    var Ext = window.Ext4 || window.Ext;

    /**
     * Job Role Model
     */
    Ext.define('Rally.team.data.model.JobRole', {
        extend:'Ext.data.Model',
        proxy:new Rally.team.data.RallyServiceProxyConfig('http://localhost:8080/team-service/api/jobrole').getProxyConfig(),
        fields:[
            { name:'id', type:'string' },
            { name:'name', type:'string' }
        ]
    });
})();