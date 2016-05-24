const DEFAULTS = {
  delay: 500,
};

export default function debounce (func, delay) {
  let timeout;

  return function () {
    const scope = this;
    clearTimeout(timeout);

    timeout = setTimeout(() => {
      func.apply(scope, arguments);
    }, delay || DEFAULTS.delay);
  };
}
