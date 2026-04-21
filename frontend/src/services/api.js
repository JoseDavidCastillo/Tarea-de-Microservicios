const fallbackApiBase = 'http://localhost:8080';

function readEnv(name, fallback = fallbackApiBase) {
  return import.meta.env[name] || import.meta.env.VITE_API_BASE_URL || fallback;
}

export const apiConfig = {
  userApiUrl: readEnv('VITE_USER_API_URL'),
  postsApiUrl: readEnv('VITE_POSTS_API_URL'),
  streamApiUrl: readEnv('VITE_STREAM_API_URL')
};

async function requestJson(url, options = {}) {
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...(options.token ? { Authorization: `Bearer ${options.token}` } : {}),
      ...(options.headers || {})
    },
    method: options.method || 'GET',
    body: options.body ? JSON.stringify(options.body) : undefined
  });

  if (!response.ok) {
    let message = `Request failed with status ${response.status}`;
    try {
      const payload = await response.json();
      message = payload.message || payload.error || message;
    } catch (error) {
      const text = await response.text();
      if (text) {
        message = text;
      }
    }
    throw new Error(message);
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
}

function url(baseUrl, path) {
  return new URL(path, baseUrl).toString();
}

export function fetchStream() {
  return requestJson(url(apiConfig.streamApiUrl, '/api/stream'));
}

export function fetchMe(token) {
  return requestJson(url(apiConfig.userApiUrl, '/api/me'), { token });
}

export function createPost(token, content) {
  return requestJson(url(apiConfig.postsApiUrl, '/api/posts'), {
    token,
    method: 'POST',
    body: { content }
  });
}