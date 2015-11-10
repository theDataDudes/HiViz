'use strict';

module.exports = () => {
  return (collection, year) => {
    if (collection) {
      return collection.filter( (item) => {
        return item.year == year;
      });
    }
  };
};