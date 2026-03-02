const MOCK_LATENCY = 260;

function delay(value, ms = MOCK_LATENCY) {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms));
}

export function get(path) {
  return delay({ path, data: [] });
}

export function post(path, body) {
  return delay({ path, body, ok: true });
}
