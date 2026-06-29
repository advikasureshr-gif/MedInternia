import mongoose, { Document, Schema } from "mongoose";

export interface IDiaryEntry {
  day: string;
  content: string;
  createdAt?: Date;
}

export interface IDiary extends Document {
  title: string;
  user: mongoose.Types.ObjectId;
  entries: IDiaryEntry[];
}

const DiaryEntrySchema = new Schema(
  {
    day: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const DiarySchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    entries: [DiaryEntrySchema],
  },
  { timestamps: true }
);

export default mongoose.model<IDiary>("Diary", DiarySchema);