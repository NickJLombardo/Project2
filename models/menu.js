module.exports = function(sequelize, DataTypes) {
  var Menu = sequelize.define("menu", {
    menu_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [2]
      }
    },
    menu_description: {
      type: DataTypes.TEXT
    },
    menu_category: {
      type: DataTypes.STRING,
      allowNull: false
    },
    menu_subcategory: {
      type: DataTypes.STRING,
      allowNull: false
    },
    menu_price: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    menu_feature: {
      type: DataTypes.STRING
    },
    menu_catering_availability: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    menu_catering_min_order: {
      type: DataTypes.INTEGER,
      defaultValue: 0
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
