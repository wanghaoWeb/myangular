
module.exports = function(sequelize,DataTypes){
	var UserMaterialParams = sequelize.define("userMaterialParams",{
		'id':{
			type:DataTypes.UUID,
			field:'id',
			defaultValue: DataTypes.UUIDV1,
			primaryKey:true
		},
        'userMaterialId': {
            type:DataTypes.UUID,
            field: 'user_material_id'
        },
        'materialParamsId': {
            type:DataTypes.UUID,
            field: 'material_params_id'
        },
		'content':{
			type:DataTypes.STRING,
			field:'content'
		}
	},{
		tableName:'user_material_params',
		timestamps: false,
        classMethods: {
            associate: function (models) {
                UserMaterialParams.belongsTo(models.UserMaterial, { as: 'userMaterial'});

                UserMaterialParams.belongsTo(models.MaterialParams, {
                    as: 'param', foreignKey: {
                        name: 'materialParamsId'
                    }
                });
            }
        }

	});

    return UserMaterialParams;
};
