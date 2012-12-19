Ext.define('Rally.app.teamboard.App', {
    extend:'Rally.app.App',

    launch:function () {
        this.teamStore = Ext.create('Ext.data.Store', {
            model:Rally.team.data.model.Team,
            proxy:{
                type:'jsonp',
                url:'http://localhost:8080/team-service/api/team',
                callbackKey:'jsonp',
                reader:{
                    type:'json',
                    root:'data.results'
                }
            },
            autoLoad:true,
            listeners:{
                load:function (teams) {
                    this.add({
                        xtype:'rallycardboard',
                        cardConfig:{
                            xtype:"rallyteamcard",
                            fields:['userRef']
                        },
                        context:this.getContext(),
                        columns:this._getColumns(teams),
                        enableRanking:false,
                        listeners:{
                            load:this._publishContentUpdated,
                            toggle:this._publishContentUpdated,
                            recordupdate:this._publishContentUpdatedNoDashboardLayout,
                            recordcreate:this._publishContentUpdatedNoDashboardLayout,
                            scope:this
                        }
                    });
                },
                scope:this
            }
        });
    },

    _getColumns:function (teams) {
        var columns = [];
        teams.each(function (team) {
            columns.push({
                xtype:'rallyteamcolumn',
                teamRecord:team
            });
        });
        return columns
    },

    _publishContentUpdated:function () {
        this.fireEvent('contentupdated');
    },

    _publishContentUpdatedNoDashboardLayout:function () {
        this.fireEvent('contentupdated', {dashboardLayout:false});
    }
});