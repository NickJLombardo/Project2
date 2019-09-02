module.exports = function(sequelize, DataTypes) {
  var Menu = sequelize.define("menu", {
    menu_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [2]
      }
    },
    menu_category: {
      type: DataTypes.STRING,
      allowNull: false
    },
    menu_price: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    menu_spicy: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    menu_availableQty: {
      type: DataTypes.INTEGER,
      defaultValue: 0
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
    }
  });

  return Menu;
};
