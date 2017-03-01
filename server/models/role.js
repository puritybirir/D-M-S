module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define('Role', {
    title: DataTypes.STRING,
  }, {
    classMethods: {
      associate(models) {
        // associations can be defined here
        Role.hasMany(models.User, {
          foreignKey: 'RoleId',
          as: 'Users',
        });
      },
    },
  });
  return Role;
};
