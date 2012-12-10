Ext.define('CustomApp', {
    extend:'Rally.app.App',
    componentCls:'app',

    items:[
        {
            xtype:'teamboard',
            teams:[
                {
                    name:'Team 1',
                    po:['Wong fe Hung'],
                    qa:['Jimmy'],
                    lead:['Billy'],
                    dev:['Thing 1', 'Thing 2']
                }
            ]
        },
        {
            xtype:'teamboard',
            width:300,
            enforceMinimums:false,
            teams:[
                {
                    name:'Team Rotations',
                    qa:[],
                    dev:[
                        { xtype:'person', name:'Chupacabra', notes:'Intern' }
                    ]
                },
                {
                    name:'New Hires',
                    dev:['Nova Jones']
                }
            ]
        }
    ]

});