import { SYSTEM_LABELS, ACTIONS, SERVICE, EMAIL } from '../../utils/constants';
import { getGmailLabels, getGmailDrafts } from '../../utils/user';
import { fetchNode } from '../../utils/store';
import { truncate } from '../../utils';

const service = SERVICE.RESPONDER;

const getGmailDraftsSelection = (draftId = '') => {
  const drafts = getGmailDrafts();
  if (drafts.length === 0) {
    return CardService.newTextParagraph().setText('No Gmail drafts found');
  }

  const selectionInput = CardService.newSelectionInput()
    .setFieldName(EMAIL.DRAFT_ID)
    .setTitle('Select Gmail Draft')
    .setType(CardService.SelectionInputType.DROPDOWN)
    .addItem('Select Gmail Draft..', '', draftId === '');

  getGmailDrafts().forEach(draft => {
    selectionInput.addItem(truncate(draft[EMAIL.SUBJECT]), draft[EMAIL.ID], draftId === draft[EMAIL.ID]);
  });

  return selectionInput;
};

const getGmailLabelsWidget = (defaultLabel = '') => {
  const widget = CardService.newSelectionInput()
    .setFieldName(EMAIL.LABEL)
    .setTitle('Search')
    .setType(CardService.SelectionInputType.DROPDOWN);

  Object.keys(SYSTEM_LABELS).forEach(label => {
    widget.addItem(label, SYSTEM_LABELS[label], SYSTEM_LABELS[label] === defaultLabel);
  });

  getGmailLabels().forEach(label => {
    widget.addItem(truncate(label), label, label === defaultLabel);
  });

  return widget;
};

const getAddRuleSection = id => {
  const props = fetchNode(service, id, {});
  const getInputWidget = (fieldName, fieldTitle) =>
    CardService.newTextInput()
      .setFieldName(fieldName)
      .setTitle(fieldTitle)
      .setValue(props[fieldName] || '');

  return CardService.newCardSection()
    .addWidget(CardService.newTextParagraph().setText('If all the following conditions are met:'))
    .addWidget(getGmailLabelsWidget(props[EMAIL.LABEL]))
    .addWidget(getInputWidget(EMAIL.FROM, 'From'))
    .addWidget(getInputWidget(EMAIL.TO, 'To'))
    .addWidget(getInputWidget(EMAIL.SUBJECT, 'Subject'))
    .addWidget(getInputWidget(EMAIL.ADVANCED, 'Advanced Search'))
    .addWidget(CardService.newTextParagraph().setText('Respond to matched email with the draft:'))
    .addWidget(getGmailDraftsSelection(props[EMAIL.DRAFT_ID] || ''))
    .addWidget(
      CardService.newButtonSet()
        .addButton(
          CardService.newTextButton()
            .setText('Save')
            .setOnClickAction(
              CardService.newAction()
                .setFunctionName(ACTIONS.RESPONDER)
                .setParameters({
                  id,
                  [ACTIONS.KEY]: ACTIONS.SAVE
                })
            )
        )
        .addButton(
          CardService.newTextButton()
            .setText('Preview')
            .setOnClickAction(
              CardService.newAction()
                .setFunctionName(ACTIONS.RESPONDER)
                .setParameters({ [ACTIONS.KEY]: ACTIONS.SEARCH })
            )
        )
    );
};

export { getAddRuleSection };
