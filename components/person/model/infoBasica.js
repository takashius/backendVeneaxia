import validator from "validator";

export default () => {
  return {
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
      validate: [
        validator.isLength({ min: 7, max: 14 }),
        "No esta en el rango",
      ],
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
  };
};
