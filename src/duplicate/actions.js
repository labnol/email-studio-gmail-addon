import { getGmailAPI } from '../utils';
import { SERVICE, EMAIL } from '../utils/constants';
import { showErrorNotification } from '../utils/notification';
import { DUPLICATE_FIELDS } from './constants';

const getDuplicateUrl = formInput => {
  const params = {
    service: SERVICE.DUPLICATE,
    [DUPLICATE_FIELDS.COUNT]: formInput[DUPLICATE_FIELDS.COUNT],
    [EMAIL.ID]: formInput[EMAIL.ID]
  };
  return getGmailAPI(params);
};

const openCloneWindow = url => {
  const link = CardService.newOpenLink()
    .setUrl(url)
    .setOpenAs(CardService.OpenAs.FULL_SIZE)
    .setOnClose(CardService.OnClose.NOTHING);

  return CardService.newActionResponseBuilder()
    .setOpenLink(link)
    .setNotification(
      CardService.newNotification()
        .setText('Copying in progress..')
        .setType(CardService.NotificationType.INFO)
    )
    .build();
};

const actionDuplicateDraft = ({ formInput }) => {
  const draft = formInput[EMAIL.ID];
  if (!draft) {
    return showErrorNotification('Please select an email draft');
  }
  return openCloneWindow(getDuplicateUrl(formInput));
};

export default actionDuplicateDraft;
