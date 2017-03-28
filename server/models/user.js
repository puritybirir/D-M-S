const Bcrypt = require('bcrypt-nodejs');

module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          msg: 'Email address must be valid'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    roleId: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 1,
    },
  }, {
    classMethods: {
      associate(models) {
        user.belongsTo(models.Role, {
          foreignKey: 'roleId',
          onDelete: 'CASCADE',
        });

        user.hasMany(models.document, {
          foreignKey: 'userId',
          as: 'document',
        });
      },
    },
    hooks: {
      beforeCreate(newUser) {
        const hash = Bcrypt.hashSync(newUser.password, Bcrypt.genSaltSync(process.env.SALTROUNDS),
         null);
        newUser.password = hash;
      },
    },
  });
  return user;
};

