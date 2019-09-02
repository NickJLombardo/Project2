module.exports = function(sequelize, DataTypes) {
  var Customer = sequelize.define("customer", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3]
      }
    },
    username: {
      type: DataTypes.STRING,
      validate: {
        len: [3]
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        len: [6]
      }
    },
    birthday: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.INTEGER
    },
    phone: {
      type: DataTypes.INTEGER
    },
    totalAmount: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  });

  return Customer;
};
