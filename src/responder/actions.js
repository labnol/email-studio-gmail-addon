import cardGmailRespond from './cards';
import { getAddRuleSection } from './cards/edit';
import { showErrorNotification, showInfoNotification } from '../utils/notification';
import { actionSearchPreview, actionRunRule } from '../utils/search';
import { ACTIONS, SERVICE, EMAIL } from '../utils/constants';
import { replaceCardNavigation } from '../utils/cards';
import { makeGmailSearchQuery } from '../utils/gmail';
import { updateNode, deleteNode } from '../utils/store';
import { getGmailDrafts } from '../utils/user';

const service = SERVICE.RESPONDER;

const getGmailDraftSubject = id => {
  const drafts = getGmailDrafts();
  for (let d = 0, l = drafts.length; d < l; d += 1) {
    if (drafts[d][EMAIL.ID] === id) {
      return drafts[d][EMAIL.SUBJECT];
    }
  }
  return 'Draft not found';
};

const actionRespondSaveRule = e => {
  const query = makeGmailSearchQuery({
    ...e.formInput,
    service
  });

  if (query === '') {
    return showErrorNotification('Please specify at least one condition');
  }

  if (!e.formInput[EMAIL.DRAFT_ID]) {
    return showErrorNotification('Please select a draft for reply');
  }

  updateNode(service, e.parameters.id, {
    ...e.formInput,
    [EMAIL.QUERY]: query,
    [EMAIL.NAME]: getGmailDraftSubject(e.formInput[EMAIL.DRAFT_ID])
  });

  return CardService.newActionResponseBuilder()
    .setNotification(
      CardService.newNotification()
        .setText('Rule added successfully')
        .setType(CardService.NotificationType.INFO)
    )
    .setNavigation(replaceCardNavigation(cardGmailRespond('Rule added')))
    .build();
};

const actionRespondDeleteRule = e => {
  deleteNode(service, e.parameters.id);

  return CardService.newActionResponseBuilder()
    .setNotification(
      CardService.newNotification()
        .setText('Rule deleted')
        .setType(CardService.NotificationType.INFO)
    )
    .setNavigation(replaceCardNavigation(cardGmailRespond('Rule deleted successfully')))
    .build();
};

const actionRespondEditRule = e => {
  const card = CardService.newCardBuilder()
    .setHeader(
      CardService.newCardHeader()
        .setTitle('Email Responder')
        .setSubtitle('Create a Search Query')
    )
    .addSection(getAddRuleSection(e.parameters.id))
    .build();

  return CardService.newActionResponseBuilder()
    .setNavigation(CardService.newNavigation().pushCard(card))
    .build();
};

const actionEmailResponder = e => {
  switch (e.parameters[ACTIONS.KEY]) {
    case ACTIONS.ADD:
      return actionRespondEditRule(e);
    case ACTIONS.EDIT:
      return actionRespondEditRule(e);
    case ACTIONS.DELETE:
      return actionRespondDeleteRule(e);
    case ACTIONS.SAVE:
      return actionRespondSaveRule(e);
    case ACTIONS.SEARCH:
      return actionSearchPreview({ ...e, service });
    case ACTIONS.RUN:
      return actionRunRule({ id: e.parameters.id, service });
    default:
      return showInfoNotification('Hello!');
  }
};

export default actionEmailResponder;
