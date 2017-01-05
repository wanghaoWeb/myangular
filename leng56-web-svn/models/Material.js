
module.exports = function(sequelize,DataTypes){
	var Material = sequelize.define("material",{
		'id':{
			type:DataTypes.UUID,
			field:'id',
			defaultValue: DataTypes.UUIDV1,
			primaryKey:true,
            comment: '材料ID'
		},
		'name':{
			type:DataTypes.STRING,
			allowNull: false,
			field:'name',
            unique: true,
            comment: '材料名称'
		},
        'title': {
            type:DataTypes.STRING,
            field:'title'
        },
        'seq': {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'seq',
            defaultValue: 0
        },
        'isPlatformCheck': {
		    type: DataTypes.BOOLEAN,
            allowNull: false,
            field: 'is_platform_check',
            comment: '是否需要平台审核'
        },
		'isManagerCheck':{
			type: DataTypes.BOOLEAN,
			allowNull: false,
			field: 'is_manager_check',
            comment: '是否需要企业管理员审核'
		},
		'desc':{
			type:DataTypes.STRING,
			field:'desc',
            comment: '描述'
		}
	},{
		tableName:'material',
        timestamps: true,
        paranoid: true,
        createdAt: 'create_time',
        updatedAt: 'update_time',
        deletedAt: 'delete_time',
        classMethods: {
            associate: function (models) {
                Material.belongsToMany(models.Module, {
                    as: 'modules',
                    through: models.ModuleMaterial
                });

                Material.belongsToMany(models.User, {
                    as: 'users',
                    through: models.UserMaterial
                });

                Material.hasMany(models.MaterialParams, {
                    as: 'params'
                })
            }
        },
        instanceMethods: {
            apiData: function (api) {
                return {
                    id: this.id,
                    name: this.name,
                    title: this.title,
                    seq: this.seq,
                    isPlatformCheck:this.isPlatformCheck,
                    isManagerCheck:this.isManagerCheck,
                    desc:this.desc,
                    modules:this.modules,
                    params:this.params
                };
            }
        }
	});

    return Material;
};
