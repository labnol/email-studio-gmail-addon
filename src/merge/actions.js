import { SERVICE, EMAIL } from '../utils/constants';
import { addEmails, getGmailAPI } from '../utils';
import { showErrorNotification } from '../utils/notification';
import { updateNode } from '../utils/store';

const service = SERVICE.MAILMERGE;
const actionMailMerge = ({ formInput, formInputs }) => {
  const googleContacts = (formInputs[EMAIL.CONTACTS] || []).join(',').toString();

  const data = {
    ...formInput,
    [EMAIL.TO]: addEmails(formInput[EMAIL.TO], googleContacts)
  };

  if (!data[EMAIL.TO]) {
    return showErrorNotification('Please specify at least one recipient');
  }
  if (!data[EMAIL.DRAFT_ID]) {
    return showErrorNotification('Please select a draft template');
  }
  if (data[EMAIL.TO].replace(/[^@]/g, '').length > 25) {
    return showErrorNotification('Please select < 25 recipients');
  }

  updateNode(service, service, data);

  return CardService.newActionResponseBuilder()
    .setOpenLink(
      CardService.newOpenLink()
        .setUrl(`${getGmailAPI({ service })}`)
        .setOpenAs(CardService.OpenAs.FULL_SIZE)
        .setOnClose(CardService.OnClose.NOTHING)
    )
    .build();
};

export default actionMailMerge;
