import mongoose, { Document } from 'mongoose';
import slugify from 'slugify';

import Logging from '../utils/log';

export interface Photo {
  public_id: string;
  url: string;
  width: number;
  height: number;
}

interface Variant {
  price: number;
  color: string;
  qty: number;
  size: string;
  photoPrincipal?: Photo;
  photosSecondaries?: Photo[];
}

export interface ProductDocument extends Document {
  name: string;
  slug: string;
  category: string;
  description: string;
  price?: number;
  color?: string;
  qty?: number;
  size?: string;
  photoPrincipal?: Photo;
  photosSecondaries?: Photo[];
  variant?: Variant[];
  createdAt: Date;
  updatedAt: Date;
}

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Le nom de l'article est obligatoire."],
      maxlength: [
        50,
        "Le nom de l'article ne doit pas dépasser 50 caractères.",
      ],
      minlength: [
        3,
        "La nom de l'article doit contenir au moins 3 caractères.",
      ],
    },
    slug: {
      type: String,
      unique: [true, 'Ce nom existe déja.'],
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: [true, 'La catégorie est obligatoire.'],
    },
    description: {
      type: String,
    },
    price: {
      type: Number,
      min: 0,
    },
    color: {
      type: String,
    },
    size: {
      type: String,
    },
    qty: {
      type: Number,
      min: 0,
    },
    photoPrincipal: {
      public_id: {
        type: String,
      },
      url: {
        type: String,
      },
      height: {
        type: Number,
      },
      width: {
        type: Number,
      },
    },
    photosSecondaries: [
      {
        public_id: {
          type: String,
        },
        url: {
          type: String,
        },
        height: {
          type: Number,
        },
        width: {
          type: Number,
        },
      },
    ],
    variant: [
      {
        price: {
          type: Number,
          min: 0,
        },
        color: {
          type: String,
        },
        size: {
          type: String,
        },
        qty: {
          type: Number,
          min: 0,
        },
        photoPrincipal: {
          public_id: {
            type: String,
          },
          url: {
            type: String,
          },
          height: {
            type: Number,
          },
          width: {
            type: Number,
          },
        },
        photosSecondaries: [
          {
            public_id: {
              type: String,
            },
            url: {
              type: String,
            },
            height: {
              type: Number,
            },
            width: {
              type: Number,
            },
          },
        ],
      },
    ],
  },
  {
    timestamps: true,
  }
);

// slugify the name of the product
productSchema.pre('save', function (next) {
  const slug = slugify(this.name, {
    trim: true,
    lower: true,
  });

  this.slug = slug;
  next();
});

// change the product count in the category model after the product is created
productSchema.post('save', async function () {
  try {
    await mongoose.model('Category').findByIdAndUpdate(this.category, {
      $inc: { productsCount: 1 },
    });
  } catch (error) {
    Logging.error(error);
  }
});

// change the product count in the category model after the product is removed
productSchema.post('remove', async function () {
  try {
    await mongoose.model('Category').findByIdAndUpdate(this.category, {
      $inc: { productsCount: -1 },
    });
  } catch (error) {
    Logging.error(error);
  }
});

const Product = mongoose.model<ProductDocument>('Product', productSchema);

export default Product;
