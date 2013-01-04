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
                load:this._loadTeamBoard,
                scope:this
            }
        });
    },

    _loadTeamBoard:function (teams) {
        this.teamBoard = Ext.create('Rally.ui.cardboard.CardBoard', {
            cardConfig:{
                fields:['EmailAddress', 'FirstName', 'LastName', 'UserName'],
                plugins:[
                    {ptype:'rallycardcontent'}
                ]
            },
            maskMsg: 'Loading Team Member Data...',
            maskTarget: this,
            columns:this._getColumns(teams),
            enableRanking:false,
            types:['User']
        });

        this.add(this.teamBoard);
    },

    _getColumns:function (teams) {
        var columns = [];
        teams.each(function (team) {
            columns.push({
                xtype:'rallyteamcolumn',
                teamRecord:team
            });
        });
        return columns;
    },

});