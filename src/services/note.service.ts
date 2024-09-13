import { Note, NoteDocument } from '@/schemas/note.schema';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class NotesService {
    constructor(@InjectModel(Note.name) private noteModel: Model<NoteDocument>) {}

    async createNote(title: string, content: string, userId: string): Promise<Note> {
        const newNote = new this.noteModel({ title, content, userId });
        return newNote.save();
    }

    async findAllNotes(userId: string): Promise<Note[]> {
        return this.noteModel.find({ userId }).exec();
    }

    async findNoteById(id: string, userId: string): Promise<Note> {
        const note = await this.noteModel.findOne({ _id: id, userId }).exec();
        if (!note) {
            throw new NotFoundException('Note not found');
        }
        return note;
    }

    async updateNote(id: string, title: string, content: string, userId: string): Promise<Note> {
        const updatedNote = await this.noteModel
            .findOneAndUpdate({ _id: id, userId }, { title, content }, { new: true })
            .exec();
        if (!updatedNote) {
            throw new NotFoundException('Note not found');
        }
        return updatedNote;
    }

    async deleteNote(id: string, userId: string): Promise<void> {
        const result = await this.noteModel.deleteOne({ _id: id, userId }).exec();
        if (result.deletedCount === 0) {
            throw new NotFoundException('Note not found');
        }
    }
}
