import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type VocabularyDocument = Vocabulary & Document;

@Schema({ timestamps: true }) // <-- adds createdAt and updatedAt automatically
export class Vocabulary {
    @Prop({ required: true })
    word: string;

    @Prop({ required: true })
    type: string; // e.g., noun, verb, adjective

    @Prop({ required: true })
    definition: string;

    @Prop()
    example: string;

    @Prop()
    image: string; // URL or path
}

export const VocabularySchema = SchemaFactory.createForClass(Vocabulary);
VocabularySchema.index({ word: 1 });