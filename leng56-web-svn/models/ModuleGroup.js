
module.exports = function(sequelize,DataTypes){
	var ModuleGroup = sequelize.define("moduleGroup",{
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
		'desc':{
			type:DataTypes.STRING,
			field:'desc'
		},
		'priority':{
			type:DataTypes.INTEGER,
			allowNull: false,
			field:'priority'
		},
        'icon':{
            type:DataTypes.STRING,
            field:'icon'
        },
	},{
		tableName:'module_group',
		timestamps: false,
        classMethods: {
		    associate: function (models) {
                ModuleGroup.hasMany(models.Module, {
                    as: 'modules'
                });
            }
        },
        instanceMethods: {
            apiData: function (api) {
                return {
                    id: this.id,
                    name: this.name,
                    desc: this.desc,
                    priority: this.priority,
                    icon:this.icon,
                };
            }
        }
	});

    return ModuleGroup;
};
