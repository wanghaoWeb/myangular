module.exports = function (sequelize, DataTypes) {

    var RoleAssign = sequelize.define("roleAssign", {
        roleId: {
            type: DataTypes.UUID,
            field: 'role_id',
            primaryKey: true
        },
        assignRoleId: {
            type: DataTypes.UUID,
            field: 'assign_role_id',
            primaryKey: true
        }
    }, {
        tableName: 'role_assign',
        timestamps: false,
        classMethods: {
            associate: function (models) {
                RoleAssign.belongsTo(models.Role, {as: 'role'});

                RoleAssign.belongsTo(models.Role, {as: 'assignRole'});
            }
        },
        instanceMethods: {}
    });

    return RoleAssign;
};
