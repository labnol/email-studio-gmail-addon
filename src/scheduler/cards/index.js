import { SERVICE, ACTIONS } from '../../utils/constants';
import { serviceSection } from '../../ui';
import { fetchServiceRules } from '../../utils/store';

const service = SERVICE.SCHEDULER;

const getAddScheduleSection = message => {
  const section = CardService.newCardSection();
  if (message) section.setHeader(`<b>${message}</b>`);
  return section.addWidget(
    CardService.newTextButton()
      .setText('Add New Schedule')
      .setOnClickAction(
        CardService.newAction()
          .setFunctionName(ACTIONS.SCHEDULER)
          .setParameters({
            [ACTIONS.KEY]: ACTIONS.ADD
          })
      )
  );
};

const getEditSingleSection = ({ id, text, subject }) =>
  CardService.newCardSection()
    .addWidget(
      CardService.newKeyValue()
        .setTopLabel('Draft:')
        .setContent(subject)
        .setMultiline(true)
    )
    .addWidget(
      CardService.newKeyValue()
        .setTopLabel('Schedule:')
        .setContent(text)
        .setMultiline(true)
    )
    .addWidget(
      CardService.newButtonSet()
        .addButton(
          CardService.newTextButton()
            .setText('Edit')
            .setOnClickOpenLinkAction(
              CardService.newAction()
                .setFunctionName(ACTIONS.SCHEDULER)
                .setParameters({ id, [ACTIONS.KEY]: ACTIONS.EDIT })
            )
        )
        .addButton(
          CardService.newTextButton()
            .setText('Delete')
            .setOnClickAction(
              CardService.newAction()
                .setFunctionName(ACTIONS.SCHEDULER)
                .setParameters({ id, [ACTIONS.KEY]: ACTIONS.DELETE })
            )
        )
    );

const existingRulesSection = () => {
  const sections = [];
  fetchServiceRules(service, true).forEach(rule => {
    sections.push(getEditSingleSection(rule));
  });
  return sections;
};

const cardGmailScheduler = message => {
  const card = CardService.newCardBuilder();
  card.setHeader(
    CardService.newCardHeader()
      .setTitle('Email Scheduler')
      .setSubtitle('Send emails later with Gmail')
  );

  const existingRules = existingRulesSection();
  existingRules.forEach(es => card.addSection(es));

  card.addSection(getAddScheduleSection(message));
  card.addSection(serviceSection());

  return card.build();
};

export default cardGmailScheduler;
