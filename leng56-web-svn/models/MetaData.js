module.exports = function (sequelize, DataTypes) {
    var MetaData = sequelize.define("metaData", {
        id: {
            type: DataTypes.INTEGER,
            field: "id",
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING(255),
            field: "name",
            allowNull: false
        },
        value: {
            type: DataTypes.STRING(255),
            field: "value",
            allowNull: false
        },
        seq: {
            type: DataTypes.INTEGER,
            field: "seq",
            allowNull: true,
            defaultValue: 1
        },
        typeCode: {
            type: DataTypes.STRING(30),
            field: "type_code",
            allowNull: false
        }
    }, {
        tableName: "meta_data",
        comment: '元数据表',
        timestamps: true,
        paranoid: true,
        createdAt: 'create_time',
        updatedAt: 'update_time',
        deletedAt: 'delete_time',
        classMethods: {
            associate: function (models) {
                MetaData.belongsTo(models.MetaDataType, {as: 'metaDataType', foreignKey: 'typeCode'});
            }
        },
        instanceMethods: {}
    });

    return MetaData;
};




