class Cache {
  constructor() {
    this.cache = null;
  }

  getCache() {
    if (this.cache === null) {
      this.cache = CacheService.getUserCache();
    }
    return this.cache;
  }

  getCacheValue(key, json = false) {
    try {
      const value = this.getCache().get(key);
      if (value) {
        return json ? JSON.parse(value) : value;
      }
    } catch (f) {
      console.error(f);
    }
    return null;
  }

  setCacheValue(key, value, json = false) {
    try {
      if (!value || (json && !Object.keys(value).length)) {
        this.deleteCacheValue(key);
        return;
      }
      this.getCache().put(key, json ? JSON.stringify(value) : value, 21600);
    } catch (f) {
      console.error(f);
    }
  }

  setCacheValues(json) {
    this.getCache().putAll(json, 21600);
  }

  deleteCacheValue(key) {
    this.getCache().remove(key);
  }

  deleteCacheValues(keys) {
    this.getCache().removeAll(keys);
  }
}

const cache = new Cache();
export default cache;
