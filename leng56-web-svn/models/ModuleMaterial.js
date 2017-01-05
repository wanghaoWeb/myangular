
module.exports = function(sequelize,DataTypes){
	var ModuleMaterial = sequelize.define("moduleMaterial",{
		'id':{
			type:DataTypes.UUID,
			field:'id',
			defaultValue: DataTypes.UUIDV1,
			primaryKey:true
		},
        'materialId': {
            type:DataTypes.UUID,
            field: 'material_id'
        },
        'moduleId': {
            type:DataTypes.UUID,
            field: 'module_id'
        }
	},{
		tableName:'module_material',
		timestamps: false,
        classMethods: {
            associate: function (models) {

            }
        },
        instanceMethods: {
            apiData: function (api) {
                return {
                    id: this.id,
                    materialId: this.materialId,
                    moduleId:this.moduleId
                };
            }
        }
	});

    return ModuleMaterial;
};
