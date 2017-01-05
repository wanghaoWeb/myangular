module.exports = function (sequelize, DataTypes) {
    var VehicleDrivingLicense = sequelize.define("vehicleDrivingLicense", {
        id: {
            type: DataTypes.UUID,
            field: 'id',
            defaultValue: DataTypes.UUIDV1,
            primaryKey: true,
            comment: 'ID'
        },
        vehicleId: {
            type: DataTypes.UUID,
            allowNull: false,
            field: 'vehicle_id',
            comment: '对车辆的引用'
        },
        frontImg: {
            type: DataTypes.STRING,
            field: 'front_img',
            comment: '车辆正面照片'
        },
        sideImg: {
            type: DataTypes.STRING,
            field: 'side_img',
            comment: '车辆侧面照片'
        },
        licenseImg: {
            type: DataTypes.STRING,
            field: 'license_img',
            comment: '行驶证图片'
        },
        status: {
            type: DataTypes.STRING(30),
            field: 'status',
            allowNull: false,
            defaultValue: 'UNCHECKED',
            comment: '状态{UNCHECKED:正在审核,CHECK_PASS:通过,CHECK_REJECT:拒绝}'
        },
        current: {
            type: DataTypes.INTEGER,
            field: 'current',
            allowNull: false,
            defaultValue: 1,
            comment: '是否是最近的一条申请记录{0:不是，1:是}'
        },
        statusDescription: {
            type: DataTypes.STRING,
            field: 'status_description',
            comment: '拒绝描述'
        }
    }, {
        tableName: 'vehicle_driving_license',
        timestamps: true,
        createdAt: 'create_time',
        updatedAt: 'update_time',
        classMethods: {
            associate: function (models) {
                VehicleDrivingLicense.belongsTo(models.Vehicle, {as: 'vehicle'});
            }
        },
        instanceMethods: {}
    });

    return VehicleDrivingLicense;
};

