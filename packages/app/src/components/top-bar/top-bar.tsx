import { Component, h, Prop } from '@stencil/core';

@Component({
  tag: 'sig-demo-top-bar',
  styleUrl: 'top-bar.css',
})
export class TopBar {
  @Prop() topBarTitle: string = '[NO TITLE]';

  render() {
    const elements = [
      <ion-header>
        <ion-toolbar color="primary">
          <ion-buttons slot="start">
            <ion-menu-button menu="appMenu"></ion-menu-button>
          </ion-buttons>
          <ion-title>{this.topBarTitle}</ion-title>
        </ion-toolbar>
      </ion-header>,
    ];

    return elements;
  }
}
