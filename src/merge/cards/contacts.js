import cache from '../../utils/cache';
import { expBackoff } from '../../utils';
import { CACHE, EMAIL } from '../../utils/constants';

const fetchGoogleContacts = () => {
  try {
    const token = ScriptApp.getOAuthToken();
    const url = `https://www.google.com/m8/feeds/contacts/default/thin?access_token=${token}&alt=json&max-results=499`;
    const response = expBackoff(() => UrlFetchApp.fetch(url));
    return JSON.parse(response.getContentText()).feed.entry;
  } catch (f) {
    return [];
  }
};

const getContactsSection = () => {
  let contacts = cache.getCacheValue(CACHE.CONTACTS, true);
  if (!contacts) {
    contacts = {};
    fetchGoogleContacts().forEach(contact => {
      const emails = [];
      (contact.gd$email || []).forEach(({ address = '' }) => {
        if (address.match(/\S+@\S+\.\S+/)) {
          emails.push(address.toLowerCase().trim());
        }
      });
      if (emails.length) {
        let value = emails[0];
        if (contact.title.$t) {
          value = `${contact.title.$t} <${emails[0]}>`;
        }
        contacts[value] = contact.title.$t || emails[0];
      }
    });
    cache.setCacheValue(CACHE.CONTACTS, contacts, true);
  }

  const contactsGroup = CardService.newSelectionInput()
    .setFieldName(EMAIL.CONTACTS)
    // .setTitle('Google Contacts')
    .setType(CardService.SelectionInputType.CHECK_BOX);

  Object.keys(contacts)
    .sort()
    .forEach(contact => {
      contactsGroup.addItem(contacts[contact], contact, false);
    });

  contactsGroup.addItem('noreply@example.com', 'Test Email <noreply@example.com>', false);

  const section = CardService.newCardSection();
  section.setHeader('Add Google Contacts');
  section.setCollapsible(true);
  section.addWidget(contactsGroup);

  return section;
};

export default getContactsSection;
