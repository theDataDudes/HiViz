'use strict';

module.exports = () => {
  return (collection, region) => {
    if (collection) {
      return collection.filter( (item) => {
        return item.region == region;
      });
    }
  };
};