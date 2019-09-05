module.exports = function(sequelize, DataTypes) {
  let CustomerReservation = sequelize.define("CustomerReservation", {
    status: {
      type: DataTypes.STRING,
      defaultValue: "started"
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

  return CustomerReservation;
};
