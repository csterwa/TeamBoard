var Ext = window.Ext4 || window.Ext;

Ext.define('Rally.app.teamboard.TeamBoardColumn', {
    extend:'Rally.ui.cardboard.Column',
    alias:'widget.rallyteamcolumn',

    constructor:function (config) {
        Rally.data.ModelFactory.getModel({
            type: 'Project',
            success: function(model) {
                var oid = Rally.util.Ref.getOidFromRef(config.teamRecord.get('projectRef'));
                this._addColumnDisplayHeader(model, oid, config);
            },
            scope: this
        });

        this.callParent(arguments);
    },

    _addColumnDisplayHeader:function (model, oid, config) {
        model.load(oid, {
            success:function (record) {
                config = Ext.apply({
                    displayValue:record.get('Name')
                }, config);
                this.refresh(config);
            },
            failure:function () {
                //if the project doesn't exist or we don't have access to it.
                //let our owner handle the error situation.
                this.fireEvent('invalidvalue');
            },
            fetch:['Name', 'Workspace'],
            scope:this
        });
    },

    isMatchingRecord:function (record) {
        return true;
    },

    _queryForData:function () {
        var teamMemberStore = this.teamRecord.teamMembers();
        teamMemberStore.each(function (teamMember) {
            Rally.data.ModelFactory.getModel({
                type: 'User',
                success: function(model) {
                    var oid = Rally.util.Ref.getOidFromRef(teamMember.get('userRef'));
                    this._addTeamMemberCard(model, oid, teamMember);
                },
                scope: this
            });
        }, this);
    },

    _addTeamMemberCard:function (model, oid, teamMember) {
        model.load(oid, {
            success:function (record) {
                this.createAndAddCard(record);
                var card = this.getCard(record);
            },
            failure:function () {
                //if the project doesn't exist or we don't have access to it.
                //let our owner handle the error situation.
                this.fireEvent('invalidvalue');
            },
            fetch:['DisplayName', 'EmailAddress', 'FirstName', 'LastName', 'UserName'],
            scope:this
        });
    },

});
