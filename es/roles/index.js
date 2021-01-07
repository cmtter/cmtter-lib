import workHander from './work/work-hander.js';
export { default as workHander } from './work/work-hander.js';

function workEs(a) {
  return workHander(a) + '-';
}

export { workEs };
