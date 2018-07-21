import cardGmailForward from './cards';
import { getAddRuleSection } from './cards/edit';
import { ACTIONS, SERVICE, EMAIL } from '../utils/constants';
import { actionSearchPreview, actionRunRule } from '../utils/search';
import { showInfoNotification, showErrorNotification } from '../utils/notification';
import { replaceCardNavigation } from '../utils/cards';
import { deleteNode, updateNode } from '../utils/store';
import { makeGmailSearchQuery } from '../utils/gmail';

const service = SERVICE.FORWARDER;

const actionForwardSaveRule = e => {
  const query = makeGmailSearchQuery({
    ...e.formInput,
    service
  });

  if (query === '') {
    return showErrorNotification('Please specify at least one condition');
  }

  if (!e.formInput[EMAIL.FORWARD_TO]) {
    return showErrorNotification('Please specify the forwarding address');
  }

  if (!e.formInput[EMAIL.FORWARD_TO].match(/\S+@\S+/)) {
    return showErrorNotification('Please enter a valid email address');
  }

  updateNode(service, e.parameters.id, {
    ...e.formInput,
    [EMAIL.QUERY]: query
  });

  return CardService.newActionResponseBuilder()
    .setNotification(
      CardService.newNotification()
        .setText('Rule added successfully')
        .setType(CardService.NotificationType.INFO)
    )
    .setNavigation(replaceCardNavigation(cardGmailForward('Rule added')))
    .build();
};

const actionForwardDeleteRule = ({ parameters: { id } }) => {
  deleteNode(service, id);

  return CardService.newActionResponseBuilder()
    .setNotification(
      CardService.newNotification()
        .setText('Rule deleted')
        .setType(CardService.NotificationType.INFO)
    )
    .setNavigation(replaceCardNavigation(cardGmailForward('Rule deleted successfully')))
    .build();
};

const actionForwardEditRule = e => {
  const card = CardService.newCardBuilder()
    .setHeader(
      CardService.newCardHeader()
        .setTitle('Email Forwarder')
        .setSubtitle('Create a Search Query')
    )
    .addSection(getAddRuleSection(e.parameters.id))
    .build();

  return CardService.newActionResponseBuilder()
    .setNavigation(CardService.newNavigation().pushCard(card))
    .build();
};

const actionEmailForwarder = e => {
  switch (e.parameters[ACTIONS.KEY]) {
    case ACTIONS.ADD:
      return actionForwardEditRule(e);
    case ACTIONS.EDIT:
      return actionForwardEditRule(e);
    case ACTIONS.DELETE:
      return actionForwardDeleteRule(e);
    case ACTIONS.SAVE:
      return actionForwardSaveRule(e);
    case ACTIONS.SEARCH:
      return actionSearchPreview({ ...e, service });
    case ACTIONS.RUN:
      return actionRunRule({ id: e.parameters.id, service });
    default:
      return showInfoNotification('Hello!');
  }
};

export default actionEmailForwarder;
