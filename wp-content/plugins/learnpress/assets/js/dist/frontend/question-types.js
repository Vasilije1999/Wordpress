/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./assets/src/apps/js/frontend/question-types/components/index.js":
/*!************************************************************************!*\
  !*** ./assets/src/apps/js/frontend/question-types/components/index.js ***!
  \************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FillInBlanks": function() { return /* reexport safe */ _questions_fill_in_blanks__WEBPACK_IMPORTED_MODULE_4__["default"]; },
/* harmony export */   "MultipleChoices": function() { return /* reexport safe */ _questions_multiple_choices__WEBPACK_IMPORTED_MODULE_2__["default"]; },
/* harmony export */   "QuestionBase": function() { return /* reexport safe */ _question_base__WEBPACK_IMPORTED_MODULE_0__["default"]; },
/* harmony export */   "SingleChoice": function() { return /* reexport safe */ _questions_single_choice__WEBPACK_IMPORTED_MODULE_1__["default"]; },
/* harmony export */   "TrueOrFalse": function() { return /* reexport safe */ _questions_true_or_false__WEBPACK_IMPORTED_MODULE_3__["default"]; }
/* harmony export */ });
/* harmony import */ var _question_base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./question-base */ "./assets/src/apps/js/frontend/question-types/components/question-base/index.js");
/* harmony import */ var _questions_single_choice__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./questions/single-choice */ "./assets/src/apps/js/frontend/question-types/components/questions/single-choice/index.js");
/* harmony import */ var _questions_multiple_choices__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./questions/multiple-choices */ "./assets/src/apps/js/frontend/question-types/components/questions/multiple-choices/index.js");
/* harmony import */ var _questions_true_or_false__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./questions/true-or-false */ "./assets/src/apps/js/frontend/question-types/components/questions/true-or-false/index.js");
/* harmony import */ var _questions_fill_in_blanks__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./questions/fill-in-blanks */ "./assets/src/apps/js/frontend/question-types/components/questions/fill-in-blanks/index.js");






/***/ }),

/***/ "./assets/src/apps/js/frontend/question-types/components/question-base/index.js":
/*!**************************************************************************************!*\
  !*** ./assets/src/apps/js/frontend/question-types/components/question-base/index.js ***!
  \**************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__);



/* eslint-disable no-mixed-spaces-and-tabs */



const {
  isArray,
  get,
  set
} = lodash;

