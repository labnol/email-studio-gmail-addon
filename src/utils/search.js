import { makeGmailSearchQuery } from './gmail';
import { getGmailAPI } from '.';

export const actionSearchPreview = e => {
  const input = {
    ...e.formInput,
    service: e.service
  };
  const query = makeGmailSearchQuery(input);
  const url = `https://mail.google.com/mail/#search/${encodeURIComponent(query)}`;

  return CardService.newActionResponseBuilder()
    .setOpenLink(CardService.newOpenLink().setUrl(url))
    .build();
};

export const actionRunRule = e =>
  CardService.newActionResponseBuilder()
    .setOpenLink(
      CardService.newOpenLink()
        .setUrl(getGmailAPI(e))
        .setOpenAs(CardService.OpenAs.FULL_SIZE)
        .setOnClose(CardService.OnClose.NOTHING)
    )
    .build();
