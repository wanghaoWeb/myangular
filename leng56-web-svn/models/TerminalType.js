
module.exports = function(sequelize,DataTypes){
    var TerminalType = sequelize.define("terminalType",{
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
    },{
        tableName:'terminal_type',
        timestamps: true,
        paranoid: true,
        createdAt: 'create_time',
        updatedAt: 'update_time',
        deletedAt: 'delete_time',
        comment: '车载终端类型表',
        classMethods: {
            associate: function (models) {

            }
        },
        instanceMethods: {
            apiData: function (api) {
                return {
                    id: this.id,
                    name: this.name,
                    desc: this.desc,
                    seq: this.seq,
                };
            }
        }
    });

    return TerminalType;
};
