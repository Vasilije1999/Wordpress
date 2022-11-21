/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "@wordpress/api-fetch":
/*!**********************************!*\
  !*** external ["wp","apiFetch"] ***!
  \**********************************/
/***/ (function(module) {

module.exports = window["wp"]["apiFetch"];

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	!function() {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = function(module) {
/******/ 			var getter = module && module.__esModule ?
/******/ 				function() { return module['default']; } :
/******/ 				function() { return module; };
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
!function() {
/*!*********************************************!*\
  !*** ./assets/src/apps/js/data-controls.js ***!
  \*********************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "apiFetch": function() { return /* binding */ apiFetch; },
/* harmony export */   "controls": function() { return /* binding */ controls; },
/* harmony export */   "dispatch": function() { return /* binding */ dispatch; },
/* harmony export */   "select": function() { return /* binding */ select; }
/* harmony export */ });
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/api-fetch */ "@wordpress/api-fetch");
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0__);


const createRegistryControl = function createRegistryControl(registryControl) {
  registryControl.isRegistryControl = true;
  return registryControl;
};

const apiFetch = request => {
  return {
    type: 'API_FETCH',
    request
  };
};
function select(storeKey, selectorName) {
  for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    args[_key - 2] = arguments[_key];
  }

  return {
    type: 'SELECT',
    storeKey,
    selectorName,
    args
  };
}
function dispatch(storeKey, actionName) {
  for (var _len2 = arguments.length, args = new Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
    args[_key2 - 2] = arguments[_key2];
  }

  return {
    type: 'DISPATCH',
    storeKey,
    actionName,
    args
  };
}

const resolveSelect = (registry, _ref) => {
  let {
    storeKey,
    selectorName,
    args
  } = _ref;
  return new Promise(resolve => {
    const hasFinished = () => registry.select('').hasFinishedResolution(storeKey, selectorName, args);

    const getResult = () => registry.select(storeKey)[selectorName].apply(null, args);

    const result = getResult();

    if (hasFinished()) {
      return resolve(result);
    }

    const unsubscribe = registry.subscribe(() => {
      if (hasFinished()) {
        unsubscribe();
        resolve(getResult());
      }
    });
  });
};

const controls = {
  API_FETCH(_ref2) {
    let {
      request
    } = _ref2;
    return _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0___default()(request);
  },

  SELECT: createRegistryControl(registry => _ref3 => {
    let {
      storeKey,
      selectorName,
      args
    } = _ref3;
    return registry.select(storeKey)[selectorName].hasResolver ? resolveSelect(registry, {
      storeKey,
      selectorName,
      args
    }) : registry.select(storeKey)[selectorName](...args);
  }),
  DISPATCH: createRegistryControl(registry => _ref4 => {
    let {
      storeKey,
      actionName,
      args
    } = _ref4;
    return registry.dispatch(storeKey)[actionName](...args);
  })
};
}();
(window.LP = window.LP || {}).dataControls = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=data-controls.js.map