module.exports = function (sequelize, DataTypes) {
    var MaterialParams = sequelize.define("materialParams", {
        'id': {
            type: DataTypes.UUID,
            field: 'id',
            defaultValue: DataTypes.UUIDV1,
            primaryKey: true,
            comment: '材料元数据ID'
        },
        'name': {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'name',
            unique: false,
            comment: '材料名称'
        },
        'title': {
            type: DataTypes.STRING,
            field: 'title'
        },
        'type': {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'type',
            comment: '参数类型'
        },
        'seq': {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'seq',
            defaultValue: 0
        },
        'desc': {
            type: DataTypes.STRING,
            field: 'desc',
            comment: '描述'
        },
        'materialId': {
            type: DataTypes.UUID,
            field: 'material_id'
        }
    }, {
        tableName: 'material_params',
        timestamps: false,
        indexes: [
            {
                unique: true,
                fields: ['material_id', 'name']
            }
        ],
        classMethods: {
            associate: function (models) {
                MaterialParams.belongsTo(models.Material, {as: 'material'});
            }
        }
    });

    return MaterialParams;
};
