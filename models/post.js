module.exports = function(sequelize, DataTypes) {
  var Post = sequelize.define("Post", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false,
      len: [1]
    },
    breed: {
      type: DataTypes.TEXT,
      allowNull: false,
      len: [1]

  },
    born: {
      type: DataTypes.TEXT,
      allowNull: false,
      len: [1]
  },
    ownerName: {
      type: DataTypes.TEXT,
      allowNull: false,
      len: [1]
  },
    ownerPhone: {
      type: DataTypes.STRING,
      allowNull: false,
      len: [1]
  },
    microchip: {
      type: DataTypes.STRING,
      allowNull: false,
      len: [1]
  },
    petstatus: {
      type: DataTypes.STRING,
      allowNull: false,
      len: [1]
  },
    allergies: {
      type: DataTypes.STRING,
      allowNull: false,
      len: [1]
  },
    playtime: {
      type: DataTypes.STRING,
      allowNull: false,
      len: [1]
  },
    food: {
      type: DataTypes.STRING,
      allowNull: false,
      len: [1]
  },
    vitamins: {
      type: DataTypes.STRING,
      allowNull: false,
      len: [1]
  },
    gender: {
      type: DataTypes.TEXT,
      allowNull: false,
      len: [1]
    }
  },
    {
      // We're saying that we want our Author to have Posts
      classMethods: {
        associate: function(models) {
          // An Author (foreignKey) is required or a Post can't be made
          Post.belongsTo(models.Author, {
            foreignKey: {
              allowNull: false
            }
          });
        }
      }
    }
  );
  return Post;
};
