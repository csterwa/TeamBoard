var Ext = window.Ext4 || window.Ext;

Ext.define('Rally.app.teamboard.TeamBoardCard', {
    extend:'Rally.ui.cardboard.Card',
    alias:'widget.rallyteamcard',

    constructor:function (config) {
        this.callParent(arguments);
    },

    isBlocked:function() {
        return false;
    },

    isReady:function() {
        return false;
    }

});
