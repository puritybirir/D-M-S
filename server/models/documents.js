module.exports = (sequelize, DataTypes) => {
  const documents = sequelize.define('documents', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    classMethods: {
      associate(models) {
        documents.belongsTo(models.users, {
          foreignKey: 'documentsId',
          onDelete: 'CASCADE',
        });
      },
    },
  });
  return documents;
};
