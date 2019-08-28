module.exports = function(sequelize, DataTypes) {
  var Example = sequelize.define("Example", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    email: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    phone: {
      type: DataTypes.INTEGER
    }
  });

  return Example;
};
