module.exports = function(sequelize, DataTypes) {
  let Reservation = sequelize.define("Reservation", {
    reservation_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3]
      }
    },
    reservation_no_of_people: {
      type: DataTypes.INTEGER,
      validate: { min: 1, max: 10 }
    },
    reservation_time: {
      type: DataTypes.DATE,
      allowNull: false
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

  return Reservation;
};
