module.exports = function(sequelize,DataTypes){
    var AllianceOrganization= sequelize.define("allianceOrganization",{
        'allianceId': {
            type:DataTypes.UUID,
            field:'alliance_id',
            allowNull: false
        },
        'organizationId': {
            type:DataTypes.UUID,
            allowNull: false,
            field:'organization_id'
        }
    },{
        tableName:'alliance_organization',
        timestamps: false,
        classMethods: {

        },
        instanceMethods: {

        }
    });


    return AllianceOrganization;
};
