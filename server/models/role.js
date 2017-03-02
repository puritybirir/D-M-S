module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define('Role', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    classMethods: {
      associate(models) {
        // associations can be defined here
        Role.hasMany(models.user, {
          foreignKey: 'roleId',
          as: 'user',
        });
      },
    },
  });
  return Role;
};
