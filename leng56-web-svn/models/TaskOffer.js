module.exports = function (sequelize, DataTypes) {
    var TaskOffer = sequelize.define("taskOffer",{
        id:{
            type: DataTypes.UUID,
            field: 'id',
            primaryKey: true,
            defaultValue: DataTypes.UUIDV1,
            comment: 'ID'
        },
        taskId:{
            type: DataTypes.UUID,
            field: 'task_id'
        },
        organizationId: {
            type: DataTypes.UUID,
            field: 'organization_id',
            comment: '承接机构id'
        },
        seatGroupId: {
            type: DataTypes.UUID,
            field: 'seat_group_id',
            comment: '承接坐席组id'
        },
        offer: {
            type: DataTypes.DECIMAL(11, 2),
            field: 'offer',
            defaultValue: '0',
            comment: '报价'
        },
        type:{
            type: DataTypes.INTEGER,
            field: 'type',
            comment: '报价类型,{0：定价，1：竞价}'
        },
        accepted:{
            type: DataTypes.INTEGER,
            field: 'accepted',
            comment: '{0：未接受，1：已接受}'
        },
        creatorId: {
            type: DataTypes.UUID,
            field: 'creator_id',
            comment: '创建人ID'
        }

    },{
        tableName:'task_offer',
        comment: '货单运输公司报价表',
        timestamps: true,
        paranoid: true,
        createdAt: 'create_time',
        updatedAt: 'update_time',
        deletedAt: 'delete_time',
        classMethods: {
            associate: function (models) {
                TaskOffer.belongsTo(models.Task, {as: 'task'});

                TaskOffer.belongsTo(models.Organization, {as: 'organization'});

                TaskOffer.belongsTo(models.SeatGroup, {as: 'seatGroup'});

                TaskOffer.belongsTo(models.User, {as: 'creator'});
            }
        },
        instanceMethods: {}
    });

    return TaskOffer;
};
