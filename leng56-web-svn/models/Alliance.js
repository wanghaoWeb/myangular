module.exports = function(sequelize,DataTypes){
    var Alliance = sequelize.define("alliance",{
        id:{
            type: DataTypes.UUID,
            field: 'id',
            defaultValue: DataTypes.UUIDV1,
            primaryKey: true
        },name:{
            type: DataTypes.STRING,
            field: 'name',
            allowNull: false,
            comment: '名称'
        },desc:{
            type: DataTypes.STRING,
            field: 'desc',
            comment: '描述'
        }
    },{
        tableName:'alliance',
        comment: '联盟表',
        timestamps: true,
        paranoid: true,
        createdAt: 'create_time',
        updatedAt: 'update_time',
        deletedAt: 'delete_time',
        classMethods: {
            associate: function (models) {
                Alliance.belongsToMany(models.Organization, {
                    as: 'organizations',
                    through: models.AllianceOrganization
                });
            }
        },
        instanceMethods: {}
    });

    return Alliance;
};
