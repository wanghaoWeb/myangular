module.exports = function (sequelize, DataTypes) {
    var UserMaterial = sequelize.define("userMaterial", {
        'id': {
            type: DataTypes.UUID,
            field: 'id',
            defaultValue: DataTypes.UUIDV1,
            primaryKey: true
        },
        'userId': {
            type: DataTypes.UUID,
            field: 'user_id'
        },
        'materialId': {
            type: DataTypes.UUID,
            field: 'material_id'
        },
        'content': {
            type: DataTypes.STRING,
            field: 'content'
        },
        'platformChecked': {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'platform_checked',
            comment: '是否平台已经审核'
        },
        'managerChecked': {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'manager_checked',
            comment: '是否企业管理员已经审核'
        },
        'status': {
            type: DataTypes.STRING,
            field: 'status'
        },
        'createTime': {
            type: DataTypes.DATE,
            field: 'create_time'
        },
        'desc': {
            type: DataTypes.STRING,
            field: 'desc'
        },
        'platformCheckDesc': {
            type: DataTypes.STRING,
            field: 'platform_check_desc'
        },
        'managerCheckDesc': {
            type: DataTypes.STRING,
            field: 'manager_check_desc'
        }

    }, {
        tableName: 'user_material',
        timestamps: false,
        classMethods: {
            associate: function (models) {
                UserMaterial.belongsTo(models.User, {as: 'user'});

                UserMaterial.belongsTo(models.Material, {as: 'material'});

                UserMaterial.hasMany(models.UserMaterialParams, {as: 'params'});
            }
        }

    });

    return UserMaterial;
};
