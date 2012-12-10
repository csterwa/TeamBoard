Ext.define('TeamBoard', {
    extend:'Ext.container.Container',
    alias:'widget.teamboard',
    layout:'hbox',

    enforceMinimums:true,

    initComponent:function () {
        this.items = [];

        Ext.Array.each(this.teams, function (team) {
            var people = [];

            this._addRole(people, team, 'po');
            this._addRole(people, team, 'qa');
            this._addRole(people, team, 'lead');
            this._addRole(people, team, 'dev');

            this.items.push({
                ui:'none',
                cls:'team',
                xtype:'panel',
                title:team.name,
                flex:1,
                items:people
            });
        }, this);

        this.callParent();
    },

    _addRole:function (items, team, type) {
        var people = [];

        Ext.Array.each(team[type], function (person) {
            if (!(person instanceof TeamOpening) && person.xtype !== 'teamopening') {
                person = new Person(person, type);
            }
            people.push(person);
        }, this);

        if (this.enforceMinimums) {
            var minimums = {
                po:1,
                qa:1,
                lead:1
            };
            if (minimums[type]) {
                while (minimums[type] > people.length) {
                    people.push({
                        xtype:'placeholder'
                    });
                }
            }
        }

        Ext.Array.each(people, function (person) {
            items.push(person);
        });
    }
});