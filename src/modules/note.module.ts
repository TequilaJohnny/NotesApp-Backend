import { NotesController } from '@/controllers/note.controller';
import { Note, NoteSchema } from '@/schemas/note.schema';
import { NotesService } from '@/services/note.service';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
    imports: [MongooseModule.forFeature([{ name: Note.name, schema: NoteSchema }])],
    controllers: [NotesController],
    providers: [NotesService],
})
export class NotesModule {}
