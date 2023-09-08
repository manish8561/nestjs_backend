import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type FavoriteDocument = HydratedDocument<Favorite>;

@Schema()
export class Favorite {
  @Prop({ required: true })
  name: string;

  @Prop()
  type: string;

  @Prop()
  url: string;

  @Prop({ default: 'active' })
  status: string;
}

export const FavoriteSchema = SchemaFactory.createForClass(Favorite);
