import cache from './cache';

class Properties {
  constructor() {
    this.userProps = null;
  }

  getUserProps() {
    if (this.userProps === null) {
      this.userProps = PropertiesService.getUserProperties();
    }
    return this.userProps;
  }

  getUserProperty(key, json = false) {
    const value = this.getUserProps().getProperty(key);
    if (value) {
      cache.setCacheValue(key, value, json);
    }
    return json ? JSON.parse(value || '{}') : value;
  }

  setUserProperty(key, value, json = false) {
    cache.setCacheValue(key, value, json);
    this.getUserProps().setProperty(key, json ? JSON.stringify(value) : value);
  }

  deleteUserProperty(key) {
    this.getUserProps().deleteProperty(key);
  }

  deleteUserProperties() {
    this.getUserProps().deleteAllProperties();
  }
}

const properties = new Properties();
export default properties;
