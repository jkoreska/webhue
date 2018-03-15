
const FakeStorage = function() {
  Object.assign(this, {
    _items: [],
    setItem: (key, item) => this._items[key] = item,
    getItem: key => this._items[key],
    removeItem: key => delete this._items[key],
  });
};

export default FakeStorage;
