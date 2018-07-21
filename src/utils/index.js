const START_TIME = Date.now();
const MAX_EXECUTION_TIME = 1000 * 60 * 5;

export const isTimeUp = () => Date.now() > MAX_EXECUTION_TIME + START_TIME;
export const isTimeLeft = () => !isTimeUp();

const MAX_RETRIES = 4;
export const expBackoff = func => {
  for (let n = 0; n < MAX_RETRIES; n += 1) {
    try {
      return func();
    } catch (e) {
      if (n === MAX_RETRIES - 1) {
        throw e;
      }
      Utilities.sleep(2 ** n * 1000 + Math.round(Math.random() * 1000));
    }
  }
  return null;
};

export const zip = content =>
  expBackoff(() => Utilities.base64Encode(Utilities.zip([Utilities.newBlob(content)]).getBytes()));

export const unzip = content =>
  expBackoff(() =>
    Utilities.unzip(Utilities.newBlob(Utilities.base64Decode(content), 'application/zip'))[0].getDataAsString()
  );

export const getUserEmail = () => Session.getActiveUser().getEmail() || Session.getEffectiveUser().getEmail();

const buildQueryString = params =>
  Object.keys(params)
    .map(k => `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`)
    .join('&');

export const getGmailAPI = params => {
  const BASE_URL = 'https://emailstudio.pro';
  const API_PATH = buildQueryString({ user: getUserEmail(), ...params });
  return `${BASE_URL}?${API_PATH}`;
};

export const addEmails = (...args) => {
  try {
    return args
      .join(',')
      .trim()
      .replace(/^,+|,+$/g, '')
      .replace(/,+/g, ',');
  } catch (f) {
    console.error(f);
  }
  return '';
};

export const createRuleId = () => Utilities.formatDate(new Date(), 'GMT', 'YYYYMMddhhmmss');

export const truncate = (text = '', n = 38) => (text.length > n ? `${text.substr(0, n - 1)}...` : text);
