// simplistic singleton toast manager
const callbacks = [];
export default {
  success(msg) { callbacks.forEach(cb => cb({ type: 'success', msg })); },
  error(msg) { callbacks.forEach(cb => cb({ type: 'error', msg })); },
  on(cb) { callbacks.push(cb); },
};
