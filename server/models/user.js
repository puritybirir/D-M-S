module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    FirstName: DataTypes.STRING,
    LastName: DataTypes.STRING,
    Email: DataTypes.STRING,
    Password: DataTypes.STRING,
  }, {
    classMethods: {
      associate(models) {
        // associations can be defined here
        User.belongsTo(models.Role, {
          foreignKey: 'RoleId',
          onDelete: 'CASCADE',
        });

        User.hasMany(models.Document, {
          foreignKey: 'UserId',
          as: 'documents',
        });
      },
    },
  });
  return User;
};
