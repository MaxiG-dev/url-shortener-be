import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class Folder {
    @Prop({ index: true })
    title: string;

    @Prop({ unique: true, index: true })
    userId: string;

    @Prop({ unique: true, index: true })
    urlIds: string[];

}
export const FolderSchema = SchemaFactory.createForClass(Folder);
