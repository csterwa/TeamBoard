var Ext = window.Ext4 || window.Ext;

Ext.define('Rally.app.teamboard.TeamBoardColumn', {
    extend:'Rally.ui.cardboard.Column',
    alias:'widget.rallyteamcolumn',

    constructor:function (config) {
        config = Ext.apply({
            displayValue:config.teamRecord.get('projectRef')
        }, config);

        this.callParent(arguments);
    },

    isMatchingRecord:function (record) {
        return true;
    },

    _queryForData:function () {
        var cards = [];
        var teamMemberStore = this.teamRecord.teamMembers();
        teamMemberStore.each(function (teamMember) {
            cards.push(teamMember)
        }, this);
        this.createAndAddCards(cards);
    }

});
