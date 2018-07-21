export const getGmailLabels = () =>
  Gmail.Users.Labels.list('me')
    .labels.map(({ name }) => name)
    .sort();

export const getGmailDrafts = () => Gmail.Users.Drafts.list('me').drafts.map(({ id }) => id);

export const getGmailAliases = () =>
  Gmail.Users.Settings.SendAs.list('me')
    .sendAs.map(alias => alias.sendAsEmail)
    .sort();
