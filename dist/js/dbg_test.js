(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _InvalidFormatError = require("exceptions/InvalidFormatError");

var _InvalidFormatError2 = _interopRequireDefault(_InvalidFormatError);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AnnotationData = function () {
    //  Public

    function AnnotationData(source_data, parent) {
        _classCallCheck(this, AnnotationData);

        this._valudateInput(source_data, parent);
        this._id = source_data.id;
        this._start_pos = source_data.start_pos;
        this._end_pos = source_data.end_pos;
        this._type = source_data.type;
        this._properties = source_data.properties;
        this._props_types = Object.keys(this._properties);
        this._props_types.sort();
    }

    _createClass(AnnotationData, [{
        key: "getPropertyName",
        value: function getPropertyName(key) {
            return key;
        }
    }, {
        key: "getPropertyValue",
        value: function getPropertyValue(key) {
            if (!(key in this._properties)) {
                return null;
            }
            return this._properties[key];
        }
    }, {
        key: "_valudateInput",


        // Private

        value: function _valudateInput(source_data, parent) {
            var MANDATORY_FILEDS = {
                "id": function id(x) {
                    return typeof x === "string";
                },
                "start_pos": function start_pos(x) {
                    return Number.isInteger(x);
                },
                "end_pos": function end_pos(x) {
                    return Number.isInteger(x);
                },
                "type": function type(x) {
                    return typeof x === "string";
                },
                "properties": function properties(x) {
                    if ((typeof x === "undefined" ? "undefined" : _typeof(x)) !== "object" || Array.isArray(x)) {
                        return false;
                    }
                    var _iteratorNormalCompletion = true;
                    var _didIteratorError = false;
                    var _iteratorError = undefined;

                    try {
                        for (var _iterator = Object.keys(x)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                            var key = _step.value;

                            if (typeof x[key] !== "string") {
                                return false;
                            }
                        }
                    } catch (err) {
                        _didIteratorError = true;
                        _iteratorError = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion && _iterator.return) {
                                _iterator.return();
                            }
                        } finally {
                            if (_didIteratorError) {
                                throw _iteratorError;
                            }
                        }
                    }

                    return true;
                }
            };
            if ((typeof source_data === "undefined" ? "undefined" : _typeof(source_data)) !== "object" || Array.isArray(source_data)) {
                throw new _InvalidFormatError2.default("All annotations should be objects");
            }
            if ("children" in source_data && !Array.isArray(source_data.children)) {
                throw new _InvalidFormatError2.default("Invalid children propery in annotation with id " + source_data.id);
            }
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = Object.keys(MANDATORY_FILEDS)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var field = _step2.value;

                    if (!(field in source_data)) {
                        throw new _InvalidFormatError2.default("Missing " + field + " field in annotation with id " + source_data.id);
                    }
                    if (!MANDATORY_FILEDS[field](source_data[field])) {
                        throw new _InvalidFormatError2.default("Failed validation for " + field + " field in annotation with id " + source_data.id);
                    }
                }
            } catch (err) {
                _didIteratorError2 = true;
                _iteratorError2 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
                        _iterator2.return();
                    }
                } finally {
                    if (_didIteratorError2) {
                        throw _iteratorError2;
                    }
                }
            }

            if (source_data.start_pos >= source_data.end_pos) {
                throw new _InvalidFormatError2.default("end_pos should be greater than start_pos in annotation with id " + source_data.id);
            }
            if (source_data.start_pos < 0) {
                throw new _InvalidFormatError2.default("end_pos should be >= 0 in annotation with id " + source_data.id);
            }
            if (source_data.end_pos > parent.document_text.length) {
                throw new _InvalidFormatError2.default("Annotation with id " + source_data.id + " exceeds document text length");
            }
        }
    }, {
        key: "id",
        get: function get() {
            return this._id;
        }
    }, {
        key: "start_pos",
        get: function get() {
            return this._start_pos;
        }
    }, {
        key: "end_pos",
        get: function get() {
            return this._end_pos;
        }
    }, {
        key: "type",
        get: function get() {
            return this._type;
        }
    }, {
        key: "props_types",
        get: function get() {
            return this._props_types;
        }
    }]);

    return AnnotationData;
}();

exports.default = AnnotationData;

},{"exceptions/InvalidFormatError":4}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _InvalidFormatError = require("exceptions/InvalidFormatError");

var _InvalidFormatError2 = _interopRequireDefault(_InvalidFormatError);

var _AnnotationData = require("./AnnotationData");

