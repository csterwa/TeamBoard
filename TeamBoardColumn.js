var Ext = window.Ext4 || window.Ext;

Ext.define('Rally.app.teamboard.TeamBoardColumn', {
    extend:'Rally.ui.cardboard.Column',
    alias:'widget.rallyteamcolumn',

    constructor:function (config) {
        this.projectModel = Rally.data.ModelFactory.getModel({
            type: 'Project',
            success: function(model) {
                var oid = Rally.util.Ref.getOidFromRef(config.teamRecord.get('projectRef'));
                model.load(oid, {
                    success: function(record) {
                        config = Ext.apply({
                            displayValue: record.get('Name')
                        }, config);
                        this.refresh(config);
                    },
                    failure: function() {
                        //if the project doesn't exist or we don't have access to it.
                        //let our owner handle the error situation.
                        this.fireEvent('invalidvalue');
                    },
                    fetch: ['Name', 'Workspace'],
                    scope: this
                });

            },
            scope: this
        });

        this.callParent(arguments);
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
                    model.load(oid, {
                        success: function(record) {
                            this.createAndAddCard(record);
                        },
                        failure: function() {
                            //if the project doesn't exist or we don't have access to it.
                            //let our owner handle the error situation.
                            this.fireEvent('invalidvalue');
                        },
                        fetch: ['EmailAddress', 'FirstName', 'LastName', 'UserName'],
                        scope: this
                    });

                },
                scope: this
            });
        }, this);
    }

});
