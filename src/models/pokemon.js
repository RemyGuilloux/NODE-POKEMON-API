const validTypes = ['Plante', 'Poison', 'Feu', 'Eau', 'Insecte', 'Vol', 'Normal', 'Electrik', 'Fée']

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
        unique: {
          msg: 'Le nom est déjà pris.'
        },
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
          min: {
            args: [0],
            msg: `Les points de vie doivent être supérieurs ou égales à 0.`
          },
          max: {
            args: [999],
            msg: `Les points de vie doivent être inférieurs ou égales à 999.`
          },
          notNull: { msg: `Les points de vie sont une propriété requise.`}
        }
      },
      cp: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: { msg: `Utilisez uniquement des nombres entiers pour les dégats`},
          min: {
            args: [0],
            msg: `Les points de dégats doivent être supérieurs ou égales à 0.`
          },
          max: {
            args: [99],
            msg: `Les points de dégats doivent être inférieurs ou égales à 99.`
          },
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
        },
        validate: {
          isTypesValid(value) {
            if(!value){
              throw new Error('Un pokémon doit au moins avoir un type.')
            }
            if(value.split(',').length > 3){
              throw new Error('Un pokémon ne peux pas avoir plus de trois types.')
            }
            value.split(',').forEach(type => {
              if(!validTypes.includes(type)){
                throw new Error(`Le type d'un pokemon doit appartenir à la liste suivante: ${validTypes}`)
              }
            })
          }
        }
      }
    }, {
      timestamps: true,
      createdAt: 'created',
      updatedAt: false
    })
  }