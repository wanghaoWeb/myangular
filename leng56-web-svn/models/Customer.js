module.exports = function (sequelize, DataTypes) {
    var Customer = sequelize.define('customer', {
        id: {
            type: DataTypes.UUID,
            field: 'id',
            primaryKey: true,
            defaultValue: DataTypes.UUIDV1,
            comment: 'ID'
        },
        name: {
            type: DataTypes.STRING,
            field: 'name',
            comment: '客户名称'
        },
        linkman: {
            type: DataTypes.STRING,
            field: 'linkman',
            comment: '联系人'
        },
        phone: {
            type: DataTypes.STRING,
            field: 'phone',
            comment: '联系电话'
        },
        business: {
            type: DataTypes.STRING,
            field: 'business',
            comment: '业务范围'
        },
        regionId: {
            type: DataTypes.INTEGER,
            field: 'region_id',
            comment: '对地区的引用'
        },
        address: {
            type: DataTypes.STRING,
            field: 'address',
            comment: '详细地址'
        },
        organizationId: {
            type: DataTypes.UUID,
            field: 'organization_id',
            comment: '所属机构id'
        },
        seatGroupId: {
            type: DataTypes.UUID,
            allowNull: true,
            field: 'seat_group_id',
            comment: '指派到的坐席组id'
        },
        remark: {
            type: DataTypes.STRING,
            field: 'remark',
            comment: '备注'
        },
        openingBank: {
            type: DataTypes.STRING,
            field: 'opening_bank',
            defaultValue: '开户行'
        },
        account: {
            type: DataTypes.STRING,
            field: 'account',
            defaultValue: '账号'
        },
        accountName: {
            type: DataTypes.STRING,
            field: 'account_name',
            defaultValue: '账号名'
        },
        billingType: {
            type: DataTypes.STRING(30),
            field: 'billing_type',
            comment: '开具类型{ORDINARY:普通发票,VAT:增值税专用发票}'
        },
        billingTitle: {
            type: DataTypes.STRING,
            field: 'billing_title',
            defaultValue: '发票抬头'
        },
        taxpayerNo: {
            type: DataTypes.STRING,
            field: 'taxpayer_no',
            defaultValue: '纳税人识别号'
        },
        creatorId: {
            type:DataTypes.UUID,
            field: 'creator_id'
        }
    }, {
        tableName: 'customer',
        comment: '客户表',
        timestamps: true,
        paranoid: true,
        createdAt: 'create_time',
        updatedAt: 'update_time',
        deletedAt: 'delete_time',
        classMethods: {
            associate: function (models) {
                Customer.belongsTo(models.Organization, {as: 'organization'});

                Customer.belongsTo(models.SeatGroup, {as: 'seatGroup'});

                Customer.belongsTo(models.User, {as: 'creator'});

                Customer.belongsTo(models.Region, {as: 'region'});
            }
        },
        instanceMethods: {}
    });

    return Customer;
};
