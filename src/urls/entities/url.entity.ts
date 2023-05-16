import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Url extends Document {
  @Prop({ index: true })
  userId: string;

  @Prop({ nulleable: true })
  username?: string;

  @Prop({ index: true, unique: true })
  urlId: string;

  @Prop({ index: true })
  url: string;

  @Prop({ index: true })
  title: string;

  @Prop({ nulleable: true })
  password?: string;

  @Prop({ default: 0 })
  counter: number;

  @Prop({ nulleable: true })
  color?: string;

  @Prop({ nulleable: true })
  image?: string;

  @Prop()
  createdAt: Date;

  @Prop({ nulleable: true })
  updatedAt?: Date;

  @Prop({ nulleable: true })
  deletedAt?: Date;
}

export const UrlSchema = SchemaFactory.createForClass(Url);