class QuestionBase extends _wordpress_element__WEBPACK_IMPORTED_MODULE_1__.Component {
  constructor(_props) {
    super(...arguments);

    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "prepare", (props, state) => {
      const {
        question
      } = props;

      if (question && question.id !== state.questionId) {
        return {
          options: state.self.parseOptions(question.options)
        };
      }

      return null;
    });

    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "setInputRef", (el, k) => {
      if (!this.inputs) {
        this.inputs = {};
      }

      this.inputs[k] = el;
    });

    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "maybeShowCorrectAnswer", () => {
      const {
        status,
        isCheckedAnswer,
        showCorrectReview,
        isReviewing
      } = this.props;
      return status === 'completed' && showCorrectReview || isCheckedAnswer && !isReviewing;
    });

    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "maybeDisabledOption", option => {
      const {
        answered,
        status,
        isCheckedAnswer
      } = this.props;
      return isCheckedAnswer || status !== 'started';
    });

    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "setAnswerChecked", () => event => {
      const {
        updateUserQuestionAnswers,
        question,
        status
      } = this.props;

      if (status !== 'started') {
        return (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('LP Error: can not set answers', 'learnpress');
      }

      const $options = this.$wrap.find('.option-check');
      const answered = [];
      const isSingle = question.type !== 'multi_choice';
      $options.each((i, option) => {
        if (option.checked) {
          answered.push(option.value);

          if (isSingle) {
            return false;
          }
        }
      });
      updateUserQuestionAnswers(question.id, isSingle ? answered[0] : answered);
    });

    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "maybeCheckedAnswer", value => {
      const {
        answered
      } = this.props;

      if (isArray(answered)) {
        return !!answered.find(a => {
          return a == value;
        });
      }

      return value == answered;
    });

    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "getOptionType", (questionType, option) => {
      let type = 'radio';

      switch (questionType) {
        case 'multi_choice':
          type = 'checkbox';
          break;
      }

      return type;
    });

    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "isDefaultType", () => {
      return this.props.supportOptions;
    });

    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "getWarningMessage", () => {
      return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.Fragment, null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('The render function should be overwritten from the base.', 'learnpress'));
    });

    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "getOptionClass", option => {
      const {
        answered
      } = this.props;
      const classes = ['answer-option'];
      return classes;
    });

    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "parseOptions", options => {
      if (options) {
        options = !isArray(options) ? JSON.parse(CryptoJS.AES.decrypt(options.data, options.key, {
          format: CryptoJSAesJson
        }).toString(CryptoJS.enc.Utf8)) : options;
        options = !isArray(options) ? JSON.parse(options) : options;
      }

      return options || [];
    });

    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "getOptions", () => {
      return this.state.options || [];
    });

    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "isCorrect", () => {
      const {
        answered
      } = this.props;

      if (!answered) {
        return false;
      }

      let i, option, options;

      for (i = 0, options = this.getOptions(); i < options.length; i++) {
        option = options[i];

        if (option.isTrue === 'yes') {
          if (answered == option.value) {
            return true;
          }
        }
      }

      return false;
    });

    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "isChecked", () => {
      const {
        question
      } = this.props;
      return (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_2__.select)('learnpress/quiz').isCheckedAnswer(question.id);
    });

    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "getCorrectLabel", () => {
      const {
        status,
        answered,
        question
      } = this.props;
      const checker = LP.config.isQuestionCorrect[question.type] || this.isCorrect;
      const isCorrect = checker.call(this);
      return this.maybeShowCorrectAnswer() && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
        className: `question-response` + (isCorrect ? ' correct' : ' incorrect')
      }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("span", {
        className: "label"
      }, isCorrect ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Correct', 'learnpress') : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Incorrect', 'learnpress')), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("span", {
        className: "point"
      }, sprintf((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('%d/%d point', 'learnpress'), isCorrect ? question.point : 0, question.point)));
    });

    const {
      question: _question
    } = _props;
    this.state = {
      optionClass: ['answer-option'],
      questionId: 0,
      options: _question ? this.parseOptions(_question.options) : [],
      self: this
    };

    if (_props.$wrap) {
      this.$wrap = _props.$wrap;
    }
  }

  static getDerivedStateFromProps(props, state) {
    return state.self.prepare(props, state);
  }

  componentDidMount() {
    const newState = this.prepare(this.props, this.state);

    if (newState) {
      this.setState(newState);
    }
  }

  render() {
    const {
      question,
      status
    } = this.props;
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
      className: "question-answers"
    }, this.isDefaultType() && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("ul", {
      id: `answer-options-${question.id}`,
      className: "answer-options"
    }, this.getOptions().map(option => {
      const ID = `learn-press-answer-option-${option.uid}`;
      return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("li", {
        className: this.getOptionClass(option).join(' '),
        key: `answer-option-${option.uid}`
      }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("input", {
        type: this.getOptionType(question.type, option),
        className: "option-check",
        name: status === 'started' ? `learn-press-question-${question.id}` : '',
        id: ID,
        ref: el => {
          this.setInputRef(el, option.value);
        },
        onChange: this.setAnswerChecked(),
        disabled: this.maybeDisabledOption(option),
        checked: this.maybeCheckedAnswer(option.value),
        value: status === 'started' ? option.value : ''
      }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("label", {
        htmlFor: ID,
        className: "option-title",
        dangerouslySetInnerHTML: {
          __html: option.title || option.value
        }
      }));
    })), !this.isDefaultType() && this.getWarningMessage(), this.getCorrectLabel());
  }

}

/* harmony default export */ __webpack_exports__["default"] = (QuestionBase);

/***/ }),

/***/ "./assets/src/apps/js/frontend/question-types/components/questions/fill-in-blanks/index.js":
/*!*************************************************************************************************!*\
  !*** ./assets/src/apps/js/frontend/question-types/components/questions/fill-in-blanks/index.js ***!
  \*************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _question_base__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../question-base */ "./assets/src/apps/js/frontend/question-types/components/question-base/index.js");





