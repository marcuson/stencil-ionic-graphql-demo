import { Component, h, Prop } from '@stencil/core';
import { NoteQuery } from './note.generated';

@Component({
  tag: 'sig-demo-note-detail',
  styleUrl: 'note-detail.css',
})
export class SigDemoNoteDetail {
  @Prop() noteId: string;

  renderCard(data: NoteQuery) {
    const note = data.note;

    return (
      <sig-demo-note
        note={note}
        isPreview={false}
        isClickable={false}
        showDeleteButton={false}
      ></sig-demo-note>
    );
  }

  render() {
    return [
      <sig-demo-top-bar topBarTitle="Note details" />,
      <ion-content class="ion-padding" fullscreen>
        <apollo-note
          variables={{ id: this.noteId }}
          renderer={({ data, loading }) => {
            if (loading) {
              return 'Loading...';
            }

            return this.renderCard(data);
          }}
        ></apollo-note>
      </ion-content>,
    ];
  }
}
