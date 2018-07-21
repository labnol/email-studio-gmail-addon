import { getGmailAPI, getUserEmail } from '../utils';
import { SERVICE, CACHE, ADD_ON } from '../utils/constants';
import cache from '../utils/cache';
import properties from '../utils/props';

const openLink = service =>
  CardService.newOpenLink()
    .setUrl(getGmailAPI({ service }))
    .setOpenAs(CardService.OpenAs.FULL_SIZE)
    .setOnClose(CardService.OnClose.RELOAD_ADD_ON);

const resetStatus = () => {
  cache.deleteCacheValue(CACHE.STATUS);
  properties.deleteUserProperty(CACHE.STATUS);
};

export const actionLogin = () => {
  resetStatus();
  return CardService.newActionResponseBuilder()
    .setOpenLink(openLink(SERVICE.LOGIN))
    .build();
};

export const actionCheckAccess = () => {
  if (!getUserEmail()) {
    resetStatus();
    CardService.newAuthorizationException()
      .setAuthorizationUrl(getGmailAPI({ service: SERVICE.LOGIN }))
      .setResourceDisplayName(ADD_ON)
      .setCustomUiCallback('createGmailAuthUi')
      .throwException();
  }
};

const createGmailAuthCard = () =>
  CardService.newCardBuilder()
    .setHeader(CardService.newCardHeader().setTitle(`Welcome to ${ADD_ON}`))
    .addSection(
      CardService.newCardSection()
        .addWidget(
          CardService.newImage()
            .setImageUrl('https://digitalinspiration.com/images/email-studio-features.png')
            .setAltText(ADD_ON)
        )
        .addWidget(
          CardService.newTextButton()
            .setText('Log In with Gmail')
            .setOnClickAction(CardService.newAction().setFunctionName('actionLogin'))
        )
    )
    .build();

export const createGmailAuthUi = () => [createGmailAuthCard()];
