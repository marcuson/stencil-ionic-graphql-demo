import { Component, h } from '@stencil/core';
import { graphqlService } from '../../services/graphql.service';

@Component({
  tag: 'sig-demo-root',
  styleUrl: 'root.css',
})
export class SigDemoRoot {
  render() {
    return (
      <apollo-provider client={graphqlService.client}>
        <ion-app>
          <sig-demo-app-menu></sig-demo-app-menu>
          <ion-router useHash={false}>
            <ion-route url="/" component="sig-demo-home" />
            <ion-route url="/notes/:noteId" component="sig-demo-note-detail" />
            <ion-route url="/about" component="sig-demo-about" />
          </ion-router>
          <ion-nav id="appMenuContent" />
        </ion-app>
      </apollo-provider>
    );
  }
}
