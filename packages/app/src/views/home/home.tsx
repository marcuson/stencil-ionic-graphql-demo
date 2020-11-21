import { Component, h } from '@stencil/core';
import { graphqlService } from '../../services/graphql.service';
import { getRouter } from '../../utils/routing.utils';
import { NotesGqlQuery } from './notes.gql-def';

@Component({
  tag: 'sig-demo-home',
  styleUrl: 'home.css',
})
export class SigDemoHome {
  graphqlHost: string = graphqlService.graphQLHost;

  async setGrahpQLUrl() {
    graphqlService.setGraphQLUrl(this.graphqlHost);
    window.location.reload();
  }

  goToNotePage(noteId: string) {
    getRouter().push(`/notes/${noteId}`);
  }

  render() {
    return [
      <sig-demo-top-bar topBarTitle="Notes" />,
      <ion-content class="ion-padding" fullscreen>
        <ion-item class="ion-margin-bottom">
          <ion-label position="stacked">GraphQL hostname or IP (you can use "localhost")</ion-label>
          <ion-input
            value={graphqlService.graphQLHost}
            onIonChange={ev => (this.graphqlHost = ev.detail.value)}
          ></ion-input>
          <ion-button slot="end" onClick={() => this.setGrahpQLUrl()}>
            Save
          </ion-button>
        </ion-item>
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
