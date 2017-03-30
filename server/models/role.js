module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define('Role', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    classMethods: {
      associate(models) {
        Role.hasMany(models.user, {
          foreignKey: 'roleId'
        });
      },
    },
  });
  return Role;
};
