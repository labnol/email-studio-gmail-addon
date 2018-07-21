import cardGmailCleanup from './cards';
import { ACTIONS, SERVICE } from '../utils/constants';
import { getAddRuleSection } from './cards/edit';
import { actionSearchPreview, actionRunRule } from '../utils/search';
import { showErrorNotification, showInfoNotification } from '../utils/notification';
import { replaceCardNavigation } from '../utils/cards';
import { makeGmailSearchQuery } from '../utils/gmail';
import { updateNode, deleteNode } from '../utils/store';
import { CLEANUP } from './constants';

const service = SERVICE.CLEANUP;

const getCleanupAction = ({ archive, read, unsubscribe, remove, star, trash, target }) => {
  const action = [];
  if (unsubscribe) {
    action.push('Unsubscribe');
  }
  if (remove || trash) {
    action.push(remove ? 'Delete permanently' : 'Move to Trash');
  } else {
    if (archive) action.push('Archive');
    if (read) action.push('Mark as read');
    if (target) action.push(`Apply label "${target}"`);
    if (star) action.push('Star it');
  }
  return action.join(', ');
};

const actionCleanupSaveRule = ({ formInput, parameters }) => {
  const query = makeGmailSearchQuery({
    ...formInput,
    service
  });

  if (query === '') {
    return showErrorNotification('Specify at least one condition');
  }

  const action = getCleanupAction(formInput);

  if (action === '') {
    return showErrorNotification('Select at least one action');
  }

  updateNode(service, parameters.id, {
    ...formInput,
    [CLEANUP.QUERY]: query,
    [CLEANUP.ACTION]: action
  });

  return CardService.newActionResponseBuilder()
    .setNotification(
      CardService.newNotification()
        .setText('Rule added successfully')
        .setType(CardService.NotificationType.INFO)
    )
    .setNavigation(replaceCardNavigation(cardGmailCleanup('Rule added')))
    .build();
};

const actionCleanupDeleteRule = e => {
  deleteNode(service, e.parameters.id);

  return CardService.newActionResponseBuilder()
    .setNotification(
      CardService.newNotification()
        .setText('Rule deleted')
        .setType(CardService.NotificationType.INFO)
    )
    .setNavigation(replaceCardNavigation(cardGmailCleanup('Rule deleted successfully')))
    .build();
};

const actionCleanupEditRule = e => {
  const card = CardService.newCardBuilder()
    .setHeader(
      CardService.newCardHeader()
        .setTitle('Email Clean-up')
        .setSubtitle('Create a Search Query')
    )
    .addSection(getAddRuleSection(e.parameters.id))
    .build();

  return CardService.newActionResponseBuilder()
    .setNavigation(CardService.newNavigation().pushCard(card))
    .build();
};

const actionEmailCleanup = e => {
  switch (e.parameters[ACTIONS.KEY]) {
    case ACTIONS.ADD:
      return actionCleanupEditRule(e);
    case ACTIONS.EDIT:
      return actionCleanupEditRule(e);
    case ACTIONS.DELETE:
      return actionCleanupDeleteRule(e);
    case ACTIONS.SAVE:
      return actionCleanupSaveRule(e);
    case ACTIONS.SEARCH:
      return actionSearchPreview({ ...e, service });
    case ACTIONS.RUN:
      return actionRunRule({ id: e.parameters.id, service });
    default:
      return showInfoNotification('Hello!');
  }
};

export default actionEmailCleanup;
