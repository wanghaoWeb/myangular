module.exports = function (sequelize, DataTypes) {
    var TaskUnloadingInfo = sequelize.define("taskUnloadingInfo",{
        id:{
            type: DataTypes.UUID,
            field: 'id',
            primaryKey: true,
            defaultValue: DataTypes.UUIDV1,
            comment: 'ID'
        },
        taskId:{
            type: DataTypes.UUID,
            allowNull: false,
            field: 'task_id',
            comment: '货单id'
        },
        amount:{
            type: DataTypes.FLOAT,
            allowNull: false,
            field: 'amount',
            comment: '卸货量'
        },
        amountUnit:{
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'amount_unit',
            comment: '卸货单位'
        },
        loaded: {
            type: DataTypes.FLOAT,
            allowNull: false,
            field: 'loaded',
            defaultValue: 0,
            comment: '已装货量,冗余字段,根据装货量计算'
        },
        regionId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            field: 'region_id',
            comment: '区县id'
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'address',
            comment: '地址'
        },
        linkman: {
            type: DataTypes.STRING(30),
            allowNull: false,
            field: 'linkman',
            comment: '联系人'
        },
        phone: {
            type: DataTypes.STRING(30),
            allowNull: false,
            field: 'phone',
            comment: '联系电话'
        },
        unloadingTime: {
            type: DataTypes.DATE,
            allowNull: false,
            field: 'unloading_time',
            comment: '卸货时间'
        }
    },{
        tableName:'task_unloading_info',
        comment: '货单卸货表',
        timestamps: false,
        classMethods: {
            associate: function (models) {
                TaskUnloadingInfo.belongsTo(models.Task, {as: 'task'});

                TaskUnloadingInfo.belongsTo(models.Region, {as: 'region'});
            }
        },
        instanceMethods: {}
    });

    return TaskUnloadingInfo;
};