var _AnnotationData2 = _interopRequireDefault(_AnnotationData);

var _tools = require("common/tools");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AnnotationsList = function () {
    // Public

    function AnnotationsList(source_data) {
        var _this = this;

        _classCallCheck(this, AnnotationsList);

        this._validateInput(source_data);
        this._document_text = source_data["document_text"];
        this._annotations = source_data["annotations"].map(function (annotation) {
            return new _AnnotationData2.default(annotation, _this);
        });
        this._buildIdIndex();
        this._buildDisjointList();
    }

    _createClass(AnnotationsList, [{
        key: "getById",
        value: function getById(id) {
            if (!this._id_index.has(id)) {
                throw (0, _InvalidFormatError2.default)("Invalid id referenced: " + id);
            }
            return this._id_index.get(id);
        }
    }, {
        key: "_validateInput",


        // Private

        value: function _validateInput(source_data) {
            if (!("document_text" in source_data)) {
                throw new _InvalidFormatError2.default("Missing document_text property on the top level");
            }
            if (!("annotations" in source_data)) {
                throw new _InvalidFormatError2.default("Missing annotations property on the top level");
            }
            if (typeof source_data["document_text"] !== "string") {
                throw new _InvalidFormatError2.default("document_text property on the top level should be of type string");
            }
            if (!Array.isArray(source_data["annotations"])) {
                throw new _InvalidFormatError2.default("annotations property on the top level should be an array");
            }
        }
    }, {
        key: "_buildIdIndex",
        value: function _buildIdIndex() {
            this._id_index = new Map();
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = this._annotations[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var annotation = _step.value;

                    var id = annotation.id;
                    if (this._id_index.has(id)) {
                        throw new _InvalidFormatError2.default("Duplicated ID: " + id);
                    }
                    this._id_index.set(id, annotation);
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }
        }
    }, {
        key: "_buildDisjointList",
        value: function _buildDisjointList() {
            var points = new Map([[0, []], [this._document_text.length, []]]);

            function addPoint(pos, type, annotation) {
                if (!points.has(pos)) {
                    points.set(pos, []);
                }
                points.get(pos).push({ type: type, annotation: annotation });
            }

            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = this._annotations[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var annotation = _step2.value;

                    addPoint(annotation.start_pos, "B", annotation);
                    addPoint(annotation.end_pos, "E", annotation);
                }
            } catch (err) {
                _didIteratorError2 = true;
                _iteratorError2 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
                        _iterator2.return();
                    }
                } finally {
                    if (_didIteratorError2) {
                        throw _iteratorError2;
                    }
                }
            }

            var points_values = (0, _tools.iterToArray)(points.keys());
            points_values.sort(function (a, b) {
                return a - b;
            });

            var latest_pos = null;
            var result = [];
            var buffer = new Set();

            var _iteratorNormalCompletion3 = true;
            var _didIteratorError3 = false;
            var _iteratorError3 = undefined;

            try {
                for (var _iterator3 = points_values[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                    var point_value = _step3.value;

                    if (latest_pos !== null) {
                        result.push({
                            text: this._document_text.slice(latest_pos, point_value),
                            annotations: (0, _tools.iterToArray)(buffer)
                        });
                    }
                    var _iteratorNormalCompletion4 = true;
                    var _didIteratorError4 = false;
                    var _iteratorError4 = undefined;

                    try {
                        for (var _iterator4 = points.get(point_value)[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                            var point = _step4.value;

                            if (point.type === "B") {
                                buffer.add(point.annotation);
                            } else {
                                buffer.delete(point.annotation);
                            }
                        }
                    } catch (err) {
                        _didIteratorError4 = true;
                        _iteratorError4 = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion4 && _iterator4.return) {
                                _iterator4.return();
                            }
                        } finally {
                            if (_didIteratorError4) {
                                throw _iteratorError4;
                            }
                        }
                    }

                    latest_pos = point_value;
                }
            } catch (err) {
                _didIteratorError3 = true;
                _iteratorError3 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion3 && _iterator3.return) {
                        _iterator3.return();
                    }
                } finally {
                    if (_didIteratorError3) {
                        throw _iteratorError3;
                    }
                }
            }

            this._disjoint_list = result;
        }
    }, {
        key: "document_text",
        get: function get() {
            return this._document_text;
        }
    }, {
        key: "annotations",
        get: function get() {
            return this._annotations;
        }
    }, {
        key: "disjoint_annotations",
        get: function get() {
            return this._disjoint_list;
        }
    }]);

    return AnnotationsList;
}();

