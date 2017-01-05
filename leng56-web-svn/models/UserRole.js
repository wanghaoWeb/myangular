module.exports = function(sequelize,DataTypes){
    var UserRole= sequelize.define("userRole",{
        'id':{
            type:DataTypes.UUID,
            field:'id',
            defaultValue: DataTypes.UUIDV1,
            primaryKey:true
        },
        'userId': {
            type:DataTypes.UUID,
            field:'user_id',
            allowNull: false
        },
        'roleId': {
            type:DataTypes.UUID,
            allowNull: false,
            field:'role_id'
        }
    },{
        tableName:'user_role',
        timestamps: false,
        classMethods: {
            associate: function (models) {
                UserRole.belongsTo(models.User, {
                    as: 'user'
                });

                UserRole.belongsTo(models.Role, {
                    as: 'role'
                });
            }
        },
        instanceMethods: {
            apiData: function (api) {
                return {
                    id: this.id,
                    ro: this.roleId,
                    userId:this.userId
                };
            }
        }
    });


    return UserRole;
};
