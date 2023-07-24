import { Document } from 'mongodb';
import { Schema, Types, model, models } from 'mongoose';

export interface IPrompt extends Document {
  creator: Types.ObjectId;
  prompt: string;
  tag: string;
}

const PromptSchema = new Schema<IPrompt>({
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  prompt: {
    type: String,
    requiered: [true, 'Prompt is required.']
  },
  tag: {
    type: String,
    required: [true, 'Tag is required.']
  }
});

const Prompt = models.Prompt<IPrompt> || model('Prompt', PromptSchema);
export default Prompt;
