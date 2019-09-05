module.exports = function(sequelize, DataTypes) {
  var Table = sequelize.define("Table", {
    table_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3]
      }
    },
    table_availability: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    table_reserved: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    table_reserved_time: {
      type: DataTypes.INTEGER
    },
    table_people: {
      type: DataTypes.INTEGER,
      defaultValue: 4
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
  Table.assicaite = function(models) {
    Table.hasMany(models.Reservation, {
      onUpdate: "CASCADE",
      onDelete: "CASCADE"
    });
  };

  return Table;
};
