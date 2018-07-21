import { CACHE, SERVICE } from './constants';
import cache from './cache';
import properties from './props';

const ACTION = {
  SET: 'SET',
  GET: 'GET'
};

const getPropertyName = (service, key) => [service, key].join('/');

const store = (action, service = '', key = '', json = null) => {
  const name = getPropertyName(service, key);
  switch (action) {
    case ACTION.SET:
      return properties.setUserProperty(name, json);
    case ACTION.GET:
      return properties.getUserProperty(name);
    default:
      return null;
  }
};

export const fetchNode = (service, key, defaultValue = {}) => store(ACTION.GET, service, key, defaultValue);

const updateRulesCache = () => {
  const rules = fetchNode(SERVICE.SERVICEROOT, null, null);
  if (rules) {
    cache.setCacheValue(CACHE.RULES, rules, true);
  } else {
    cache.deleteCacheValue(CACHE.RULES);
  }
  return rules || {};
};

export const updateNode = (service, key, value) => {
  store(ACTION.SET, service, key, value);
  updateRulesCache();
};

export const deleteNode = (service, key) => updateNode(service, key, null);

export const fetchServiceRules = (name = '', refreshCache = false) => {
  const rules = {};
  let data = cache.getCacheValue(CACHE.RULES, true);
  if (refreshCache || !data) {
    data = updateRulesCache();
  }
  Object.keys(data).forEach(service => {
    rules[service] = [];
    Object.keys(data[service])
      .sort()
      .reverse()
      .forEach(id => {
        rules[service].push({
          id,
          ...data[service][id]
        });
      });
  });
  return name ? rules[name] || [] : rules;
};
