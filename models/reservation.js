const mongoose = require("mongoose");

const ReservationSchema = new mongoose.Schema({
  client: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Client qui réserve
  voyageId: { type: mongoose.Schema.Types.ObjectId, ref: "Voyage", required: true }, // Voyage réservé
  paymentMethodType: { type: String, enum: ["Carte", "PayPal", "Espèces"], required: true }, // Méthode de paiement
  status: { type: String, enum: ["En attente", "Confirmée", "Annulée"], default: "En attente" }, // Statut de la réservation
  dateReservation: { type: Date, default: Date.now }, // Date de réservation
  nombrePersonneTotale: { type: Number, required: true }, // Nombre total de personnes
  periodeDattente: { type: Number, default: 0 }, // Temps d’attente estimé avant confirmation
  adults: { type: Number, required: true }, // Nombre d'adultes
  jeunes: { type: Number, default: 0 }, // Nombre de jeunes
  nourrissons: { type: Number, default: 0 }, // Nombre de bébés
}, { timestamps: true });

const Reservation = mongoose.model("Reservation", ReservationSchema);
module.exports = Reservation;