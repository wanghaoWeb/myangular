module.exports = function (sequelize, DataTypes) {
    var Task = sequelize.define("task", {
        id: {
            type: DataTypes.UUID,
            field: 'id',
            primaryKey: true,
            defaultValue: DataTypes.UUIDV1,
            comment: 'ID'
        },
        code: {
            type: DataTypes.STRING(30),
            field: 'code',
            //allowNull: false,
            comment: '货单代码'
        },
        sourceType: {
            type: DataTypes.INTEGER,
            field: 'source_type',
            allowNull: false,
            comment: '任务单类型{物流企业调度；平台管理员；运输企业调度TRANSPORT_DISPATCHER；公众；第三方}'
        },
        ownerOrganizationId: {
            type: DataTypes.UUID,
            field: 'owner_organization_id',
            comment: '发货企业的ID'
        },
        ownerUserId: {
            type: DataTypes.UUID,
            field: 'owner_user_id',
            comment: '发货企业用户的ID'
        },
        customerId:{
            type: DataTypes.UUID,
            field:'customer_id',
            comment: '发货客户id'
        },
        linkman: {
            type: DataTypes.STRING,
            field: 'linkman',
            comment: '联系人'
        },
        phone: {
            type: DataTypes.STRING,
            field: 'phone',
            comment: '联系电话'
        },
        name: {
            type: DataTypes.STRING,
            field: 'name',
            comment: '货名'
        },
        amount:{
            type: DataTypes.FLOAT,
            allowNull: false,
            field: 'amount',
            defaultValue: 0,
            comment: '装货量,冗余字段,根据装货量计算'
        },
        amountUnit:{
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'amount_unit',
            defaultValue: 0,
            comment: '装货单位,冗余字段'
        },
        loaded: {
            type: DataTypes.FLOAT,
            allowNull: false,
            field: 'loaded',
            defaultValue: 0,
            comment: '已装货量,冗余字段,根据装货量计算'
        },
        worth: {
            type: DataTypes.FLOAT,
            field: 'worth',
            comment: '货值'
        },
        worthUnit: {
            type: DataTypes.STRING(30),
            field: 'worth_unit',
            defaultValue: 'Y',
            comment: '货值单位,{Y: 元; WY: 万元}'
        },
        pricing: {
            type: DataTypes.DECIMAL(11, 2),
            field: 'pricing',
            defaultValue: 0,
            comment: '发货价'
        },
        package: {
            type: DataTypes.STRING(30),
            field: 'package',
            comment: '包装{UNKNOWN:未知,BOX:箱装,BAG:袋装,BULK:散装}'
        },
        tempCtrlType: {
            type: DataTypes.STRING(30),
            field: 'temp_ctrl_type',
            comment: '温控类型{FREEZE:冷冻,REFRIGERATION:冷藏}'
        },
        loadingCityId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'loading_city_id',
            comment: '装货城市id'
        },
        unloadingCityId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'unloading_city_id',
            comment: '卸货城市id'
        },
        lowestTemp: {
            type: DataTypes.FLOAT,
            field: 'lowest_temp',
            comment: '最低温'
        },
        highestTemp: {
            type: DataTypes.FLOAT,
            field: 'highest_temp',
            comment: '最高温'
        },
        status: {
            type: DataTypes.STRING(30),
            field: 'status',
            comment: '任务单状态{RECEIVED: 已经接收; NO_OFFER:未报价,OFFERED:已报价,REJECT:已拒绝,PASS:已接受,INVALID:已失效}'
        },
        organizationId: {
            type: DataTypes.UUID,
            field: 'organization_id',
            comment: '承接机构id'
        },
        seatGroupId: {
            type: DataTypes.UUID,
            field: 'seat_group_id',
            comment: '承接坐席组id'
        },
        creatorId: {
            type: DataTypes.UUID,
            field: 'creator_id',
            comment: '创建人ID'
        },
        remark: {
            type: DataTypes.STRING,
            field: 'remark',
            comment: '备注'
        }
    }, {
        tableName: 'task',
        timestamps: true,
        paranoid: true,
        createdAt: 'create_time',
        updatedAt: 'update_time',
        deletedAt: 'delete_time',
        classMethods: {
            associate: function (models) {
                Task.belongsTo(models.Organization, {as: 'ownerOrganization'});

                Task.belongsTo(models.User, {as: 'ownerUser'});

                Task.belongsTo(models.Organization, {as: 'organization'});

                Task.belongsTo(models.SeatGroup, {as: 'seatGroup'});

                Task.belongsTo(models.User, {as: 'creator'});

                Task.belongsTo(models.Customer, {as: 'customer'});

                Task.hasMany(models.TaskLoadingInfo, {as: 'loadingInfos'});

                Task.hasMany(models.TaskUnloadingInfo, {as: 'unloadingInfos'});
            }
        },
        instanceMethods: {}
    });

    return Task;
};
