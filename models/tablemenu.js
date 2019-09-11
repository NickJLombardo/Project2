module.exports = function(sequelize, DataTypes) {
  const TableMenu = sequelize.define("TableMenu", {
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: sequelize.literal("NOW()")
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: sequelize.literal("NOW()")
    },
    menuQuantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "menu_quantity"
    }
  });

  return TableMenu;
};
