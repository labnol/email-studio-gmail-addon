import { SERVICE, ACTIONS } from '../../utils/constants';
import { createRuleId } from '../../utils';
import { fetchServiceRules } from '../../utils/store';
import { serviceSection } from '../../ui';
import { CLEANUP } from '../constants';

const getSingleRuleSection = ({ id, ...rule }) =>
  CardService.newCardSection()
    .addWidget(
      CardService.newKeyValue()
        .setTopLabel('Matches:')
        .setContent(rule[CLEANUP.QUERY] || '')
        .setMultiline(true)
    )
    .addWidget(
      CardService.newKeyValue()
        .setTopLabel('Do this:')
        .setContent(rule[CLEANUP.ACTION] || '')
        .setMultiline(true)
    )
    .addWidget(
      CardService.newButtonSet()
        .addButton(
          CardService.newTextButton()
            .setText('Edit')
            .setOnClickAction(
              CardService.newAction()
                .setFunctionName(ACTIONS.CLEANUP)
                .setParameters({
                  id,
                  [ACTIONS.KEY]: ACTIONS.EDIT
                })
            )
        )
        .addButton(
          CardService.newTextButton()
            .setText('Run')
            .setOnClickAction(
              CardService.newAction()
                .setFunctionName(ACTIONS.CLEANUP)
                .setParameters({
                  id,
                  [ACTIONS.KEY]: ACTIONS.RUN
                })
            )
        )
        .addButton(
          CardService.newTextButton()
            .setText('Delete')
            .setOnClickAction(
              CardService.newAction()
                .setFunctionName(ACTIONS.CLEANUP)
                .setParameters({
                  id,
                  [ACTIONS.KEY]: ACTIONS.DELETE
                })
            )
        )
    );

const existingRulesSection = () => {
  const sections = [];
  fetchServiceRules(SERVICE.CLEANUP).forEach(rule => {
    sections.push(getSingleRuleSection(rule));
  });
  return sections;
};

const cardGmailCleanup = message => {
  const card = CardService.newCardBuilder();
  card.setHeader(
    CardService.newCardHeader()
      .setTitle('Email Clean-up')
      .setSubtitle('Keep your Gmail mailbox tidy')
  );

  const existingRules = existingRulesSection();
  existingRules.forEach(es => card.addSection(es));

  const section = CardService.newCardSection();
  if (message) section.setHeader(`<b>${message}</b>`);
  section.addWidget(
    CardService.newTextButton()
      .setText('Add New Rule')
      .setOnClickAction(
        CardService.newAction()
          .setFunctionName(ACTIONS.CLEANUP)
          .setParameters({
            id: createRuleId(),
            [ACTIONS.KEY]: ACTIONS.ADD
          })
      )
  );
  card.addSection(section);
  card.addSection(serviceSection());
  return card.build();
};

export default cardGmailCleanup;