class QuestionFillInBlanks extends _question_base__WEBPACK_IMPORTED_MODULE_3__["default"] {
  constructor() {
    super(...arguments);

    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "updateFibAnswer", () => {
      const allFIBs = document.querySelectorAll('.lp-fib-input > input');
      const {
        answered
      } = this.props;
      const answereds = answered || {};
      [...allFIBs].map(ele => {
        if (answered === undefined) {
          ele.value = '';
        }

        ele.addEventListener('input', e => {
          this.setAnswered(answereds, ele.dataset.id, e.target.value);
        });
        ele.addEventListener('paste', e => {
          this.setAnswered(answereds, ele.dataset.id, e.target.value);
        });
      });
    });

    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "setAnswered", (answered, id, value) => {
      const {
        updateUserQuestionAnswers,
        question,
        status
      } = this.props;

      if (status !== 'started') {
        return 'LP Error: can not set answers';
      }

      const newAnswered = Object.assign(answered, {
        [id]: value
      });
      updateUserQuestionAnswers(question.id, newAnswered);
    });

    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "getCorrectLabel", () => {
      const {
        question,
        mark
      } = this.props;
      let getMark = mark || 0;

      if (mark) {
        if (!Number.isInteger(mark)) {
          getMark = mark.toFixed(2);
        }
      }

      return this.maybeShowCorrectAnswer() && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
        className: "question-response correct"
      }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("span", {
        className: "label"
      }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Points', 'learnpress')), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("span", {
        className: "point"
      }, `${getMark}/${question.point} ${(0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('point', 'learnpress')}`), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("span", {
        className: "lp-fib-note"
      }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("span", {
        style: {
          background: '#00adff'
        }
      }), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Correct', 'learnpress')), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("span", {
        className: "lp-fib-note"
      }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("span", {
        style: {
          background: '#d85554'
        }
      }), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Incorrect', 'learnpress')));
    });

    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "convertInputField", option => {
      const {
        answered,
        isReviewing,
        showCorrectReview,
        isCheckedAnswer
      } = this.props;
      let title = option.title;
      const answers = option === null || option === void 0 ? void 0 : option.answers;
      option.ids.map((id, index) => {
        const textReplace = '{{FIB_' + id + '}}';
        let elContent = '';
        const answerID = answers ? answers === null || answers === void 0 ? void 0 : answers[id] : undefined;

        if (answerID || isReviewing) {
          var _answerID$correct;

          elContent += `<span class="lp-fib-answered ${(showCorrectReview || isCheckedAnswer) && answerID !== null && answerID !== void 0 && answerID.correct ? answerID !== null && answerID !== void 0 && answerID.isCorrect ? 'correct' : 'fail' : ''}">`;

          if (!(answerID !== null && answerID !== void 0 && answerID.isCorrect)) {
            var _answered$id;

            elContent += `<span class="lp-fib-answered__answer">${(_answered$id = answered === null || answered === void 0 ? void 0 : answered[id]) !== null && _answered$id !== void 0 ? _answered$id : ''}</span>`;
          }

          if (!(answerID !== null && answerID !== void 0 && answerID.isCorrect) && answerID !== null && answerID !== void 0 && answerID.correct) {
            elContent += ' → ';
          }

          elContent += `<span class="lp-fib-answered__fill">${(_answerID$correct = answerID === null || answerID === void 0 ? void 0 : answerID.correct) !== null && _answerID$correct !== void 0 ? _answerID$correct : ''}</span>`;
          elContent += '</span>';
        } else {
          elContent += '<div class="lp-fib-input" style="display: inline-block; width: auto;">';
          elContent += '<input type="text" data-id="' + id + '" value="" />';
          elContent += '</div>';
        }

        title = title.replace(textReplace, elContent);
      });
      return title;
    });
  }

  componentDidMount() {
    const {
      answered
    } = this.props;

    if (answered) {
      const allFIBs = document.querySelectorAll('.lp-fib-input > input');
      [...allFIBs].map(ele => {
        if (answered[ele.dataset.id]) {
          ele.value = answered[ele.dataset.id];
        }
      });
    }

    this.updateFibAnswer();
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.answered) {
      this.updateFibAnswer();
    }
  }

  render() {
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
      className: "lp-fib-content"
    }, this.getOptions().map(option => {
      return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
        key: `blank-${option.uid}`,
        dangerouslySetInnerHTML: {
          __html: this.convertInputField(option) || option.value
        }
      });
    })), !this.isDefaultType() && this.getWarningMessage(), this.getCorrectLabel());
  }

}

/* harmony default export */ __webpack_exports__["default"] = (QuestionFillInBlanks);

/***/ }),

/***/ "./assets/src/apps/js/frontend/question-types/components/questions/multiple-choices/index.js":
/*!***************************************************************************************************!*\
  !*** ./assets/src/apps/js/frontend/question-types/components/questions/multiple-choices/index.js ***!
  \***************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _question_base__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../question-base */ "./assets/src/apps/js/frontend/question-types/components/question-base/index.js");




const {
  isBoolean
} = lodash;

class QuestionMultipleChoices extends _question_base__WEBPACK_IMPORTED_MODULE_3__["default"] {
  constructor() {
    super(...arguments);

    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "isCorrect", () => {
      const {
        answered
      } = this.props;

      if (isBoolean(answered) || !answered) {
        return false;
      }

      let i, option, options;

      for (i = 0, options = this.getOptions(); i < options.length; i++) {
        option = options[i];

        if (option.isTrue === 'yes') {
          if (answered.indexOf(option.value) === -1) {
            return false;
          }
        } else if (answered.indexOf(option.value) !== -1) {
          return false;
        }
      }

      return true;
    });

    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "getOptionClass", option => {
      const {
        answered
      } = this.props;
      const optionClass = [...this.state.optionClass];

      if (this.maybeShowCorrectAnswer()) {
        if (option.isTrue === 'yes') {
          optionClass.push('answer-correct');
        }

        if (answered) {
          if (option.isTrue === 'yes') {
            answered.indexOf(option.value) !== -1 && optionClass.push('answered-correct');
          } else {
            answered.indexOf(option.value) !== -1 && optionClass.push('answered-wrong');
          }
        }
      }

      return optionClass;
    });
  }

}

/* harmony default export */ __webpack_exports__["default"] = (QuestionMultipleChoices);

/***/ }),

/***/ "./assets/src/apps/js/frontend/question-types/components/questions/single-choice/index.js":
/*!************************************************************************************************!*\
  !*** ./assets/src/apps/js/frontend/question-types/components/questions/single-choice/index.js ***!
  \************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var _question_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../question-base */ "./assets/src/apps/js/frontend/question-types/components/question-base/index.js");


/* eslint-disable no-mixed-spaces-and-tabs */


class QuestionSingleChoice extends _question_base__WEBPACK_IMPORTED_MODULE_1__["default"] {
  constructor() {
    super(...arguments);

    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "getOptionClass", option => {
      const {
        answered
      } = this.props;
      const optionClass = [...this.state.optionClass];

      if (this.maybeShowCorrectAnswer()) {
        if (option.isTrue === 'yes') {
          optionClass.push('answer-correct');
        }

        if (answered) {
          if (option.isTrue === 'yes') {
            answered === option.value && optionClass.push('answered-correct');
          } else {
            answered === option.value && optionClass.push('answered-wrong');
          }
        }
      }

      return optionClass;
    });
  }

}

/* harmony default export */ __webpack_exports__["default"] = (QuestionSingleChoice);

/***/ }),

/***/ "./assets/src/apps/js/frontend/question-types/components/questions/true-or-false/index.js":
/*!************************************************************************************************!*\
  !*** ./assets/src/apps/js/frontend/question-types/components/questions/true-or-false/index.js ***!
  \************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var _question_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../question-base */ "./assets/src/apps/js/frontend/question-types/components/question-base/index.js");



class QuestionTrueOrFalse extends _question_base__WEBPACK_IMPORTED_MODULE_1__["default"] {
  constructor() {
    super(...arguments);

    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "getOptionClass", option => {
      const {
        answered
      } = this.props;
      const optionClass = [...this.state.optionClass];

      if (this.maybeShowCorrectAnswer()) {
        if (option.isTrue === 'yes') {
          optionClass.push('answer-correct');
        }

        if (answered) {
          if (option.isTrue === 'yes') {
            answered === option.value && optionClass.push('answered-correct');
          } else {
            answered === option.value && optionClass.push('answered-wrong');
          }
        }
      }

      return optionClass;
    });
  }

}

/* harmony default export */ __webpack_exports__["default"] = (QuestionTrueOrFalse);

/***/ }),

/***/ "./assets/src/apps/js/frontend/question-types/index.js":
/*!*************************************************************!*\
  !*** ./assets/src/apps/js/frontend/question-types/index.js ***!
  \*************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FillInBlanks": function() { return /* reexport safe */ _components__WEBPACK_IMPORTED_MODULE_5__.FillInBlanks; },
/* harmony export */   "MultipleChoices": function() { return /* reexport safe */ _components__WEBPACK_IMPORTED_MODULE_5__.MultipleChoices; },
/* harmony export */   "QuestionBase": function() { return /* reexport safe */ _components__WEBPACK_IMPORTED_MODULE_5__.QuestionBase; },
/* harmony export */   "SingleChoice": function() { return /* reexport safe */ _components__WEBPACK_IMPORTED_MODULE_5__.SingleChoice; },
/* harmony export */   "TrueOrFalse": function() { return /* reexport safe */ _components__WEBPACK_IMPORTED_MODULE_5__.TrueOrFalse; }
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/compose */ "@wordpress/compose");
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_compose__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _components__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components */ "./assets/src/apps/js/frontend/question-types/components/index.js");








