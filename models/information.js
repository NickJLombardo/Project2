module.exports = function(sequelize, DataTypes) {
  const Information = sequelize.define("Information", {
    informationDate: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3]
      },
      field: "information_date"
    },
    informationOpened: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      field: "information_opened"
    },
    informationOpenHour: {
      type: DataTypes.TIME,
      field: "information_open_hour"
    },
    informationCloseHour: {
      type: DataTypes.TIME,
      field: "information_close_hour"
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

  return Information;
};
