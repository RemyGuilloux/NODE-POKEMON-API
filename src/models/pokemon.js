module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Pokemon', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {msg: `Le nom du pokemon ne peut pas être un espace vide`},
          notNull: { msg: `le nom est une propriété requise`}
        }
      },
      hp: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: { msg: `Utilisez uniquement des nombres entiers pour les points de vies`},
          notNull: { msg: `Les points de vie sont une propriété requise.`}
        }
      },
      cp: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: { msg: `Utilisez uniquement des nombres entiers pour les dégats`},
          notNull: { msg: `Les dégats ne peuvent pas être null.`}
        }
      },
      picture: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isUrl: { msg: `La photo du pokémon doit être une Url valide`},
          notNull: { msg: `La photo du pokémon ne peut pas être null`}
        }
      },
      types: {
        type: DataTypes.STRING,
        allowNull: false,
        get(){
          return this.getDataValue('types').split(',')
        },
        set(types){
          this.setDataValue('types', types.join())
        }
      }
    }, {
      timestamps: true,
      createdAt: 'created',
      updatedAt: false
    })
  }