class QuestionTypes extends _wordpress_element__WEBPACK_IMPORTED_MODULE_1__.Component {
  constructor() {
    super(...arguments);

    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "getQuestion", () => {
      const {
        question
      } = this.props;
      const types = LP.Hook.applyFilters('question-types', {
        single_choice: LP.questionTypes.SingleChoice,
        multi_choice: LP.questionTypes.MultipleChoices,
        true_or_false: LP.questionTypes.TrueOrFalse,
        fill_in_blanks: LP.questionTypes.FillInBlanks
      });
      return types[question.type];
    });
  }

  render() {
    const {
      question,
      supportOptions
    } = this.props;
    const childProps = { ...this.props
    };
    childProps.supportOptions = supportOptions.indexOf(question.type) !== -1;

    const TheQuestion = this.getQuestion() || function () {
      return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
        className: "question-types",
        dangerouslySetInnerHTML: {
          __html: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.sprintf)((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Question <code>%s</code> invalid!', 'learnpress'), question.type)
        }
      });
    };

    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(TheQuestion, childProps));
  }

}

/* harmony default export */ __webpack_exports__["default"] = ((0,_wordpress_compose__WEBPACK_IMPORTED_MODULE_2__.compose)((0,_wordpress_data__WEBPACK_IMPORTED_MODULE_3__.withSelect)((select, _ref) => {
  let {
    question: {
      id
    }
  } = _ref;
  const {
    getData,
    isCheckedAnswer
  } = select('learnpress/quiz');
  return {
    supportOptions: getData('supportOptions'),
    isCheckedAnswer: isCheckedAnswer(id),
    keyPressed: getData('keyPressed'),
    showCorrectReview: getData('showCorrectReview'),
    isReviewing: getData('mode') === 'reviewing'
  };
}), (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_3__.withDispatch)(() => {
  return {};
}))(QuestionTypes));

/***/ }),

/***/ "@wordpress/compose":
/*!*********************************!*\
  !*** external ["wp","compose"] ***!
  \*********************************/
/***/ (function(module) {

module.exports = window["wp"]["compose"];

/***/ }),

/***/ "@wordpress/data":
/*!******************************!*\
  !*** external ["wp","data"] ***!
  \******************************/
/***/ (function(module) {

module.exports = window["wp"]["data"];

/***/ }),

/***/ "@wordpress/element":
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
/***/ (function(module) {

module.exports = window["wp"]["element"];

/***/ }),

/***/ "@wordpress/i18n":
/*!******************************!*\
  !*** external ["wp","i18n"] ***!
  \******************************/
/***/ (function(module) {

module.exports = window["wp"]["i18n"];

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/defineProperty.js ***!
  \*******************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ _defineProperty; }
/* harmony export */ });
function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

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
/*!*******************************************************!*\
  !*** ./assets/src/apps/js/frontend/question-types.js ***!
  \*******************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FillInBlanks": function() { return /* reexport safe */ _question_types_index__WEBPACK_IMPORTED_MODULE_0__.FillInBlanks; },
/* harmony export */   "MultipleChoices": function() { return /* reexport safe */ _question_types_index__WEBPACK_IMPORTED_MODULE_0__.MultipleChoices; },
/* harmony export */   "QuestionBase": function() { return /* reexport safe */ _question_types_index__WEBPACK_IMPORTED_MODULE_0__.QuestionBase; },
/* harmony export */   "SingleChoice": function() { return /* reexport safe */ _question_types_index__WEBPACK_IMPORTED_MODULE_0__.SingleChoice; },
/* harmony export */   "TrueOrFalse": function() { return /* reexport safe */ _question_types_index__WEBPACK_IMPORTED_MODULE_0__.TrueOrFalse; }
/* harmony export */ });
/* harmony import */ var _question_types_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./question-types/index */ "./assets/src/apps/js/frontend/question-types/index.js");


/* harmony default export */ __webpack_exports__["default"] = (_question_types_index__WEBPACK_IMPORTED_MODULE_0__["default"]);
}();
(window.LP = window.LP || {}).questionTypes = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=question-types.js.map