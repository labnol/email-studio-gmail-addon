import { SYSTEM_LABELS, ACTIONS, SERVICE } from '../../utils/constants';
import { getGmailLabels } from '../../utils/user';
import { fetchNode } from '../../utils/store';
import { CLEANUP } from '../constants';
import { truncate } from '../../utils';

const TTL = {
  Anytime: 'Anytime',
  '1d': '1 day ago',
  '2d': '2 days ago',
  '3d': '3 days ago',
  '4d': '4 days ago',
  '5d': '5 days ago',
  '6d': '6 days ago',
  '7d': '1 week ago',
  '14d': '2 weeks ago',
  '21d': '3 weeks ago',
  '1m': '1 month ago',
  '2m': '2 months ago',
  '3m': '3 months ago',
  '4m': '4 months ago',
  '5m': '5 months ago',
  '6m': '6 months ago',
  '1y': '1 year ago',
  '2y': '2 years ago',
  '3y': '3 years ago',
  '4y': '4 years ago',
  '5y': '5 years ago',
  '6y': '6 years ago'
};

const getOlderWidget = (title, fieldName, defaultValue = 'Anytime') => {
  const widget = CardService.newSelectionInput()
    .setFieldName(fieldName)
    .setTitle(title)
    .setType(CardService.SelectionInputType.DROPDOWN);

  Object.keys(TTL).forEach(t => {
    widget.addItem(TTL[t], t, t === defaultValue);
  });

  return widget;
};

const getGmailLabelsWidget = (title, fieldName, defaultLabel = '') => {
  const widget = CardService.newSelectionInput()
    .setFieldName(fieldName)
    .setTitle(title)
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
  const props = fetchNode(SERVICE.CLEANUP, id, {});
  const getInputWidget = (fieldName, fieldTitle) =>
    CardService.newTextInput()
      .setFieldName(fieldName)
      .setTitle(fieldTitle)
      .setValue(props[fieldName] || '');

  const getCBWidget = (fieldName, fieldTitle) =>
    CardService.newSelectionInput()
      .setType(CardService.SelectionInputType.CHECK_BOX)
      .setFieldName(fieldName)
      .addItem(fieldTitle, fieldName, fieldName === props[fieldName]);

  return CardService.newCardSection()
    .addWidget(CardService.newTextParagraph().setText('If all the following conditions are met:'))
    .addWidget(getGmailLabelsWidget('Search', CLEANUP.LABEL, props[CLEANUP.LABEL]))
    .addWidget(getOlderWidget('Received', CLEANUP.OLDER, props[CLEANUP.OLDER]))
    .addWidget(getInputWidget(CLEANUP.FROM, 'From'))
    .addWidget(getInputWidget(CLEANUP.SUBJECT, 'Subject'))
    .addWidget(getInputWidget(CLEANUP.ADVANCED, 'Advanced Search'))
    .addWidget(CardService.newTextParagraph().setText('<br>Do the following to the matched emails:'))
    .addWidget(getCBWidget(CLEANUP.ARCHIVE, 'Archive it'))
    .addWidget(getCBWidget(CLEANUP.READ, 'Mark as Read'))
    .addWidget(getCBWidget(CLEANUP.STAR, 'Star it'))
    .addWidget(getCBWidget(CLEANUP.UNSUBSCRIBE, 'Unsubscribe from List'))
    .addWidget(getCBWidget(CLEANUP.TRASH, 'Move to Trash'))
    .addWidget(getCBWidget(CLEANUP.REMOVE, 'Delete Permanently'))
    .addWidget(getGmailLabelsWidget('Apply the Label', CLEANUP.TARGET, props[CLEANUP.TARGET], ['spam', 'trash']))
    .addWidget(
      CardService.newButtonSet()
        .addButton(
          CardService.newTextButton()
            .setText('Save')
            .setOnClickAction(
              CardService.newAction()
                .setFunctionName(ACTIONS.CLEANUP)
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
                .setFunctionName(ACTIONS.CLEANUP)
                .setParameters({ [ACTIONS.KEY]: ACTIONS.SEARCH })
            )
        )
    );
};

export { getAddRuleSection };
