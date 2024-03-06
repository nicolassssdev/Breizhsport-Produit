const { DataTypes, Model } = require('sequelize')

const sequelize = require('../config/database')

class Produit extends Model {
  async validateUniqueName (name) {
    const existingProduit = await Produit.findOne({ where: { name } })

    if (existingProduit) {
      throw new Error('Le nom du produit est déjà pris.')
    }

    return name
  }
}

Produit.init(
  {
    produit_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true
    },
    prix: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    marque: {
      type: DataTypes.STRING,
      allowNull: true
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true
    }
  },
  {
    sequelize,
    modelName: 'Produit',
    timestamps: false,
    tableName: 'Produits'
  }
)

module.exports = Produit
