import { SERVICE, ACTIONS, ADD_ON } from '../utils/constants';
import { actionCheckAccess } from './auth';

const APPS = [
  {
    title: 'Email Forwarder',
    service: SERVICE.FORWARDER,
    subtitle: 'Forward your email messages from Gmail to any other email address, automatically.'
  },
  {
    title: 'Email Scheduler',
    service: SERVICE.SCHEDULER,
    subtitle:
      'Schedule emails inside Gmail and send them later at your preferred date and time even on a recurring schedule.'
  },
  {
    title: 'Email Auto-Responder',
    service: SERVICE.RESPONDER,
    subtitle: 'Smart auto-replies that help you automatically respond to both old and incoming email messages in Gmail.'
  },
  {
    title: 'Email Merge',
    service: SERVICE.MAILMERGE,
    subtitle: 'Send personalized email messages to multiple Google Contacts from a single draft message in Gmail.'
  },
  {
    title: 'Email Clean Up',
    service: SERVICE.CLEANUP,
    subtitle:
      'Unsubcribe from bulk mails, auto-purge emails that are older than few days, archive redundant messages, or trash them.'
  },
  {
    title: 'Email Draft Copier',
    service: SERVICE.DUPLICATE,
    subtitle:
      'Create multiple copies of any existing draft message in Gmail for sending to different contacts manually.'
  }
];

const getAppSection = ({ title, service, subtitle }) =>
  CardService.newCardSection()
    .addWidget(
      CardService.newTextButton()
        .setText(title)
        .setOnClickAction(
          CardService.newAction()
            .setFunctionName(ACTIONS.SWITCHAPP)
            .setParameters({
              [ACTIONS.SERVICE]: service
            })
        )
    )
    .addWidget(CardService.newTextParagraph().setText(subtitle));

export const buildAddOn = () => {
  actionCheckAccess();
  const card = CardService.newCardBuilder().setHeader(
    CardService.newCardHeader()
      .setTitle(ADD_ON)
      .setSubtitle('Do more with Gmail')
      .setImageStyle(CardService.ImageStyle.SQUARE)
  );

  APPS.forEach(({ title, service, subtitle }) => {
    card.addSection(getAppSection({ title, service, subtitle }));
  });

  return card.build();
};

export const serviceSection = () =>
  CardService.newCardSection()
    .setHeader('Credits')
    .addWidget(
      CardService.newTextParagraph().setText('Email Studio is developed by Digital Inspiration with Google Apps Script')
    )
    .addWidget(
      CardService.newTextButton()
        .setText('Download')
        .setOpenLink(
          CardService.newOpenLink()
            .setUrl('https://digitalinspiration.com/')
            .setOpenAs(CardService.OpenAs.FULL_SIZE)
        )
    );