exports.default = AnnotationsList;

},{"./AnnotationData":1,"common/tools":3,"exceptions/InvalidFormatError":4}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.iterToArray = iterToArray;
function iterToArray(iterator) {
    var result = [];
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = iterator[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var e = _step.value;

            result.push(e);
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }

    return result;
}

},{}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _MyException2 = require("./MyException");

var _MyException3 = _interopRequireDefault(_MyException2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var InvalidFormatError = function (_MyException) {
    _inherits(InvalidFormatError, _MyException);

    function InvalidFormatError(message) {
        _classCallCheck(this, InvalidFormatError);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(InvalidFormatError).call(this, "Invalid format: " + message));
    }

    return InvalidFormatError;
}(_MyException3.default);

exports.default = InvalidFormatError;

},{"./MyException":5}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MyException = function (_Error) {
  _inherits(MyException, _Error);

  function MyException() {
    _classCallCheck(this, MyException);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(MyException).apply(this, arguments));
  }

  return MyException;
}(Error);

exports.default = MyException;

},{}],6:[function(require,module,exports){
"use strict";

var _AnnotationsList = require("classes/AnnotationsList");

var _AnnotationsList2 = _interopRequireDefault(_AnnotationsList);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

window.AnnotationsList = _AnnotationsList2.default;

window.SAMPLE_DATA = {
    "document_text": "Alexander S. Pushkin was born on 26 May 1799.",
    "annotations": [{
        "id": "1",
        "start_pos": 0,
        "end_pos": 20,
        "type": "Entity",
        "properties": {
            "Part": "Noun",
            "Is proper": "Yes"
        }
    }, {
        "id": "2",
        "start_pos": 21,
        "end_pos": 29,
        "type": "Entity",
        "properties": {
            "Part": "Verb",
            "Tense": "Past"
        }
    }, {
        "id": "3",
        "start_pos": 33,
        "end_pos": 44,
        "type": "Date",
        "properties": {
            "Day": "26",
            "Month": "May",
            "Year": "1799"
        }
    }]
};

},{"classes/AnnotationsList":2}]},{},[6])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJqc3hcXGNsYXNzZXNcXEFubm90YXRpb25zTGlzdFxcQW5ub3RhdGlvbkRhdGEuanN4IiwianN4XFxjbGFzc2VzXFxBbm5vdGF0aW9uc0xpc3RcXGluZGV4LmpzeCIsImpzeFxcY29tbW9uXFx0b29scy5qc3giLCJqc3hcXGV4Y2VwdGlvbnNcXEludmFsaWRGb3JtYXRFcnJvci5qc3giLCJqc3hcXGV4Y2VwdGlvbnNcXE15RXhjZXB0aW9uLmpzeCIsImpzeFxcdGVzdC5qc3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7O0lBR3FCLGM7OztBQUdqQiw0QkFBWSxXQUFaLEVBQXlCLE1BQXpCLEVBQWlDO0FBQUE7O0FBQzdCLGFBQUssY0FBTCxDQUFvQixXQUFwQixFQUFpQyxNQUFqQztBQUNBLGFBQUssR0FBTCxHQUFXLFlBQVksRUFBdkI7QUFDQSxhQUFLLFVBQUwsR0FBa0IsWUFBWSxTQUE5QjtBQUNBLGFBQUssUUFBTCxHQUFnQixZQUFZLE9BQTVCO0FBQ0EsYUFBSyxLQUFMLEdBQWEsWUFBWSxJQUF6QjtBQUNBLGFBQUssV0FBTCxHQUFtQixZQUFZLFVBQS9CO0FBQ0EsYUFBSyxZQUFMLEdBQW9CLE9BQU8sSUFBUCxDQUFZLEtBQUssV0FBakIsQ0FBcEI7QUFDQSxhQUFLLFlBQUwsQ0FBa0IsSUFBbEI7QUFDSDs7Ozt3Q0FFZSxHLEVBQUs7QUFDakIsbUJBQU8sR0FBUDtBQUNIOzs7eUNBRWdCLEcsRUFBSztBQUNsQixnQkFBSSxFQUFFLE9BQU8sS0FBSyxXQUFkLENBQUosRUFBZ0M7QUFDNUIsdUJBQU8sSUFBUDtBQUNIO0FBQ0QsbUJBQU8sS0FBSyxXQUFMLENBQWlCLEdBQWpCLENBQVA7QUFDSDs7Ozs7Ozt1Q0F3QmMsVyxFQUFhLE0sRUFBUTtBQUNoQyxnQkFBTSxtQkFBbUI7QUFDckIsc0JBQU07QUFBQSwyQkFBSyxPQUFPLENB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QUFDcEIsbUJBQU8sSUFBUCxDQUFZLENBQVo7QUFDSDtBQUppQztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOztBQUtsQyxXQUFPLE1BQVA7QUFDSDs7Ozs7Ozs7O0FDTkQ7Ozs7Ozs7Ozs7OztJQUdxQixrQjs7O0FBQ2pCLGdDQUFZLE9BQVosRUFBcUI7QUFBQTs7QUFBQSxxR0FDWCxxQkFBcUIsT0FEVjtBQUVwQjs7Ozs7a0JBSGdCLGtCOzs7Ozs7Ozs7Ozs7Ozs7SUNIQSxXOzs7Ozs7Ozs7O0VBQW9CLEs7O2tCQUFwQixXOzs7OztBQ0FyQjs7Ozs7O0FBRUEsT0FBTyxlQUFQOztBQUVBLE9BQU8sV0FBUCxHQUFxQjtBQUNqQixxQkFBaUIsK0NBREE7QUFFakIsbUJBQWUsQ0FDWDtBQUNJLGNBQU0sR0FEVjtBQUVJLHFCQUFhLENBRmpCO0FBR0ksbUJBQVcsRUFIZjtBQUlJLGdCQUFRLFFBSlo7QUFLSSxzQkFBYztBQUNWLG9CQUFRLE1BREU7QUFFVix5QkFBYTtBQUZIO0FBTGxCLEtBRFcsRUFVUjtBQUNDLGNBQU0sR0FEUDtBQUVDLHFCQUFhLEVBRmQ7QUFHQyxtQkFBVyxFQUhaO0FBSUMsZ0JBQVEsUUFKVDtBQUtDLHNCQUFjO0FBQ1Ysb0JBQVEsTUFERTtBQUVWLHFCQUFTO0FBRkM7QUFMZixLQVZRLEVBbUJSO0FBQ0MsY0FBTSxHQURQO0FBRUMscUJBQWEsRUFGZDtBQUdDLG1CQUFXLEVBSFo7QUFJQyxnQkFBUSxNQUpUO0FBS0Msc0JBQWM7QUFDVixtQkFBTyxJQURHO0FBRVYscUJBQVMsS0FGQztBQUdWLG9CQUFRO0FBSEU7QUFMZixLQW5CUTtBQUZFLENBQXJCIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImltcG9ydCBJbnZhbGlkRm9ybWF0RXJyb3IgZnJvbSBcImV4Y2VwdGlvbnMvSW52YWxpZEZvcm1hdEVycm9yXCI7XG5cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQW5ub3RhdGlvbkRhdGEge1xuICAgIC8vICBQdWJsaWNcblxuICAgIGNvbnN0cnVjdG9yKHNvdXJjZV9kYXRhLCBwYXJlbnQpIHtcbiAgICAgICAgdGhpcy5fdmFsdWRhdGVJbnB1dChzb3VyY2VfZGF0YSwgcGFyZW50KTtcbiAgICAgICAgdGhpcy5faWQgPSBzb3VyY2VfZGF0YS5pZDtcbiAgICAgICAgdGhpcy5fc3RhcnRfcG9zID0gc291cmNlX2RhdGEuc3RhcnRfcG9zO1xuICAgICAgICB0aGlzLl9lbmRfcG9zID0gc291cmNlX2RhdGEuZW5kX3BvcztcbiAgICAgICAgdGhpcy5fdHlwZSA9IHNvdXJjZV9kYXRhLnR5cGU7XG4gICAgICAgIHRoaXMuX3Byb3BlcnRpZXMgPSBzb3VyY2VfZGF0YS5wcm9wZXJ0aWVzO1xuICAgICAgICB0aGlzLl9wcm9wc190eXBlcyA9IE9iamVjdC5rZXlzKHRoaXMuX3Byb3BlcnRpZXMpO1xuICAgICAgICB0aGlzLl9wcm9wc190eXBlcy5zb3J0KCk7XG4gICAgfVxuXG4gICAgZ2V0UHJvcGVydHlOYW1lKGtleSkge1xuICAgICAgICByZXR1cm4ga2V5O1xuICAgIH1cblxuICAgIGdldFByb3BlcnR5VmFsdWUoa2V5KSB7XG4gICAgICAgIGlmICghKGtleSBpbiB0aGlzLl9wcm9wZXJ0aWVzKSkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuX3Byb3BlcnRpZXNba2V5XTtcbiAgICB9XG5cbiAgICBnZXQgaWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pZDtcbiAgICB9XG5cbiAgICBnZXQgc3RhcnRfcG9zKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fc3RhcnRfcG9zO1xuICAgIH1cblxuICAgIGdldCBlbmRfcG9zKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZW5kX3BvcztcbiAgICB9XG5cbiAgICBnZXQgdHlwZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3R5cGU7XG4gICAgfVxuXG4gICAgZ2V0IHByb3BzX3R5cGVzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fcHJvcHNfdHlwZXM7XG4gICAgfVxuXG4gICAgLy8gUHJpdmF0ZVxuXG4gICAgX3ZhbHVkYXRlSW5wdXQoc291cmNlX2RhdGEsIHBhcmVudCkge1xuICAgICAgICBjb25zdCBNQU5EQVRPUllfRklMRURTID0ge1xuICAgICAgICAgICAgXCJpZFwiOiB4ID0+IHR5cGVvZih4KSA9PT0gXCJzdHJpbmdcIixcbiAgICAgICAgICAgIFwic3RhcnRfcG9zXCI6IHggPT4gTnVtYmVyLmlzSW50ZWdlcih4KSxcbiAgICAgICAgICAgIFwiZW5kX3Bvc1wiOiB4ID0+IE51bWJlci5pc0ludGVnZXIoeCksXG4gICAgICAgICAgICBcInR5cGVcIjogeCA9PiB0eXBlb2YoeCkgPT09IFwic3RyaW5nXCIsXG4gICAgICAgICAgICBcInByb3BlcnRpZXNcIjogeCA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB4ICE9PSBcIm9iamVjdFwiIHx8IEFycmF5LmlzQXJyYXkoeCkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBmb3IgKGxldCBrZXkgb2YgT2JqZWN0LmtleXMoeCkpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB4W2tleV0gIT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH1cbiAgICAgICAgaWYgKHR5cGVvZiBzb3VyY2VfZGF0YSAhPT0gXCJvYmplY3RcIiB8fCBBcnJheS5pc0FycmF5KHNvdXJjZV9kYXRhKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEludmFsaWRGb3JtYXRFcnJvcihcIkFsbCBhbm5vdGF0aW9ucyBzaG91bGQgYmUgb2JqZWN0c1wiKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoKFwiY2hpbGRyZW5cIiBpbiBzb3VyY2VfZGF0YSkgJiYgIUFycmF5LmlzQXJyYXkoc291cmNlX2RhdGEuY2hpbGRyZW4pKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgSW52YWxpZEZvcm1hdEVycm9yKGBJbnZhbGlkIGNoaWxkcmVuIHByb3BlcnkgaW4gYW5ub3RhdGlvbiB3aXRoIGlkICR7c291cmNlX2RhdGEuaWR9YCk7XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChsZXQgZmllbGQgb2YgT2JqZWN0LmtleXMoTUFOREFUT1JZX0ZJTEVEUykpIHtcbiAgICAgICAgICAgIGlmICghKGZpZWxkIGluIHNvdXJjZV9kYXRhKSkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBJbnZhbGlkRm9ybWF0RXJyb3IoYE1pc3NpbmcgJHtmaWVsZH0gZmllbGQgaW4gYW5ub3RhdGlvbiB3aXRoIGlkICR7c291cmNlX2RhdGEuaWR9YCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIU1BTkRBVE9SWV9GSUxFRFNbZmllbGRdKHNvdXJjZV9kYXRhW2ZpZWxkXSkpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgSW52YWxpZEZvcm1hdEVycm9yKGBGYWlsZWQgdmFsaWRhdGlvbiBmb3IgJHtmaWVsZH0gZmllbGQgaW4gYW5ub3RhdGlvbiB3aXRoIGlkICR7c291cmNlX2RhdGEuaWR9YCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHNvdXJjZV9kYXRhLnN0YXJ0X3BvcyA+PSBzb3VyY2VfZGF0YS5lbmRfcG9zKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgSW52YWxpZEZvcm1hdEVycm9yKGBlbmRfcG9zIHNob3VsZCBiZSBncmVhdGVyIHRoYW4gc3RhcnRfcG9zIGluIGFubm90YXRpb24gd2l0aCBpZCAke3NvdXJjZV9kYXRhLmlkfWApO1xuICAgICAgICB9XG4gICAgICAgIGlmIChzb3VyY2VfZGF0YS5zdGFydF9wb3MgPCAwKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgSW52YWxpZEZvcm1hdEVycm9yKGBlbmRfcG9zIHNob3VsZCBiZSA+PSAwIGluIGFubm90YXRpb24gd2l0aCBpZCAke3NvdXJjZV9kYXRhLmlkfWApO1xuICAgICAgICB9XG4gICAgICAgIGlmIChzb3VyY2VfZGF0YS5lbmRfcG9zID4gcGFyZW50LmRvY3VtZW50X3RleHQubGVuZ3RoKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgSW52YWxpZEZvcm1hdEVycm9yKGBBbm5vdGF0aW9uIHdpdGggaWQgJHtzb3VyY2VfZGF0YS5pZH0gZXhjZWVkcyBkb2N1bWVudCB0ZXh0IGxlbmd0aGApO1xuICAgICAgICB9XG4gICAgfVxufVxuIiwiaW1wb3J0IEludmFsaWRGb3JtYXRFcnJvciBmcm9tIFwiZXhjZXB0aW9ucy9JbnZhbGlkRm9ybWF0RXJyb3JcIjtcblxuaW1wb3J0IEFubm90YXRpb25EYXRhIGZyb20gXCIuL0Fubm90YXRpb25EYXRhXCI7XG5cbmltcG9ydCB7IGl0ZXJUb0FycmF5IH0gZnJvbSBcImNvbW1vbi90b29sc1wiO1xuXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFubm90YXRpb25zTGlzdCB7XG4gICAgLy8gUHVibGljXG5cbiAgICBjb25zdHJ1Y3Rvcihzb3VyY2VfZGF0YSkge1xuICAgICAgICB0aGlzLl92YWxpZGF0ZUlucHV0KHNvdXJjZV9kYXRhKTtcbiAgICAgICAgdGhpcy5fZG9jdW1lbnRfdGV4dCA9IHNvdXJjZV9kYXRhW1wiZG9jdW1lbnRfdGV4dFwiXTtcbiAgICAgICAgdGhpcy5fYW5ub3RhdGlvbnMgPSBzb3VyY2VfZGF0YVtcImFubm90YXRpb25zXCJdLm1hcChhbm5vdGF0aW9uID0+IG5ldyBBbm5vdGF0aW9uRGF0YShhbm5vdGF0aW9uLCB0aGlzKSlcbiAgICAgICAgdGhpcy5fYnVpbGRJZEluZGV4KCk7XG4gICAgICAgIHRoaXMuX2J1aWxkRGlzam9pbnRMaXN0KCk7XG4gICAgfVxuXG4gICAgZ2V0QnlJZChpZCkge1xuICAgICAgICBpZiAoIXRoaXMuX2lkX2luZGV4LmhhcyhpZCkpIHtcbiAgICAgICAgICAgIHRocm93IEludmFsaWRGb3JtYXRFcnJvcihgSW52YWxpZCBpZCByZWZlcmVuY2VkOiAke2lkfWApO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLl9pZF9pbmRleC5nZXQoaWQpO1xuICAgIH1cblxuICAgIGdldCBkb2N1bWVudF90ZXh0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZG9jdW1lbnRfdGV4dDtcbiAgICB9XG5cbiAgICBnZXQgYW5ub3RhdGlvbnMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9hbm5vdGF0aW9ucztcbiAgICB9XG5cbiAgICBnZXQgZGlzam9pbnRfYW5ub3RhdGlvbnMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9kaXNqb2ludF9saXN0O1xuICAgIH1cblxuICAgIC8vIFByaXZhdGVcblxuICAgIF92YWxpZGF0ZUlucHV0KHNvdXJjZV9kYXRhKSB7XG4gICAgICAgIGlmICghKFwiZG9jdW1lbnRfdGV4dFwiIGluIHNvdXJjZV9kYXRhKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEludmFsaWRGb3JtYXRFcnJvcihcIk1pc3NpbmcgZG9jdW1lbnRfdGV4dCBwcm9wZXJ0eSBvbiB0aGUgdG9wIGxldmVsXCIpO1xuICAgICAgICB9XG4gICAgICAgIGlmICghKFwiYW5ub3RhdGlvbnNcIiBpbiBzb3VyY2VfZGF0YSkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBJbnZhbGlkRm9ybWF0RXJyb3IoXCJNaXNzaW5nIGFubm90YXRpb25zIHByb3BlcnR5IG9uIHRoZSB0b3AgbGV2ZWxcIik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHR5cGVvZiBzb3VyY2VfZGF0YVtcImRvY3VtZW50X3RleHRcIl0gIT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBJbnZhbGlkRm9ybWF0RXJyb3IoXCJkb2N1bWVudF90ZXh0IHByb3BlcnR5IG9uIHRoZSB0b3AgbGV2ZWwgc2hvdWxkIGJlIG9mIHR5cGUgc3RyaW5nXCIpO1xuICAgICAgICB9XG4gICAgICAgIGlmICghQXJyYXkuaXNBcnJheShzb3VyY2VfZGF0YVtcImFubm90YXRpb25zXCJdKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEludmFsaWRGb3JtYXRFcnJvcihcImFubm90YXRpb25zIHByb3BlcnR5IG9uIHRoZSB0b3AgbGV2ZWwgc2hvdWxkIGJlIGFuIGFycmF5XCIpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgX2J1aWxkSWRJbmRleCgpIHtcbiAgICAgICAgdGhpcy5faWRfaW5kZXggPSBuZXcgTWFwKCk7XG4gICAgICAgIGZvciAobGV0IGFubm90YXRpb24gb2YgdGhpcy5fYW5ub3RhdGlvbnMpIHtcbiAgICAgICAgICAgIGNvbnN0IGlkID0gYW5ub3RhdGlvbi5pZDtcbiAgICAgICAgICAgIGlmICh0aGlzLl9pZF9pbmRleC5oYXMoaWQpKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEludmFsaWRGb3JtYXRFcnJvcihgRHVwbGljYXRlZCBJRDogJHtpZH1gKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuX2lkX2luZGV4LnNldChpZCwgYW5ub3RhdGlvbik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBfYnVpbGREaXNqb2ludExpc3QoKSB7XG4gICAgICAgIGxldCBwb2ludHMgPSBuZXcgTWFwKFtbMCwgW11dLCBbdGhpcy5fZG9jdW1lbnRfdGV4dC5sZW5ndGgsIFtdXV0pO1xuXG4gICAgICAgIGZ1bmN0aW9uIGFkZFBvaW50KHBvcywgdHlwZSwgYW5ub3RhdGlvbikge1xuICAgICAgICAgICAgaWYgKCFwb2ludHMuaGFzKHBvcykpIHtcbiAgICAgICAgICAgICAgICBwb2ludHMuc2V0KHBvcywgW10pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcG9pbnRzLmdldChwb3MpLnB1c2goeyB0eXBlLCBhbm5vdGF0aW9uIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yIChsZXQgYW5ub3RhdGlvbiBvZiB0aGlzLl9hbm5vdGF0aW9ucykge1xuICAgICAgICAgICAgYWRkUG9pbnQoYW5ub3RhdGlvbi5zdGFydF9wb3MsIFwiQlwiLCBhbm5vdGF0aW9uKTtcbiAgICAgICAgICAgIGFkZFBvaW50KGFubm90YXRpb24uZW5kX3BvcywgXCJFXCIsIGFubm90YXRpb24pO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHBvaW50c192YWx1ZXMgPSBpdGVyVG9BcnJheShwb2ludHMua2V5cygpKTtcbiAgICAgICAgcG9pbnRzX3ZhbHVlcy5zb3J0KChhLCBiKSA9PiBhIC0gYik7XG5cbiAgICAgICAgbGV0IGxhdGVzdF9wb3MgPSBudWxsO1xuICAgICAgICBsZXQgcmVzdWx0ID0gW107XG4gICAgICAgIGxldCBidWZmZXIgPSBuZXcgU2V0KCk7XG5cbiAgICAgICAgZm9yIChsZXQgcG9pbnRfdmFsdWUgb2YgcG9pbnRzX3ZhbHVlcykge1xuICAgICAgICAgICAgaWYgKGxhdGVzdF9wb3MgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICByZXN1bHQucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgIHRleHQ6IHRoaXMuX2RvY3VtZW50X3RleHQuc2xpY2UobGF0ZXN0X3BvcywgcG9pbnRfdmFsdWUpLFxuICAgICAgICAgICAgICAgICAgICBhbm5vdGF0aW9uczogaXRlclRvQXJyYXkoYnVmZmVyKSxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZvciAobGV0IHBvaW50IG9mIHBvaW50cy5nZXQocG9pbnRfdmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgaWYgKHBvaW50LnR5cGUgPT09IFwiQlwiKSB7XG4gICAgICAgICAgICAgICAgICAgIGJ1ZmZlci5hZGQocG9pbnQuYW5ub3RhdGlvbik7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgYnVmZmVyLmRlbGV0ZShwb2ludC5hbm5vdGF0aW9uKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsYXRlc3RfcG9zID0gcG9pbnRfdmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fZGlzam9pbnRfbGlzdCA9IHJlc3VsdDtcbiAgICB9XG59XG4iLCJleHBvcnQgZnVuY3Rpb24gaXRlclRvQXJyYXkoaXRlcmF0b3IpIHtcbiAgICBsZXQgcmVzdWx0ID0gW107XG4gICAgZm9yIChsZXQgZSBvZiBpdGVyYXRvcikge1xuICAgICAgICByZXN1bHQucHVzaChlKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cbiIsImltcG9ydCBNeUV4Y2VwdGlvbiBmcm9tIFwiLi9NeUV4Y2VwdGlvblwiO1xuXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEludmFsaWRGb3JtYXRFcnJvciBleHRlbmRzIE15RXhjZXB0aW9uIHtcbiAgICBjb25zdHJ1Y3RvcihtZXNzYWdlKSB7XG4gICAgICAgIHN1cGVyKFwiSW52YWxpZCBmb3JtYXQ6IFwiICsgbWVzc2FnZSk7XG4gICAgfVxufVxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgTXlFeGNlcHRpb24gZXh0ZW5kcyBFcnJvciB7fVxuIiwiaW1wb3J0IEFubm90YXRpb25zTGlzdCBmcm9tIFwiY2xhc3Nlcy9Bbm5vdGF0aW9uc0xpc3RcIjtcblxud2luZG93LkFubm90YXRpb25zTGlzdCA9IEFubm90YXRpb25zTGlzdDtcblxud2luZG93LlNBTVBMRV9EQVRBID0ge1xuICAgIFwiZG9jdW1lbnRfdGV4dFwiOiBcIkFsZXhhbmRlciBTLiBQdXNoa2luIHdhcyBib3JuIG9uIDI2IE1heSAxNzk5LlwiLFxuICAgIFwiYW5ub3RhdGlvbnNcIjogW1xuICAgICAgICB7XG4gICAgICAgICAgICBcImlkXCI6IFwiMVwiLFxuICAgICAgICAgICAgXCJzdGFydF9wb3NcIjogMCxcbiAgICAgICAgICAgIFwiZW5kX3Bvc1wiOiAyMCxcbiAgICAgICAgICAgIFwidHlwZVwiOiBcIkVudGl0eVwiLFxuICAgICAgICAgICAgXCJwcm9wZXJ0aWVzXCI6IHtcbiAgICAgICAgICAgICAgICBcIlBhcnRcIjogXCJOb3VuXCIsXG4gICAgICAgICAgICAgICAgXCJJcyBwcm9wZXJcIjogXCJZZXNcIixcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwge1xuICAgICAgICAgICAgXCJpZFwiOiBcIjJcIixcbiAgICAgICAgICAgIFwic3RhcnRfcG9zXCI6IDIxLFxuICAgICAgICAgICAgXCJlbmRfcG9zXCI6IDI5LFxuICAgICAgICAgICAgXCJ0eXBlXCI6IFwiRW50aXR5XCIsXG4gICAgICAgICAgICBcInByb3BlcnRpZXNcIjoge1xuICAgICAgICAgICAgICAgIFwiUGFydFwiOiBcIlZlcmJcIixcbiAgICAgICAgICAgICAgICBcIlRlbnNlXCI6IFwiUGFzdFwiLFxuICAgICAgICAgICAgfVxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBcImlkXCI6IFwiM1wiLFxuICAgICAgICAgICAgXCJzdGFydF9wb3NcIjogMzMsXG4gICAgICAgICAgICBcImVuZF9wb3NcIjogNDQsXG4gICAgICAgICAgICBcInR5cGVcIjogXCJEYXRlXCIsXG4gICAgICAgICAgICBcInByb3BlcnRpZXNcIjoge1xuICAgICAgICAgICAgICAgIFwiRGF5XCI6IFwiMjZcIixcbiAgICAgICAgICAgICAgICBcIk1vbnRoXCI6IFwiTWF5XCIsXG4gICAgICAgICAgICAgICAgXCJZZWFyXCI6IFwiMTc5OVwiLFxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgXVxufTtcbiJdfQ==
