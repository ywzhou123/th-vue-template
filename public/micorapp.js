/**
 * html微应用
 * https://qiankun.umijs.org/zh/guide/tutorial#%E9%9D%9E-webpack-%E6%9E%84%E5%BB%BA%E7%9A%84%E5%BE%AE%E5%BA%94%E7%94%A8
 */

const render = ($) => {
  $('#purehtml-container').html('Hello, render with jQuery');
  return Promise.resolve();
};

((global) => {
  global['purehtml'] = {
    bootstrap: () => {
      console.log('purehtml bootstrap');
      return Promise.resolve();
    },
    mount: () => {
      console.log('purehtml mount');
      return render($);
    },
    unmount: () => {
      console.log('purehtml unmount');
      return Promise.resolve();
    },
  };
  if (window.__POWERED_BY_QIANKUN__) {
    __webpack_public_path__ = window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__
  }
})(window);
