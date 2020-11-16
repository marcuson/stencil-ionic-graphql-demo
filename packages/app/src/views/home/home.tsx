import { Component, h } from '@stencil/core';
import { getRouter } from '../../utils/routing.utils';
import { NotesGqlQuery } from './notes.gql-def';

@Component({
  tag: 'sig-demo-home',
  styleUrl: 'home.css',
})
export class SigDemoHome {
  goToNotePage(noteId: string) {
    getRouter().push(`/notes/${noteId}`);
  }

  render() {
    return [
      <sig-demo-top-bar topBarTitle="Notes" />,
      <ion-content class="ion-padding" fullscreen>
        <apollo-notes
          renderer={({ data, loading }) => {
            if (loading) {
              return 'Loading...';
            }

            if (!data.notes?.length) {
              return <ion-text>No notes yet!</ion-text>;
            }

            return data.notes.map(note => {
              return (
                <sig-demo-note
                  note={note}
                  isPreview={true}
                  isClickable={true}
                  showDeleteButton={true}
                  onNoteClick={() => this.goToNotePage(note.id)}
                ></sig-demo-note>
              );
            });
          }}
        ></apollo-notes>
        <apollo-add-note
          renderer={createFn => {
            return (
              <ion-fab vertical="bottom" horizontal="end" slot="fixed">
                <ion-fab-button
                  onClick={() => {
                    createFn({
                      refetchQueries: [
                        {
                          query: NotesGqlQuery,
                        },
                      ],
                    });
                  }}
                >
                  <ion-icon name="add-outline"></ion-icon>
                </ion-fab-button>
              </ion-fab>
            );
          }}
        ></apollo-add-note>
      </ion-content>,
    ];
  }
}
