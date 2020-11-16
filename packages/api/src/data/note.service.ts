import { Guid } from 'guid-typescript';
import { injectable } from 'inversify';
import { Note } from './note.model';

@injectable()
export class NoteService {
  private _notes: Note[] = [];

  constructor() {}

  async getAll(): Promise<Note[]> {
    return this._notes;
  }

  async getById(id: string): Promise<Note> {
    return this._notes.find((x) => x.id === id);
  }

  async search(text: string): Promise<Note[]> {
    return this._notes.filter((x) => x.title?.toLowerCase()?.indexOf(text.toLowerCase()) !== 0);
  }

  async save(note: Note): Promise<Note> {
    let actNote: Note;

    if (note.id) {
      // update
      actNote = await this.getById(note.id);
    } else {
      // create
      actNote = new Note(Guid.create().toString());
      this._notes.push(actNote);
    }

    Object.assign(actNote, note);

    return actNote;
  }

  async deleteById(id: string): Promise<boolean> {
    const idx = this._notes.findIndex((x) => x.id == id);
    if (idx < 0) {
      return false;
    }

    this._notes.splice(idx, 1);
    return true;
  }
}
