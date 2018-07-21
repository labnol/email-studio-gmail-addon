import { SERVICE } from './constants';
import { getGmailAPI } from '.';

export const runBackgroundSendDebugLogs = () =>
  CardService.newUniversalActionResponseBuilder()
    .setOpenLink(
      CardService.newOpenLink()
        .setUrl(getGmailAPI({ service: SERVICE.DEBUG }))
        .setOpenAs(CardService.OpenAs.FULL_SIZE)
        .setOnClose(CardService.OnClose.NOTHING)
    )
    .build();
