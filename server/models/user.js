const bcrypt = require('bcrypt');

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
      // TODO make salt env variable
      beforeCreate(newUser, options, cb) {
        bcrypt.hash(newUser.password, 10, (err, hash) => {
          Object.assign(newUser, {
            password: hash,
          });
          return cb(null, options);
        });
      },
    },
  });
  return user;
};
