
module.exports = function(sequelize,DataTypes){
    var SeatGroup = sequelize.define("seatGroup",{
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
        'seq':{
            type:DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
            field:'seq'
        },
        'organizationId': {
            type: DataTypes.UUID,
            allowNull: false,
            field:'organization_id',
            comment: '所属机构id'
        }
    },{
        tableName:'seat_group',
        timestamps: true,
        paranoid: true,
        createdAt: 'create_time',
        updatedAt: 'update_time',
        deletedAt: 'delete_time',
        comment: '坐席组表',
        classMethods: {
            associate: function (models) {
                SeatGroup.belongsTo(models.Organization, {
                    as: 'organization'
                });
            }
        },
        instanceMethods: {
            apiData: function (api) {
                return {
                    id: this.id,
                    name: this.name,
                    desc: this.desc,
                    seq: this.seq,
                    organizationId: this.organizationId
                };
            }
        }
    });

    return SeatGroup;
};
