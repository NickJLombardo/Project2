module.exports = function(sequelize, DataTypes) {
  const Reservation = sequelize.define("Reservation", {
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
    reservationPhone: {
      type: DataTypes.STRING,
      field: "reservation_phone"
    },
    reservationEmail: {
      type: DataTypes.STRING,
      field: "reservation_email"
    },
    reservationDate: {
      type: DataTypes.DATE,
      field: "reservation_date"
    },
    reservationTime: {
      type: DataTypes.DATE,
      field: "reservation_time"
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
    Reservation.belongsTo(models.Table, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Reservation;
};
