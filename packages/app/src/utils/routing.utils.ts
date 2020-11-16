import { Components } from '@ionic/core';

const _getRouter = (): Components.IonRouter => {
  const ionRouter = document.querySelector('ion-router');
  return ionRouter;
};

export const getRouter = _getRouter;
