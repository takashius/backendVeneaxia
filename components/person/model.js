import mongoose from "mongoose";
import infoBasica from "./model/infoBasica";
const Schema = mongoose.Schema;

const blpInfoBasicaSchema = Schema({
  fecEmision: {
    type: Date,
    default: Date.now,
    description: "Fecha de emisión del registro",
    validate: [validator.isDate, "Debe ser una fecha"],
  },
  estRegistro: {
    type: Boolean,
    default: true,
  },
  numCedula: {
    type: String,
    trim: true,
    required: [true, "Es requerido"],
    validate: [validator.isLength({ min: 7, max: 14 }), "No esta en el rango"],
  },
  tipMaesGenero: {
    type: Schema.ObjectId,
    ref: "MaesGenero",
  },
  tipMaesCivil: {
    type: String,
    enum: ["Casado", "Divorciado"],
    required: [true, "Es requerido"],
  },
  blpInfoIdentidadSchema: {
    type: Schema.ObjectId,
    ref: "blpInfoIdentidad",
  },
});

const blpInfoIdentidadSchema = Schema({
  comCedula: {
    fecEmision: {
      type: Date,
      default: Date.now,
      description: "Fecha de emisión del registro",
      validate: [validator.isDate, "Debe ser una fecha"],
    },
    estRegistro: {
      type: Boolean,
      default: true,
    },
  },
  creAdicional: [
    {
      fecEmision: {
        type: Date,
        default: Date.now,
        description: "Fecha de emisión del registro",
        validate: [validator.isDate, "Debe ser una fecha"],
      },
      estRegistro: {
        type: Boolean,
        default: true,
      },
    },
  ],
});

const blpInfoBasica = mongoose.model("blpInfoBasica", blpInfoBasicaSchema);
const blpInfoIdentidad = mongoose.model(
  "blpInfoIdentidad",
  blpInfoIdentidadSchema
);
export { blpInfoBasica, blpInfoIdentidad };
