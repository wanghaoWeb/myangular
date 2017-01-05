module.exports = function(sequelize, DataTypes){
	var UserModule = sequelize.define("userModule",{
		'id':{
			type:DataTypes.UUID,
			field:'id',
			defaultValue: DataTypes.UUIDV1,
			primaryKey:true,
            commit: '用户服务Id'
		},
        'userId': {
            type: DataTypes.UUID,
            allowNull: false,
            field: 'user_id'
        },
        'moduleId': {
            type: DataTypes.UUID,
            allowNull: false,
            field: 'module_id'
        },
        'seq': {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'seq',
            defaultValue: 0
        },
		'addTime':{
			type:DataTypes.DATE,
            allowNull: true,
			field:'add_time'
		},
		'startTime':{
			type:DataTypes.DATE,
            allowNull: true,
			field:'start_time'
		}
	},{
		tableName:'user_module',
		timestamps: false,
        classMethods: {
            associate: function (models) {
                /*UserModule.belongsTo(models.User, {
                    as: 'user'
                });

                UserModule.belongsTo(models.Module, {
                    as: 'module'
                });*/
            }
        }

	});

    return UserModule;
};
