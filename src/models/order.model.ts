import mongoose, { Document } from 'mongoose';
import Logging from '../utils/log';

import { ProductDocument } from './product.model';

export interface OrderDocument extends Document {
  user: {
    name: string;
    email: string;
    userId: string;
  };
  products: {
    productId: string;
    variantId?: string;
    name: string;
    price: number;
    qty: number;
    size: string;
    color: string;
  }[];
  paymentMethod: string;
  transactionId: string;
  currency: {
    name: string;
    symbol: string;
    amount: number;
  };
  taxPrice: number;
  shippingPrice: number;
  discountPrice: number;
  totalPrice: number;
  shippingAddress?: {
    coordinates: {
      lat: number;
      lng: number;
    };
    address: string;
  };
  isDelivered: boolean;
  deliveryAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const OrderSchema = new mongoose.Schema(
  {
    user: {
      name: {
        type: String,
        required: [true, 'Le nom est obligatoire.'],
        maxlength: [150, 'Le nom ne peut pas dépasser 150 caractères.'],
        minlength: [3, 'Le nom doit contenir au moins 3 caractères.'],
        match: [/^[a-zA-ZÀ-ÿ-. ]*$/, 'Le nom est incorrect.'],
        trim: true,
      },
      email: {
        type: String,
        required: [true, "L'email est obligatoire"],
        match: [
          /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
          "L'email est incorrect.",
        ],
        trim: true,
      },
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
    },
    products: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
          required: true,
        },
        variantId: {
          type: String,
        },
        name: {
          type: String,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
        qty: {
          type: Number,
          required: true,
        },
        size: {
          type: String,
          required: true,
        },
        color: {
          type: String,
          required: true,
        },
      },
    ],
    paymentMethod: {
      type: String,
      required: [true, 'Le mode de payement est obligatoire.'],
      enum: ['moncash', 'stripe', 'au comptant'],
    },
    transactionId: {
      type: String,
      required: [true, "L'id de transaction est obligatoire."],
      unique: [true, 'Cette commande existe déja.'],
    },
    currency: {
      name: {
        type: String,
        required: [true, 'Le nom de la devise est obligatoire.'],
      },
      symbol: {
        type: String,
        required: [true, 'Le symbole de la devise est obligatoire'],
      },
      amount: {
        type: Number,
        required: [true, 'La valeur de la devise est obligatoire.'],
      },
    },
    taxPrice: {
      type: Number,
      required: [true, 'Le montant de la taxe est obligatoire'],
      default: 0.0,
    },
    shippingPrice: {
      type: Number,
      required: [true, 'Le montant de la livraison est obligatoire'],
      default: 0.0,
    },
    discountPrice: {
      type: Number,
      required: [true, 'Le montant du rabais est obligatoire'],
      default: 0.0,
    },
    totalPrice: {
      type: Number,
      required: [true, 'Le montant du rabais est obligatoire'],
      default: 0.0,
    },
    shippingAddress: {
      coordinates: {
        lat: Number,
        lng: Number,
      },

      address: {
        type: String,
      },
    },
    isDelivered: {
      type: Boolean,
      default: false,
      required: true,
    },
    deliveryAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

//  Decrement by products.qty the number of products
OrderSchema.post('save', async function () {
  try {
    this.products.map(async (product) => {
      // check product variant
      if (product.variantId) {
        const prod = await mongoose
          .model<ProductDocument>('Product')
          .findById(product.productId);
        if (!prod) {
          return;
        }
        const variant = prod?.variant?.find(
          // @ts-ignore
          (v) => v._id.toString() === product.variantId
        );
        if (variant) {
          variant.qty -= product.qty;
          await prod.save();
        }
      } else {
        await mongoose
          .model<ProductDocument>('Product')
          .findByIdAndUpdate(product.productId, {
            $inc: { qty: -product.qty },
          });
      }
    });
  } catch (error: any) {
    Logging.error(error.message);
  }
});

const Order = mongoose.model<OrderDocument>('Order', OrderSchema);

export default Order;
