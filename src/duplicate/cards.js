import { ACTIONS, EMAIL } from '../utils/constants';
import { getGmailDrafts } from '../utils/user';
import { serviceSection } from '../ui';
import { DUPLICATE_FIELDS } from './constants';
import { truncate } from '../utils';

const getGmailDraftsSelection = () => {
  const drafts = getGmailDrafts();
  if (drafts.length === 0) {
    return CardService.newTextParagraph().setText('No Gmail drafts found');
  }

  const selectionInput = CardService.newSelectionInput()
    .setFieldName(EMAIL.ID)
    // .setTitle('Select Gmail Draft')
    .setType(CardService.SelectionInputType.DROPDOWN)
    .addItem('Select Gmail Draft...', '', true);

  getGmailDrafts().forEach(draft => {
    selectionInput.addItem(truncate(draft[EMAIL.SUBJECT]), draft[EMAIL.ID], false);
  });

  return selectionInput;
};

const getCountSelection = () => {
  const selectionInput = CardService.newSelectionInput()
    .setFieldName(DUPLICATE_FIELDS.COUNT)
    .setTitle('Number of Copies')
    .setType(CardService.SelectionInputType.RADIO_BUTTON);

  for (let count = 1; count <= 5; count += 1) {
    selectionInput.addItem(String(count), count, count === 1);
  }

  return selectionInput;
};

const cardGmailDuplicate = () =>
  CardService.newCardBuilder()
    .setHeader(
      CardService.newCardHeader()
        .setTitle('Duplicate Drafts')
        .setSubtitle('Make multiple copies of Gmail drafts')
    )
    .addSection(
      CardService.newCardSection()
        .addWidget(getGmailDraftsSelection())
        .addWidget(getCountSelection())
        .addWidget(
          CardService.newTextButton()
            .setText('Duplicate')
            .setOnClickAction(CardService.newAction().setFunctionName(ACTIONS.DUPLICATE))
        )
    )
    .addSection(serviceSection())
    .build();

export default cardGmailDuplicate;
