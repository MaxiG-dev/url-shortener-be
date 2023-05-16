import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop({ unique: true, index: true })
  username: string;

  @Prop({ unique: true, index: true, nullable: true })
  email?: string;

  @Prop({ nullable: true })
  password?: string;

  @Prop()
  roles: string[];

  @Prop()
  isPremium: boolean;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt?: Date;

  @Prop()
  deletedAt?: Date;

  @Prop()
  foldersIds: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);
