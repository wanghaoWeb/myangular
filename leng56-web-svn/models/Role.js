module.exports = function (sequelize, DataTypes) {
    var Role = sequelize.define("role", {
        'id': {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV1,
            field: 'id',
            primaryKey: true,
            comment: '角色ID'
        },
        'name': {
            type: DataTypes.STRING,
            field: 'name',
            allowNull: false,
            unique: true,
            comment: '角色名'
        },
        'desc': {
            type: DataTypes.STRING,
            field: 'desc',
            allowNull: true,
            comment: '描述'
        }
    }, {
        tableName: 'role',
        timestamps: true,
        paranoid: true,
        createdAt: 'create_time',
        updatedAt: 'update_time',
        deletedAt: 'delete_time',
        comment: '角色表',
        classMethods: {
            associate: function (models) {
                Role.belongsToMany(models.User, {
                    as: 'users',
                    through: models.UserRole
                });

                Role.belongsToMany(models.Module, {
                    as: 'modules',
                    through: models.RoleModule
                });
            }
        },
        instanceMethods: {
            apiData: function (api) {
                return {
                    id: this.id,
                    name: this.name,
                    desc: this.desc,
                    roles:this.roles,
                    params:this.params,
                    modules:this.modules
                };
            }
        }

    });

    return Role;
};
