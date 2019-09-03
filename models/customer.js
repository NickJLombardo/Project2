module.exports = function(sequelize, DataTypes) {
  var Customer = sequelize.define("customer", {
    customer_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3]
      }
    },
    customer_username: {
      type: DataTypes.STRING,
      validate: {
        len: [3]
      }
    },
    customer_password: {
      type: DataTypes.STRING,
      validate: {
        len: [6]
      }
    },
    customer_birthday: {
      type: DataTypes.STRING
    },
    customer_email: {
      type: DataTypes.INTEGER
    },
    customer_phone: {
      type: DataTypes.INTEGER
    },
    customer_totalAmount: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  });

  return Customer;
};
