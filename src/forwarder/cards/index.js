import { SERVICE, ACTIONS, EMAIL } from '../../utils/constants';
import { serviceSection } from '../../ui';
import { createRuleId } from '../../utils';
import { fetchServiceRules } from '../../utils/store';

const getSingleRuleSection = ({ id, ...rule }) =>
  CardService.newCardSection()
    .addWidget(
      CardService.newKeyValue()
        .setTopLabel('Matches:')
        .setContent(rule[EMAIL.QUERY])
        .setMultiline(true)
    )
    .addWidget(
      CardService.newKeyValue()
        .setTopLabel('Do this:')
        .setContent(`Forward to ${rule[EMAIL.FORWARD_TO]}`)
        .setMultiline(true)
    )
    .addWidget(
      CardService.newButtonSet()
        .addButton(
          CardService.newTextButton()
            .setText('Edit')
            .setOnClickAction(
              CardService.newAction()
                .setFunctionName(ACTIONS.FORWARDER)
                .setParameters({ id, [ACTIONS.KEY]: ACTIONS.EDIT })
            )
        )
        .addButton(
          CardService.newTextButton()
            .setText('Run')
            .setOnClickAction(
              CardService.newAction()
                .setFunctionName(ACTIONS.FORWARDER)
                .setParameters({ id, [ACTIONS.KEY]: ACTIONS.RUN })
            )
        )
        .addButton(
          CardService.newTextButton()
            .setText('Delete')
            .setOnClickAction(
              CardService.newAction()
                .setFunctionName(ACTIONS.FORWARDER)
                .setParameters({ id, [ACTIONS.KEY]: ACTIONS.DELETE })
            )
        )
    );

const existingRulesSection = () => {
  const sections = [];
  fetchServiceRules(SERVICE.FORWARDER).forEach(rule => {
    sections.push(getSingleRuleSection(rule));
  });
  return sections;
};

const cardGmailForward = message => {
  const card = CardService.newCardBuilder();
  card.setHeader(
    CardService.newCardHeader()
      .setTitle('Email Forwarder')
      .setSubtitle('Forward your emails to another adddress')
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
          .setFunctionName(ACTIONS.FORWARDER)
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

export default cardGmailForward;
