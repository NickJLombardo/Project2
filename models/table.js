module.exports = function(sequelize, DataTypes) {
  const Table = sequelize.define("Table", {
    tableName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3]
      },
      field: "table_name"
    },
    tableAvailability: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      field: "table_availability"
    },
    tablePeople: {
      type: DataTypes.INTEGER,
      defaultValue: 4,
      field: "table_people"
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

  Table.associate = function(models) {
    Table.hasMany(models.Reservation, {
      onDelete: "cascade"
    });
  };

  return Table;
};
