module.exports = function(sequelize, DataTypes) {
  const Menu = sequelize.define("Menu", {
    menuName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [2]
      },
      field: "menu_name"
    },
    menuDescription: {
      type: DataTypes.TEXT,
      field: "menu_description"
    },
    menuCategory: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "menu_category"
    },
    menuSubcategory: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "menu_subcategory"
    },
    menuPrice: {
      type: DataTypes.FLOAT,
      allowNull: false,
      field: "menu_price"
    },
    menuFeature: {
      type: DataTypes.STRING,
      field: "menu_feature"
    },
    menuCateringAvailability: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      field: "menu_catering_availability"
    },
    menuCateringMinOrder: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      field: "menu_catering_min_order"
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
  return Menu;
};
