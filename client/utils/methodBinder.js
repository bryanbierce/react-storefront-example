const methodsToSkip = {
  constructor: true,
  render: true
};

function methodBinder() {
  const proto = Object.getPrototypeOf(this);
  const keys = Object.getOwnPropertyNames(proto);
  keys.forEach((key) => {
    if (!methodsToSkip[key] && (typeof this[key] === 'function')) {
      this[key] = this[key].bind(this);
    }
  });
}

export default methodBinder;
