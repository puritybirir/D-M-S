module.exports = (sequelize, DataTypes) => {
  const document = sequelize.define('document', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    access: DataTypes.STRING,
  }, {
    classMethods: {
      associate(models) {
        document.belongsTo(models.user, {
          foreignKey: 'userId',
          onDelete: 'CASCADE',
        });
      },
    },
  });
  return document;
};
