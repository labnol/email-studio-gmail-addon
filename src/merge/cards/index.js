import getContactsSection from './contacts';
import getGmailConfigureSection from './config';
import { serviceSection } from '../../ui';
import { ACTIONS } from '../../utils/constants';

const cardGmailMerge = () =>
  CardService.newCardBuilder()
    .setHeader(
      CardService.newCardHeader()
        .setTitle('Mail Merge')
        .setSubtitle('Send personalized emails from Gmail')
    )
    .addSection(getGmailConfigureSection())
    .addSection(getContactsSection())
    .addSection(
      CardService.newCardSection().addWidget(
        CardService.newTextButton()
          .setText('Run Mail Merge')
          .setOnClickAction(
            CardService.newAction()
              .setFunctionName(ACTIONS.MAILMERGE)
              .setParameters({
                [ACTIONS.KEY]: ACTIONS.RUN
              })
          )
      )
    )
    .addSection(serviceSection())
    .build();

export default cardGmailMerge;
