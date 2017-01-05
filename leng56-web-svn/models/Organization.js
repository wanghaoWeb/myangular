
module.exports = function(sequelize,DataTypes){
	var Organization = sequelize.define("organization",{
		'id':{
			type:DataTypes.UUID,
			field:'id',
			defaultValue: DataTypes.UUIDV1,
			primaryKey:true
		},
		'code':{
			type:DataTypes.STRING,
			field:'code'
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
        'createUser':{
            type:DataTypes.STRING,
            field:'create_user'
        },
        'creatorId': {
            type:DataTypes.UUID,
            field: 'creator_id'
        },
		'createTime':{
			type:DataTypes.DATE,
			allowNull: false,
			field:'create_time'
		}
	},{
		tableName:'organization',
        timestamps: true,
        paranoid: true,
        createdAt: 'create_time',
        updatedAt: 'update_time',
        deletedAt: 'delete_time',
        classMethods: {
		    associate: function (models) {
                Organization.belongsTo(models.User, {
                    as: 'creator',
                    constraints: false
                });

                Organization.belongsToMany(models.Alliance, {
                    as: 'alliances',
                    through: models.AllianceOrganization
                });
            }
        },
        instanceMethods: {
            apiData: function (api) {
                return {
                    id: this.id,
                    code:this.code,
                    name: this.name,
                    desc: this.desc,
                    //createUser:this.createUser,
                    createTime:this.createTime,
                    creatorId:this.creatorId,
                    creator:this.creator

                };
            }
        }
	});

    return Organization;
};
