var bcrypt = require('bcryptjs');
var Promise = require('bluebird');
var bcryptComplexity = 2;

module.exports = function (sequelize, DataTypes) {
    var User = sequelize.define("user", {
        'id': {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV1,
            field: 'id',
            primaryKey: true,
            comment: '用户ID'
        },
        'loginName': {
            type: DataTypes.STRING,
            field: 'login_name',
            allowNull: false,
            comment: '用户登录名'
        },
        'realName': {
            type: DataTypes.STRING,
            field: 'real_name',
            allowNull: true,
            comment: '用户真实姓名'
        },
        'phone': {
            type: DataTypes.STRING,
            field: 'phone',
            allowNull: true,
            comment: '手机号码'
        },
        'email': {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {isEmail: true},
            field: 'email',
            comment: '电子邮箱'
        },
        'passwordHash': {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'password_hash',
            comment: 'hash密码'
        },
        'passwordSalt': {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'password_salt',
            comment: '密码Salt'
        },
        'icon': {
            type: DataTypes.STRING,
            field: 'icon',
            comment: '用户图标'
        },
        'registerTime': {
            type: DataTypes.DATE,
            allowNull: false,
            field: 'register_time',
            commit: '注册时间'
        },
        'activated':{
            type:DataTypes.BOOLEAN,
            field:'activated',
            comment:'是否激活'
        },
        'organizationId':{
            type: DataTypes.UUID,
            field: 'organization_id',
            comment: '组织ID'
        },
        'seatGroupId':{
            type: DataTypes.UUID,
            field: 'seat_group_id',
            comment: '坐席组ID'
        },
        'lastLoginTime': {
            type: DataTypes.DATE,
            field: 'last_login_time',
            commit: '最后登录时间'
        },
        'loginedTimes': {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            field: 'logined_times',
            commit: '登录总次数'

        }
    }, {
        tableName: 'user',
        timestamps: true,
        paranoid: true,
        createdAt: 'create_time',
        updatedAt: 'update_time',
        deletedAt: 'delete_time',
        commit: '用户表',
        indexes: [
            {
                unique: true,
                fields: ['login_name']
            },
            {
                unique: true,
                fields: ['email']
            },
            {
                unique: true,
                fields: ['phone']
            }
        ],
        defaultScope: {
            attributes: { exclude: ['passwordHash', 'passwordSalt'] }
        },
        classMethods: {
            associate: function (models) {
                User.belongsToMany(models.Material, {
                    as: 'materials',
                    through: models.UserMaterial
                });

                User.belongsToMany(models.Role, {
                    as: 'roles',
                    through: models.UserRole
                });

                User.belongsToMany(models.Module, {
                    as: 'modules',
                    through: models.UserModule
                });

                User.belongsTo(models.Organization, {
                    as: 'organization'
                });

                User.belongsTo(models.SeatGroup, {
                    as: 'seatGroup'
                });
            }
        },
        instanceMethods: {
            updatePassword: function (pw) {
                var self = this;
                return new Promise(function (resolve, reject) {
                    bcrypt.genSalt(bcryptComplexity, function (error, salt) {
                        if (error) {
                            reject(error);
                        } else {
                            bcrypt.hash(pw, salt, function (error, hash) {
                                if (error) {
                                    reject(error);
                                } else {
                                    self.passwordHash = hash;
                                    self.passwordSalt = salt;
                                    resolve(self);
                                }

                            });
                        }
                    });
                });
            },

            checkPassword: function (pw) {
                var self = this;
                return new Promise(function (resolve, reject) {
                    bcrypt.compare(pw, self.passwordHash, function (error, res) {
                        if (error) {
                            reject(error);
                        } else {
                            resolve(res);
                        }

                    });
                });

            },

            apiData: function (api) {
                return {
                    id: this.id,
                    loginName: this.loginName,
                    realName: this.realName,
                    phone: this.phone,
                    email: this.email,
                    icon: this.icon,
                    registerTime: this.registerTime,
                    activated:this.activated,
                    roles:this.roles,
                    params:this.params,
                    organizationId:this.organizationId,
                    seatGroupId:this.seatGroupId,
                    organization: this.organization,
                    seatGroup:this.seatGroup
                };
            }
        }
    });

    return User;
};
