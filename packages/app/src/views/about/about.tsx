import { Component, h } from '@stencil/core';

@Component({
  tag: 'sig-demo-about',
  styleUrl: 'about.css',
})
export class SigDemoAbout {
  render() {
    return [
      <sig-demo-top-bar topBarTitle="About" />,
      <ion-content class="ion-padding">
        <p>A simple demo to show Stencil + Ionic + GraphQL awesomeness!</p>
        <p>
          GitHub link{' '}
          <a href="https://github.com" target="_blank">
            here.
          </a>
        </p>
      </ion-content>,
    ];
  }
}
