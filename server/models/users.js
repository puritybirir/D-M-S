module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define('users', {
    title: DataTypes.STRING,
  }, {
    classMethods: {
      associate(models) {
        users.hasMany(models.documents, {
          foreignKey: 'documentsId',
          as: 'documents',
        });
        users.hasMany(models.roles, {
          foreignKey: 'rolesId',
          as: 'roles',
        });
      },
    },
  });
  return users;
};
