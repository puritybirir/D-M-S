module.exports = (sequelize, DataTypes) => {
  const roles = sequelize.define('roles', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    classMethods: {
      associate(models) {
        roles.belongsTo(models.users, {
          foreignKey: 'rolesId',
          onDelete: 'CASCADE',
        });
      },
    },
  });
  return roles;
};
