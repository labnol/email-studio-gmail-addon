import { SERVICE } from '../utils/constants';
import { showErrorNotification } from '../utils/notification';
import cardGmailScheduler from '../scheduler/cards';
import cardGmailForward from '../forwarder/cards';
import cardGmailRespond from '../responder/cards';
import cardGmailDuplicate from '../duplicate/cards';
import cardGmailCleanup from '../cleanup/cards';
import cardGmailMerge from '../merge/cards';
import { replaceCardNavigation } from '../utils/cards';

const pushCard = card =>
  CardService.newActionResponseBuilder()
    .setNavigation(replaceCardNavigation(card))
    .build();

export const actionEmailStudio = e => {
  const { formInput = {}, parameters = {} } = e;
  switch (formInput.service || parameters.service) {
    case SERVICE.FORWARDER:
      return pushCard(cardGmailForward());
    case SERVICE.SCHEDULER:
      return pushCard(cardGmailScheduler());
    case SERVICE.RESPONDER:
      return pushCard(cardGmailRespond());
    case SERVICE.DUPLICATE:
      return pushCard(cardGmailDuplicate());
    case SERVICE.CLEANUP:
      return pushCard(cardGmailCleanup());
    case SERVICE.MAILMERGE:
      return pushCard(cardGmailMerge());
    default:
      return showErrorNotification(':(');
  }
};
