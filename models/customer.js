module.exports = function(sequelize, DataTypes) {
  let Customer = sequelize.define("Customer", {
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
      type: DataTypes.STRING
    },
    customer_phone: {
      type: DataTypes.STRING
    },
    customer_totalAmount: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    customer_member_type: {
      type: DataTypes.STRING,
      defaultValue: "platinum"
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: sequelize.literal("NOW()")
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: sequelize.literal("NOW()")
    }
  });

  return Customer;
};
