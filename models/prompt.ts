import { Document } from 'mongodb';
import { Schema, model, models } from 'mongoose';
import { IUser } from './user';

export interface IPrompt extends Document {
  creator: IUser;
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
