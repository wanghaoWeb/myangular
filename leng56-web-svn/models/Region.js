module.exports = function (sequelize, DataTypes) {
    var Region = sequelize.define("region",{
        id:{
            type: DataTypes.INTEGER,
            field: 'id',
            primaryKey: true
        },name:{
            type: DataTypes.STRING,
            field: 'name'
        },lng:{
            type: DataTypes.FLOAT,
            field: 'lng'
        },lat:{
            type: DataTypes.FLOAT,
            field: 'lat'
        },cityId:{
            type: DataTypes.INTEGER,
            field: 'city_id'
        },createTime:{
            type: DataTypes.DATE,
            field: 'create_time'
        },updateTime:{
            type: DataTypes.DATE,
            field: 'update_time'
        }
    },{
        tableName:'region',
        timestamps: false,
        classMethods: {
            associate: function (models) {
                Region.belongsTo(models.City, {as: 'city'});
            }
        },
    });

    return Region;
};
