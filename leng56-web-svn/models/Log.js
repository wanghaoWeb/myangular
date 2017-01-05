
module.exports = function(sequelize,DataTypes){
	return sequelize.define("log",{
		'id':{
			type:DataTypes.UUID,
			field:'id',
			defaultValue: DataTypes.UUIDV1,
			primaryKey:true
		},
		'name':{
			type:DataTypes.STRING,
			allowNull: false,
			field:'name'
		},
		'action':{
			type:DataTypes.STRING,
			field:'action'
		},
		'content':{
			type:DataTypes.STRING,
			field:'content'
		},
		'operateTime':{
			type:DataTypes.DATE,
			field:'operate_time'
		}

	},{
		tableName:'log',
		timestamps: true,
        paranoid: true,
        createdAt: 'create_time',
        updatedAt: 'update_time',
        deletedAt: 'delete_time',
    });
};
