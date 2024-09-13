import { JwtAuthGuard } from '@/guards/jwt-auth.guard';
import { NotesService } from '@/services/note.service';
import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards, Request } from '@nestjs/common';

@Controller('notes')
@UseGuards(JwtAuthGuard) 
export class NotesController {
    constructor(private readonly notesService: NotesService) {}

    @Post()
    async createNote(@Body() body: { title: string, content: string }, @Request() req) {
        const { title, content } = body;
        const userId = req.user.userId;
        return this.notesService.createNote(title, content, userId);
    }

    @Get()
    async getAllNotes(@Request() req) {
        const userId = req.user.userId;
        return this.notesService.findAllNotes(userId);
    }

    @Get(':id')
    async getNoteById(@Param('id') id: string, @Request() req) {
        const userId = req.user.userId;
        return this.notesService.findNoteById(id, userId);
    }

    @Put(':id')
    async updateNote(
        @Param('id') id: string,
        @Body() body: { title: string, content: string },
        @Request() req,
    ) {
        const { title, content } = body;
        const userId = req.user.userId;
        return this.notesService.updateNote(id, title, content, userId);
    }

    @Delete(':id')
    async deleteNote(@Param('id') id: string, @Request() req) {
        const userId = req.user.userId;
        await this.notesService.deleteNote(id, userId);
        return { message: 'Note deleted successfully' };
    }
}
