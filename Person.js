Ext.define('Person', {
    extend:'Ext.Component',
    alias:'widget.person',
    componentCls:'person',
    renderTpl:['<div>{name}</div>',
        '<tpl if="notes">',
        '<div class="notes">{notes}</div>',
        '</tpl>'],

    constructor:function (config, role) {
        if (Ext.isString(config)) {
            config = {
                name:config
            };
        }
        config.role = role;

        Ext.apply(this, config);

        this.callParent();
    },

    initComponent:function () {
        this.cls = [this.cls || '', this.role].join(' ');
        this.renderData = this;
        this.callParent();
    }
});