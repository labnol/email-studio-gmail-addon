import { SERVICE } from './constants';

const cleanGmailLabel = label => label.replace(/["&]/g, '').replace(/[/\s()]/g, '-');

export const makeGmailSearchQuery = params => {
  const { service = '', label, To, From, Subject, advanced, older = '', target } = params;
  const statement = [];

  if (label) {
    statement.push(`label:${cleanGmailLabel(label)}`);
  }

  if (older && older !== 'Anytime') {
    statement.push(`older_than:${older}`);
  }

  if (From) {
    statement.push(`from:(${From.trim()})`);
  }

  if (To) {
    statement.push(`to:(${To.trim()})`);
  }

  if (Subject) {
    statement.push(`subject:(${Subject.trim()})`);
  }

  if (advanced) {
    statement.push(`${advanced.trim()}`);
  }

  if (statement.join('').trim() === '') return '';

  if (service === SERVICE.RESPONDER || service === SERVICE.FORWARDER) {
    statement.push(`-label:${service}`);
  }

  if (target) {
    statement.push(`-label:${cleanGmailLabel(target)}`);
  }

  return statement.join(' ').trim();
};
