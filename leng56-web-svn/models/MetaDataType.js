module.exports = function (sequelize, DataTypes) {
    var MetaDataType = sequelize.define("metaDataType", {
        code: {
            type: DataTypes.STRING(30),
            field: "code",
            primaryKey: true,
            validate: {
                len: [1, 30]
            },
            comment: '类型代码'
        },
        name: {
            type: DataTypes.STRING(30),
            field: "name",
            allowNull: false,
            unique: true,
            validate: {
                len: [1, 30]
            },
            comment: '类型名称'
        },
        remark: {
            type: DataTypes.STRING(255),
            field: "remark",
            allowNull: true,
            comment: '备注'
        }
    }, {
        tableName: "meta_data_type",
        comment: '元数据类型表',
        timestamps: true,
        paranoid: true,
        createdAt: 'create_time',
        updatedAt: 'update_time',
        deletedAt: 'delete_time',
        classMethods: {
            associate: function (models) {

            }
        },
        instanceMethods: {}
    });

    return MetaDataType;
};

