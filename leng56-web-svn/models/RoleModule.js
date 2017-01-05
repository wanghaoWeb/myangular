module.exports = function(sequelize,DataTypes){
    return sequelize.define("roleModule",{
        'id':{
            type:DataTypes.UUID,
            field:'id',
            defaultValue: DataTypes.UUIDV1,
            primaryKey:true
        },
        'moduleId': {
            type:DataTypes.UUID,
            field:'module_id'
        },
        'roleId': {
            type:DataTypes.UUID,
            field:'role_id'
        }
    },{
        tableName:'role_module',
        timestamps: false,
        classMethods: {
            associate: function (models) {

            }
        },
        instanceMethods: {
            apiData: function (api) {
                return {
                    id: this.id,
                    ro: this.materialId,
                    moduleId:this.moduleId
                };
            }
        }
    });
};
