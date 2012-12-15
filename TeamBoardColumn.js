(function() {
    var Ext = window.Ext4 || window.Ext;

    Ext.define('Rally.app.teamboard.Column', {
        extend: 'Rally.ui.cardboard.Column',
        alias: 'widget.rallyteamcolumn',

        constructor: function(config){
            config = Ext.apply({
                displayValue: config.teamRecord.get('_refObjectName')
            }, config);

            this.callParent(arguments);
        },

        isMatchingRecord: function(record){
            return true;
        },

        _queryForData: function() {
            if(this.userModel){
                this._loadTeamMemberCards();
            }else{
                Rally.data.ModelFactory.getModel({
                    type: 'User',
                    success: this._onUserModelLoaded,
                    scope: this
                });
            }
        },

        _onUserModelLoaded: function(model){
            this.userModel = model;

            this._loadTeamMemberCards();
        },

        _loadTeamMemberCards: function(){
            var userRecords = Ext.Array.map(this.teamRecord.get('TeamMembers'), function(user){
                return new this.userModel(user);
            }, this);
            this.createAndAddCards(userRecords);
        }
    });
})();
