module.exports = function(sequelize, DataTypes) {
  var Customer = sequelize.define("Customer", {
    customerName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3]
      },
      field: "customer_name"
    },
    customerUsername: {
      type: DataTypes.STRING,
      validate: {
        len: [3]
      },
      field: "customer_username"
    },
    customerPassword: {
      type: DataTypes.STRING,
      validate: {
        len: [6]
      },
      field: "customer_password"
    },
    customerBirthday: {
      type: DataTypes.STRING,
      field: "customer_birthday"
    },
    customerEmail: {
      type: DataTypes.STRING,
      field: "customer_email"
    },
    customerPhone: {
      type: DataTypes.STRING,
      field: "customer_phone"
    },
    customerTotalAmount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      field: "customer_total_amount"
    },
    customerMemberType: {
      type: DataTypes.STRING,
      defaultValue: "Bronze",
      field: "customer_member_type"
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

  Customer.associate = function(models) {
    Customer.hasMany(models.Reservation, {
      onDelete: "cascade"
    });
    Customer.hasMany(models.Table, {
      onDelete: "cascade"
    });
  };

  return Customer;
};
