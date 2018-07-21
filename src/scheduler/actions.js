import cardGmailScheduler from './cards';
import { getGmailAPI, createRuleId } from '../utils';
import { SERVICE, ACTIONS, CACHE } from '../utils/constants';
import { showInfoNotification } from '../utils/notification';
import { replaceCardNavigation } from '../utils/cards';
import { deleteNode } from '../utils/store';
import cache from '../utils/cache';

const service = SERVICE.SCHEDULER;

const getSchedulerUrl = (id = createRuleId()) => getGmailAPI({ service, id });

const getSchedulerUrlWithOffset = userTimezone => {
  const { timezone, offset } = userTimezone;
  return getGmailAPI({
    service,
    timezone,
    offset
  });
};

const openSchedulerWindow = url => {
  const link = CardService.newOpenLink()
    .setUrl(url)
    .setOpenAs(CardService.OpenAs.FULL_SIZE)
    .setOnClose(CardService.OnClose.NOTHING);

  return CardService.newActionResponseBuilder()
    .setOpenLink(link)
    .setStateChanged(true)
    .build();
};

const actionScheduleAddRule = ({ userTimezone = {} }) => openSchedulerWindow(getSchedulerUrlWithOffset(userTimezone));
const actionScheduleEditRule = ({ parameters }) => openSchedulerWindow(getSchedulerUrl(parameters.id));

const actionScheduleDeleteRule = e => {
  deleteNode(service, e.parameters.id);

  return CardService.newActionResponseBuilder()
    .setNotification(
      CardService.newNotification()
        .setText('Rule deleted')
        .setType(CardService.NotificationType.INFO)
    )
    .setNavigation(replaceCardNavigation(cardGmailScheduler('Rule deleted successfully')))
    .build();
};

const actionShowGmailScheduler = () =>
  CardService.newActionResponseBuilder()
    .setNavigation(replaceCardNavigation(cardGmailScheduler()))
    .build();

const actionEmailScheduler = e => {
  switch (e.parameters[ACTIONS.KEY]) {
    case ACTIONS.ADD:
      return actionScheduleAddRule(e);
    case ACTIONS.EDIT:
      return actionScheduleEditRule(e);
    case ACTIONS.DELETE:
      return actionScheduleDeleteRule(e);
    case ACTIONS.SHOW:
      cache.deleteCacheValue(CACHE.RULES);
      return actionShowGmailScheduler(e);
    default:
      return showInfoNotification('Hello!');
  }
};

export default actionEmailScheduler;
