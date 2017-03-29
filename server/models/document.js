module.exports = (sequelize, DataTypes) => {
  const document = sequelize.define('document', {
    title: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
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
