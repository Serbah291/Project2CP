const mongoose = require("mongoose");

const VoyageSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subTitle: { type: String },
  description: { type: String, required: true },
  destination: { type: String, required: true },
  prix: { type: Number, required: true },
  dateDepart: { type: Date, required: true },
  placesDisponible: { type: Number, required: true },
  imagePrincipale: { type: String },
  images: [{ type: String }], // Tableau d'URLs d'images
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" }, // Référence à une catégorie
  subCategory: { type: mongoose.Schema.Types.ObjectId, ref: "SubCategory" }, // Référence à une sous-catégorie
  activities: [{ type: String }], // Activités incluses dans le voyage
  rating: { type: Number, default: 0 }, // Note moyenne des avis
  codePromo: { type: mongoose.Schema.Types.ObjectId, ref: "CodePromo" }, // Référence à un code promo applicable
}, { timestamps: true }); // Ajoute createdAt et updatedAt automatiquement

const Voyage = mongoose.model("Voyage", VoyageSchema);
module.exports = Voyage;