let active = null;

export let derive = cb => {
  active = cb;
  return cb();
};

export let stream = initialVal => {
  let cbs = new Set();
  let track = () => {
    if (active !== null) {
      cbs.add(active);
      active = null;
    }
  };
  let trigger = () => {
    cbs.forEach(cb => cb());
  };

  let base =
    typeof initialVal === "object"
      ? Object.fromEntries(
          Object.entries(initialVal).map(([k, v]) => [
            k,
            typeof v == "object" ? stream(v) : v,
          ])
        )
      : typeof initialVal === "function"
      ? { val: derive(() => initialVal) }
      : { val: initialVal };
  return new Proxy(base, {
    get(target, value) {
      track();

      return typeof target[value] == "function"
        ? target[value]()
        : target[value];
    },
    set(target, value, nv) {
      target[value] = nv;
      trigger();
      return true;
    },
  });
};
