
module.exports = function(sequelize,DataTypes){
	var Module = sequelize.define("module",{
		'id':{
			type:DataTypes.UUID,
			field:'id',
			defaultValue: DataTypes.UUIDV1,
			primaryKey:true
		},
		'name':{
			type:DataTypes.STRING,
			allowNull: false,
            unique: true,
			field:'name'
		},
        'title': {
            type:DataTypes.STRING,
            allowNull: false,
            field:'title'
        },
        'seq': {
		    type: DataTypes.INTEGER,
            allowNull: false,
            field: 'seq',
            defaultValue: 0
        },
		'icon':{
			type:DataTypes.STRING,
			field:'icon'
		},
		'type':{
			type:DataTypes.STRING,
			allowNull: true,
			field:'type'
		},
		'isCheck':{
			type:DataTypes.STRING,
			allowNull: true,
			field:'ischeck'
		},
		'price':{
			type:DataTypes.FLOAT,
			allowNull: true,
			field:'price'
		},
        'moduleGroupId': {
            type:DataTypes.UUID,
            field: 'module_group_id'
        },
		'desc':{
			type:DataTypes.STRING,
			field:'desc'
		}
	},{
		tableName:'module',
        timestamps: true,
        paranoid: true,
        createdAt: 'create_time',
        updatedAt: 'update_time',
        deletedAt: 'delete_time',
        classMethods: {
            associate: function(models) {
                Module.belongsToMany(models.Material, {
                    as: 'materials',
                    through: models.ModuleMaterial
                });

                Module.belongsToMany(models.Role, {
                    as: 'roles',
                    through: models.RoleModule
                });

                Module.belongsTo(models.ModuleGroup, {
                    as: 'moduleGroup'
                });
            }
        },
		instanceMethods: {
            apiData: function (api) {
                return {
                    id: this.id,
                    name: this.name,
                    title: this.title,
                    seq: this.seq,
                    icon:this.icon,
                    isCheck:this.isCheck,
                    type:this.type,
                    moduleGroupId:this.moduleGroupId,
                    price:this.price,
                    desc:this.desc,
                    materials:this.materials,
                };
            }
        }
	});

    return Module;
};
