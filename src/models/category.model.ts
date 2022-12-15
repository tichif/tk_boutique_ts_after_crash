import { Document, Schema, model } from 'mongoose';

export interface CategoryDocument extends Document {
  name: string;
  productsCount: number;
  createdAt: Date;
  updatedAt: Date;
}

const categorySchema = new Schema(
  {
    // @ts-ignore
    name: {
      type: String,
      trim: true,
      unique: [true, 'Cette categorie existe déja.'],
      required: [true, 'La catégorie ne peut pas être vide.'],
      maxlength: [50, 'La catégorie ne doit pas dépasser 50 caractères.'],
      minlength: [3, 'La catégorie doit contenir au moins 3 caractères.'],
    },
    // @ts-ignore
    productsCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
    virtuals: true,
  }
);

// Reverse populate with virtuals
categorySchema.virtual('products', {
  ref: 'Product',
  localField: '_id',
  foreignField: 'category',
  justOne: false,
});

const Category = model<CategoryDocument>('Category', categorySchema);

export default Category;
