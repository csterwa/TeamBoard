Ext.define('Rally.app.teamboard.App', {
    extend:'Rally.app.App',

    statics:{
        CARD_FIELDS:['FirstName', 'LastName']
    },

    launch:function () {
        Ext.create('Rally.data.WsapiDataStore', {
            model:'Project',
            fetch:Ext.Array.merge(['TeamMembers'], this.self.CARD_FIELDS),
            filters:[
                Rally.data.QueryFilter.or([
                    {
                        property:'Name',
                        operator:'=',
                        value:'Mr. Rogers'
                    },
                    {
                        property:'Name',
                        operator:'=',
                        value:'Sample Project'
                    }
                ])
            ],
            autoLoad:true,
            listeners:{
                load:this._onTeamsLoaded,
                scope:this
            },
            context:this.getContext().getDataContext(),
            limit:Infinity
        });
    },

    _onTeamsLoaded:function (teams) {
        this.add({
            xtype:'rallycardboard',
            cardConfig:{
                fields:this.self.CARD_FIELDS,
                plugins:[
                    {ptype:'rallycardcontent'}
                ]
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
            },
            types:['User']
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