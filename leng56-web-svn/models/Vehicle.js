module.exports = function (sequelize, DataTypes) {
    var Vehicle = sequelize.define("vehicle", {
        'id': {
            type: DataTypes.UUID,
            field: 'id',
            defaultValue: DataTypes.UUIDV1,
            primaryKey: true
        },
        'ownerId': {
            type: DataTypes.UUID,
            allowNull: true,
            field: 'owner_id',
            comment: '车主ID,user.id:当车辆属于个人车主时;organization.id:当车辆属于机构时'
        },
        'ownerType': {
            type: DataTypes.STRING(30),
            allowNull: true,
            field: 'owner_type',
            comment: '车辆所属类型,OWNER:个人车主;ORGANIZATION:机构',
            defaultValue:'ORGANIZATION'
        },
        'driverId': {
            type: DataTypes.UUID,
            allowNull: true,
            field: 'driver_id',
            comment: '司机ID'
        },
        'phone': {
            type: DataTypes.STRING(20),
            allowNull: false,
            field: 'phone',
            comment: '随车手机'
        },
        'no': {
            type: DataTypes.STRING(20),
            allowNull: false,
            unique: true,
            field: 'no',
            comment: '车牌号'
        },
        'load': {
            type: DataTypes.FLOAT,
            allowNull: false,
            field: 'load',
            comment: '载重吨'
        },
        'type': {
            type: DataTypes.STRING(30),
            allowNull: false,
            field: 'type',
            comment: '车辆类型{REFRIGERATED:冷藏车,INSULATED:保温车}'
        },
        'length': {
            type: DataTypes.DECIMAL(3, 1),
            allowNull: false,
            field: 'length',
            comment: '长度 4.2米、5.2米、5.6米、6.8米、7.2米、7.6米、8.6米、9.6米、12.5米、13.7米、15米、16.5米、17米'
        },
        'img': {
            type: DataTypes.STRING,
            allowNull: true,
            field: 'img',
            comment: '车辆照片'
        },
        'boxBrand': {
            type: DataTypes.STRING(50),
            allowNull: false,
            field: 'box_brand',
            comment: '车厢品牌'
        },
        'refrigeratorBrand': {
            type: DataTypes.STRING(50),
            allowNull: false,
            field: 'refrigerator_brand',
            comment: '冷机品牌'
        },
        'lowestTemp': {
            type: DataTypes.FLOAT,
            allowNull: false,
            field: 'lowest_temp',
            comment: '最低制冷'
        },
        'highestTemp': {
            type: DataTypes.FLOAT,
            allowNull: false,
            field: 'highest_temp',
            comment: '最高制热'
        },
        'lines': {
            type: DataTypes.TEXT,
            allowNull: false,
            field: 'lines',
            comment: '优势线路'
        },
        'licenseAuth': {
            type: DataTypes.STRING(30),
            allowNull: false,
            defaultValue: 'UNCHECKED',
            field: 'license_auth',
            comment: '行驶证认证状态{UNCHECKED:正在审核,CHECK_PASS:通过,CHECK_REJECT:拒绝}'
        },
        'terminalTypeId': {
            type: DataTypes.UUID,
            allowNull: true,
            field: 'terminal_type_id',
            comment: '设备类型id'
        },
        'organizationId': {
            type: DataTypes.UUID,
            allowNull: true,
            field: 'organization_id',
            comment: '托管到的组织id'
        },
        'seatGroupId': {
            type: DataTypes.UUID,
            allowNull: true,
            field: 'seat_group_id',
            comment: '托管到的坐席组id'
        },
        'trustStatus': {
            type: DataTypes.STRING(30),
            allowNull: false,
            defaultValue: 'UNTRUST',
            field: 'trust_status',
            comment: '托管状态：UNTRUST 未托管，UNCHECKED托管等待，CHECK_PASS:已托管，CHECK_REJECT:托管拒绝'
        },
        'visibility': {
            type: DataTypes.STRING(30),
            allowNull: false,
            defaultValue: 'ALL',
            field: 'visibility',
            comment: '{PUBLIC:公众可见,UNION:联盟内可见,ALL:合伙人全部可见,PRIVATE:私有车辆}'
        },
        'dispatchCityId': {
            type: DataTypes.INTEGER(11),
            allowNull: true,
            field: 'dispatch_city_id',
            comment: '调度地，精确到市'
        },
        'dispatchTime': {
            type: DataTypes.DATE,
            allowNull: true,
            field: 'dispatch_time',
            comment: '调度时间'
        },
        'creatorId': {
            type: DataTypes.UUID,
            allowNull: false,
            field: 'creator_id',
            comment: '创建人ID'
        }
    }, {
        tableName: 'vehicle',
        timestamps: true,
        paranoid: true,
        createdAt: 'create_time',
        updatedAt: 'update_time',
        deletedAt: 'delete_time',
        comment: '车辆表',
        classMethods: {
            associate: function (models) {
                Vehicle.belongsTo(models.User, {as: 'owner'});

                Vehicle.belongsTo(models.User, {as: 'driver'});

                Vehicle.belongsTo(models.TerminalType, {as: 'terminalType'});

                Vehicle.belongsTo(models.Organization, {as: 'organization'});

                Vehicle.belongsTo(models.SeatGroup, {as: 'seatGroup'});

                Vehicle.belongsTo(models.City, {as: 'dispatchCity'});

                Vehicle.belongsTo(models.User, {as: 'creator'});

                Vehicle.hasOne(models.Waybill, {as: 'waybill'});
            }
        },
        instanceMethods: {}
    });

    return Vehicle;
};
