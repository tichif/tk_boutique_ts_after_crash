import mongoose, { Document } from 'mongoose';

export interface CurrencyInterface extends Document {
  name: string;
  amount: number;
  symbol: string;
  isPrincipal: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const currencySchema = new mongoose.Schema(
  {
    // @ts-ignore
    name: {
      type: String,
      required: [true, 'Le nom de la devise est obligatoire.'],
      minlength: [
        3,
        'Le nom de la devise doit contenir au moins 3 caractères.',
      ],
      maxlength: [
        50,
        'Le nom de la devise ne peut pas contenir plus de 50 caractères.',
      ],
      trim: true,
      unique: [true, 'Ce nom existe déja. Choisissez un autre.'],
    },
    // @ts-ignore
    amount: {
      type: Number,
      required: [true, 'La valeur de la devise est obligatoire.'],
      default: 1,
    },
    // @ts-ignore
    symbol: {
      type: String,
      required: [true, 'Le symbole est obligatoire.'],
      trim: true,
      maxlength: [50, 'Le symbole ne peut pas contenir plus de 50 caractères.'],
    },
    // @ts-ignore
    isPrincipal: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Currency = mongoose.model<CurrencyInterface>('Currency', currencySchema);

export default Currency;
