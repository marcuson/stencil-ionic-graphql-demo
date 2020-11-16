import { Component, Event, EventEmitter, h, Prop } from '@stencil/core';
import debounce from 'lodash.debounce';
import { Note } from '../../generated/graphql';
import { graphqlService } from '../../services/graphql.service';
import { nextColor } from '../../utils/colors.utils';
import { NotesGqlQuery } from '../../views/home/notes.gql-def';
import { UpdateNoteGqlQuery } from './note-update.gql-def';

@Component({
  tag: 'sig-demo-note',
  styleUrl: 'note.css',
})
export class SigDemoNote {
  @Prop() note: Note;
  @Prop() isPreview: boolean = false;
  @Prop() isClickable: boolean = false;
  @Prop() showDeleteButton: boolean = false;

  @Event() noteClick: EventEmitter<MouseEvent>;

  editTitle: string = null;
  editMsg: string = null;
  editColor: string = null;

  debounceUpdate = debounce(() => {
    if (this.isPreview) {
      return;
    }

    this.update();
  }, 300);

  async update() {
    await graphqlService.client.mutate<any>({
      mutation: UpdateNoteGqlQuery,
      variables: {
        id: this.note.id,
        note: {
          title: this.isPreview ? undefined : this.editTitle ?? undefined,
          msg: this.isPreview ? undefined : this.editMsg ?? undefined,
          color: this.editColor ?? undefined,
        },
      },
    });
  }

  getMsg(originalMsg: string) {
    const msg = originalMsg
      ? this.isPreview && originalMsg.length > 200
        ? `${originalMsg.substring(0, 197)}...`
        : originalMsg
      : '';
    return msg;
  }

  getStyle() {
    const hexColor = this.note.color;
    const backColor = hexColor ? `#${hexColor}` : '#FFFFFF';

    return { '--background': backColor };
  }

  renderColorChooser() {
    return (
      <ion-button
        slot="end"
        fill="clear"
        onClick={ev => {
          ev.stopPropagation();
          this.editColor = nextColor(this.note.color);
          this.update();
        }}
      >
        <ion-icon icon="color-palette-outline" slot="icon-only"></ion-icon>
      </ion-button>
    );
  }

  renderDelete() {
    if (!this.showDeleteButton) {
      return null;
    }

    return (
      <apollo-delete-note
        slot="end"
        class="ion-no-margin"
        renderer={deleteFn => (
          <ion-button
            fill="clear"
            color="danger"
            onClick={ev => {
              ev.stopPropagation();
              deleteFn({
                variables: {
                  id: this.note.id,
                },
                refetchQueries: [
                  {
                    query: NotesGqlQuery,
                  },
                ],
              });
            }}
          >
            <ion-icon icon="trash-outline" slot="icon-only"></ion-icon>
          </ion-button>
        )}
      ></apollo-delete-note>
    );
  }

  render() {
    return (
      <ion-card
        button={this.isClickable}
        onClick={ev => this.noteClick.emit(ev)}
        class={this.isPreview ? 'preview' : ''}
        style={this.getStyle()}
      >
        <ion-card-header>
          <ion-card-title>
            <ion-input
              class="ion-no-padding"
              placeholder="Title"
              value={this.note.title}
              readonly={this.isPreview}
              onIonChange={ev => {
                this.editTitle = ev.detail.value;
                console.log(this.isPreview, this.editColor, this.editTitle, this.editMsg);
                console.log(ev.type);
                this.debounceUpdate();
              }}
            ></ion-input>
          </ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <ion-textarea
            class="ion-no-padding"
            autoGrow={!this.isPreview}
            placeholder="Note message here..."
            value={this.getMsg(this.note.msg)}
            readonly={this.isPreview}
            onIonChange={ev => {
              this.editMsg = ev.detail.value;
              this.debounceUpdate();
            }}
          ></ion-textarea>
        </ion-card-content>
        <ion-item style={this.getStyle()}>
          {this.renderColorChooser()}
          {this.renderDelete()}
        </ion-item>
      </ion-card>
    );
  }
}
