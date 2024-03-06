const { validationResult } = require('express-validator')
const Produit = require('../models/produit')

class ProduitController {
  // Middleware pour gérer les erreurs
  handleErrors (fn) {
    return async (req, res, next) => {
      try {
        await fn(req, res, next)
      } catch (error) {
        next(error)
      }
    }
  }

  // Fonction pour créer un nouveau produit
  createProduit = this.handleErrors(async (req, res) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() })
    }

    const { name, description, prix, stock, marque, image } = req.body

    try {
      const createdProduit = new Produit({
        name,
        description,
        prix,
        stock,
        marque,
        image
      })

      // Validation du nom de produit
      await createdProduit.validateUniqueName(name)
      await createdProduit.save()

      res.status(201).json(createdProduit)
    } catch (error) {
      console.error('Erreur lors de la création du produit', error)
      res.status(500).json({ error: { message: error.message } })
    }
  })

  // Fonction pour récupérer tous les produits
  getAllProduits = this.handleErrors(async (req, res) => {
    const produits = await Produit.findAll()
    res.status(200).json(produits)
  })

  // Fonction pour récupérer un produit par son ID
  getProduitById = this.handleErrors(async (req, res) => {
    const produit = await Produit.findByPk(req.params.product_id)
    res.status(200).json(produit)
  })

  // Fonction pour mettre à jour un produit par son ID
  updateProduitById = this.handleErrors(async (req, res) => {
    const [_, updatedProduit] = await Produit.update(req.body, {
      where: { produit_id: req.params.product_id },
      returning: true
    })

    res.status(200).json(updatedProduit[0])
  })

  // Fonction pour supprimer un produit par son ID
  deleteProduitById = this.handleErrors(async (req, res) => {
    const removedProduit = await Produit.destroy({
      where: { produit_id: req.params.product_id }
    })

    res.status(200).json(removedProduit)
  })
}

module.exports = new ProduitController()
