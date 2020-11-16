import { inject, injectable } from 'inversify';
import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import { Note, NoteInput } from '../data/note.model';
import { NoteService } from '../data/note.service';
import { DITypes } from '../di';

@injectable()
@Resolver(Note)
export class NoteResolver {
  constructor(@inject(DITypes.NoteService) private _noteService: NoteService) {}

  @Query((_returns) => [Note])
  async notes() {
    return await this._noteService.getAll();
  }

  @Query((_returns) => Note)
  async note(@Arg('id') id: string) {
    return await this._noteService.getById(id);
  }

  @Query((_returns) => [Note])
  async searchNotes(@Arg('text') text: string) {
    return await this._noteService.search(text);
  }

  @Mutation((_returns) => Note)
  async createNote(@Arg('note') note: NoteInput): Promise<Note> {
    return this._noteService.save(note);
  }

  @Mutation((_returns) => Note)
  async updateNote(@Arg('id') id: string, @Arg('note') note: NoteInput): Promise<Note> {
    const actData: Note = new Note(id);
    Object.assign(actData, note);
    return this._noteService.save(actData);
  }

  @Mutation((_returns) => Boolean)
  async deleteNote(@Arg('id') id: string): Promise<boolean> {
    return await this._noteService.deleteById(id);
  }
}
