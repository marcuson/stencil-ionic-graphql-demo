import { menuController } from '@ionic/core';
import { Component, h } from '@stencil/core';

@Component({
  tag: 'sig-demo-app-menu',
  styleUrl: 'app-menu.css',
})
export class MshAppMenu {
  private links: { icon: string; text: string; href: string }[] = [
    {
      icon: 'documents-outline',
      text: 'Notes',
      href: '/',
    },
    {
      icon: 'information-circle',
      text: 'About',
      href: '/about',
    },
  ];

  handleLinkClick() {
    menuController.close('appMenu');
  }

  render() {
    const linkElements = this.links.map(l => (
      <ion-item href={l.href} onClick={_ev => this.handleLinkClick()}>
        <ion-icon name={l.icon} slot="start"></ion-icon>
        <ion-label>{l.text}</ion-label>
      </ion-item>
    ));

    const elements = [
      <ion-menu menuId="appMenu" contentId="appMenuContent">
        <ion-header>
          <ion-toolbar>
            <ion-title>SIG Demo</ion-title>
          </ion-toolbar>
        </ion-header>
        <ion-content>
          <ion-list lines="full" class="ion-no-padding">
            {linkElements}
          </ion-list>
        </ion-content>
      </ion-menu>,
    ];

    return elements;
  }
}
