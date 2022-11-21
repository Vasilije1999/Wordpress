/******/ (function() { // webpackBootstrap
var __webpack_exports__ = {};
/*!***************************************************!*\
  !*** ./assets/src/apps/js/admin/admin-notices.js ***!
  \***************************************************/
let elLPAdminNotices = null;
let elBtnDismiss;
let dataHtml = null;
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const tab = urlParams.get('tab');
const urlApiAdminNotices = lpGlobalSettings.rest + 'lp/v1/admin/tools/admin-notices';

const callAdminNotices = function () {
  let set = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  const params = tab ? `?tab=${tab}` : `?${set}`;
  fetch(urlApiAdminNotices + params, {
    method: 'GET'
  }).then(res => res.json()).then(res => {
    // console.log(data);
    const {
      status,
      message,
      data
    } = res;

    if (status === 'success') {
      dataHtml = data.content;

      if (dataHtml.length === 0 && elLPAdminNotices) {
        elLPAdminNotices.style.display = 'none';
      }
    } else {
      dataHtml = message;
    }
  }).catch(err => {
    console.log(err);
  });
};

callAdminNotices();
/*** DOMContentLoaded ***/

document.addEventListener('DOMContentLoaded', () => {
  elLPAdminNotices = document.querySelector('.lp-admin-notices');
  elBtnDismiss = document.querySelector('.btn-lp-notice-dismiss');
  const interval = setInterval(() => {
    if (dataHtml !== null) {
      if (dataHtml.length > 0) {
        elLPAdminNotices.innerHTML = dataHtml;
        elLPAdminNotices.style.display = 'block';
      }

      clearInterval(interval);
    }
  }, 1);
});
/*** Events ***/

document.addEventListener('click', e => {
  const el = e.target;

  if (el.classList.contains('btn-lp-notice-dismiss')) {
    e.preventDefault(); // eslint-disable-next-line no-alert

    if (confirm('Are you sure you want to dismiss this notice?')) {
      const parent = el.closest('.lp-admin-notice');
      callAdminNotices(`dismiss=${el.getAttribute('data-dismiss')}`);
      parent.remove();

      if (elLPAdminNotices.querySelectorAll('.lp-admin-notice').length === 0) {
        elLPAdminNotices.style.display = 'none';
      }
    }
  }
});
/******/ })()
;
//# sourceMappingURL=admin-notices.js.map