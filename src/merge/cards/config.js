import { getUserEmail, truncate } from '../../utils';
import { EMAIL } from '../../utils/constants';
import { getGmailDrafts, getGmailAliases } from '../../utils/user';

const getGmailAliasesWidget = () => {
  const emailSelection = CardService.newSelectionInput()
    .setTitle("Sender's Email Address")
    .setFieldName(EMAIL.FROM)
    .setType(CardService.SelectionInputType.RADIO_BUTTON);

  getGmailAliases().forEach(email => {
    emailSelection.addItem(email, email, getUserEmail() === email);
  });

  return emailSelection;
};

const getGmailDraftsSection = () => {
  const selectionInput = CardService.newSelectionInput()
    .setFieldName(EMAIL.DRAFT_ID)
    .setTitle('Select Email Template')
    .setType(CardService.SelectionInputType.DROPDOWN)
    .addItem('Select Gmail draft..', '', true);

  getGmailDrafts().forEach(draft => {
    selectionInput.addItem(truncate(draft[EMAIL.SUBJECT]), draft[EMAIL.ID], false);
  });

  return selectionInput;
};

const addTextInput = (fieldName, title) =>
  CardService.newTextInput()
    .setFieldName(fieldName)
    .setTitle(title);

const getGmailConfigureSection = () =>
  CardService.newCardSection()
    .setHeader('Step 1: Configure Mail Merge')
    .setCollapsible(false)
    .addWidget(getGmailAliasesWidget())
    .addWidget(addTextInput(EMAIL.NAME, "Sender's  Name"))
    .addWidget(addTextInput(EMAIL.REPLYTO, 'Reply-to Address'))
    .addWidget(addTextInput(EMAIL.TO, 'TO Addresses:'))
    .addWidget(addTextInput(EMAIL.CC, 'CC Addresses:'))
    .addWidget(addTextInput(EMAIL.BCC, 'BCC Addresses:'))
    .addWidget(getGmailDraftsSection());

export default getGmailConfigureSection;
