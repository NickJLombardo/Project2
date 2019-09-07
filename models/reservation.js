module.exports = function(sequelize, DataTypes) {
  var Reservation = sequelize.define("Reservation", {
    reservationName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3]
      },
      field: "reservation_name"
    },
    reservationNoOfPeople: {
      type: DataTypes.INTEGER,
      validate: { min: 1, max: 10 },
      field: "reservation_no_of_people"
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

  Reservation.associate = function(models) {
    Reservation.belongsTo(models.Customer, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Reservation;
};
