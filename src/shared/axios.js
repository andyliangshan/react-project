import axios from 'axios';

const instance = axios.create({
  headers: {
    'X-Requested-With': 'XMLHttpRequest'
  }
});

function outputError(error) {
  const { response } = error;

  // eslint-disable-next-line no-console
  console.error(
    '%s\n url: %s\n method: %s\n params: %s\n response: %s',
    error.message,
    response.config.url,
    response.config.method,
    JSON.stringify(response.config.data || response.config.params || null),
    JSON.stringify(response.data)
  );
}

instance.interceptors.response.use((response) => {
  const result = response.data;

  // 符合约定接口格式
  if (result.status != null && (result.msg != null || result.data != null)) {
    if (result.status === 0) {
      return result.data;
    }

    const error = new Error(`Request failed with biz status code ${result.status}${result.msg ? `, ${result.msg}` : ''}`);

    error.name = 'BizError';
    error.response = response;

    if (process.env.NODE_ENV === 'development') {
      outputError(error);
    }

    Promise.reject(error);
  } else {
    return result;
  }
}, (error) => {
  if (process.env.NODE_ENV === 'development') {
    outputError(error);
  }

  return Promise.reject(error);
});

export default instance;
