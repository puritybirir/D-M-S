module.exports = (sequelize, DataTypes) => {
  const Document = sequelize.define('Document', {
    Title: DataTypes.STRING,
    Content: DataTypes.STRING,
    Access: DataTypes.STRING,
  }, {
    classMethods: {
      associate(models) {
        // associations can be defined here
        Document.belongsTo(models.User, {
          foreignKey: 'UserId',
          onDelete: 'CASCADE',
        });
      },
    },
  });
  return Document;
};
