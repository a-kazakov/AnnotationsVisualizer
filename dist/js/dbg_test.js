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

    function AnnotationData(source_data, annotations_list) {
        var _this = this;

        var parent = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];

        _classCallCheck(this, AnnotationData);

        this._valudateInput(source_data, annotations_list, parent);
        this._parent = parent;
        this._id = source_data.id;
        this._start_pos = source_data.start_pos;
        this._end_pos = source_data.end_pos;
        this._type = source_data.type;
        this._properties = source_data.properties;
        this._props_types = Object.keys(this._properties);
        this._props_types.sort();
        this._children = Array.isArray(source_data.children) ? source_data.children.map(function (child) {
            return new AnnotationData(child, annotations_list, _this);
        }) : [];
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

        value: function _valudateInput(source_data, annotations_list, parent) {
            var FILEDS_VALIDATORS = {
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
            var TOP_LEVEL_FIELDS = ["id", "start_pos", "end_pos", "type", "properties"];
            var CHILDREN_FIELDS = ["id", "properties"];
            if ((typeof source_data === "undefined" ? "undefined" : _typeof(source_data)) !== "object" || Array.isArray(source_data)) {
                throw new _InvalidFormatError2.default("All annotations should be objects");
            }
            if ("children" in source_data && !Array.isArray(source_data.children)) {
                throw new _InvalidFormatError2.default("Invalid children propery in annotation with id " + source_data.id);
            }
            var required_fields = parent === null ? TOP_LEVEL_FIELDS : CHILDREN_FIELDS;
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = required_fields[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var field = _step2.value;

                    if (!(field in source_data)) {
                        throw new _InvalidFormatError2.default("Missing " + field + " field in annotation with id " + source_data.id);
                    }
                    if (!FILEDS_VALIDATORS[field](source_data[field])) {
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

            if (parent === null) {
                if (source_data.start_pos >= source_data.end_pos) {
                    throw new _InvalidFormatError2.default("end_pos should be greater than start_pos in annotation with id " + source_data.id);
                }
                if (source_data.start_pos < 0) {
                    throw new _InvalidFormatError2.default("end_pos should be >= 0 in annotation with id " + source_data.id);
                }
                if (source_data.end_pos > annotations_list.document_text.length) {
                    throw new _InvalidFormatError2.default("Annotation with id " + source_data.id + " exceeds document text length");
                }
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
    }, {
        key: "parent",
        get: function get() {
            return this._parent;
        }
    }, {
        key: "top_parent",
        get: function get() {
            if (typeof this.__top_parent === "undefined") {
                var result = this;
                while (result.parent !== null) {
                    result = result.parent;
                }
                this.__top_parent = result;
            }
            return this.__top_parent;
        }
    }, {
        key: "children",
        get: function get() {
            return this._children;
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
        key: "_addAnnotationToIdIndex",
        value: function _addAnnotationToIdIndex(annotation) {
            var id = annotation.id;
            if (this._id_index.has(id)) {
                throw new _InvalidFormatError2.default("Duplicated ID: " + id);
            }
            this._id_index.set(id, annotation);
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = annotation.children[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var child = _step.value;

                    this._addAnnotationToIdIndex(child);
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
        key: "_buildIdIndex",
        value: function _buildIdIndex() {
            this._id_index = new Map();
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = this._annotations[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var annotation = _step2.value;

                    this._addAnnotationToIdIndex(annotation);
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

            var _iteratorNormalCompletion3 = true;
            var _didIteratorError3 = false;
            var _iteratorError3 = undefined;

            try {
                for (var _iterator3 = this._annotations[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                    var annotation = _step3.value;

                    addPoint(annotation.start_pos, "B", annotation);
                    addPoint(annotation.end_pos, "E", annotation);
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

            var points_values = (0, _tools.iterToArray)(points.keys());
            points_values.sort(function (a, b) {
                return a - b;
            });

            var latest_pos = null;
            var result = [];
            var buffer = new Set();

            var _iteratorNormalCompletion4 = true;
            var _didIteratorError4 = false;
            var _iteratorError4 = undefined;

            try {
                for (var _iterator4 = points_values[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                    var point_value = _step4.value;

                    if (latest_pos !== null) {
                        result.push({
                            text: this._document_text.slice(latest_pos, point_value),
                            annotations: (0, _tools.iterToArray)(buffer)
                        });
                    }
                    var _iteratorNormalCompletion5 = true;
                    var _didIteratorError5 = false;
                    var _iteratorError5 = undefined;

                    try {
                        for (var _iterator5 = points.get(point_value)[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
                            var point = _step5.value;

                            if (point.type === "B") {
                                buffer.add(point.annotation);
                            } else {
                                buffer.delete(point.annotation);
                            }
                        }
                    } catch (err) {
                        _didIteratorError5 = true;
                        _iteratorError5 = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion5 && _iterator5.return) {
                                _iterator5.return();
                            }
                        } finally {
                            if (_didIteratorError5) {
                                throw _iteratorError5;
                            }
                        }
                    }

                    latest_pos = point_value;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJqc3hcXGNsYXNzZXNcXEFubm90YXRpb25zTGlzdFxcQW5ub3RhdGlvbkRhdGEuanN4IiwianN4XFxjbGFzc2VzXFxBbm5vdGF0aW9uc0xpc3RcXGluZGV4LmpzeCIsImpzeFxcY29tbW9uXFx0b29scy5qc3giLCJqc3hcXGV4Y2VwdGlvbnNcXEludmFsaWRGb3JtYXRFcnJvci5qc3giLCJqc3hcXGV4Y2VwdGlvbnNcXE15RXhjZXB0aW9uLmpzeCIsImpzeFxcdGVzdC5qc3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7O0lBR3FCLGM7OztBQUdqQiw0QkFBWSxXQUFaLEVBQXlCLGdCQUF6QixFQUF3RDtBQUFBOztBQUFBLFlBQWIsTUFBYSx5REFBTixJQUFNOztBQUFBOztBQUNwRCxhQUFLLGNBQUwsQ0FBb0IsV0FBcEIsRUFBaUMsZ0JBQWpDLEVBQW1ELE1BQW5EO0FBQ0EsYUFBSyxPQUFMLEdBQWUsTUFBZjtBQUNBLGFBQUssR0FBTCxHQUFXLFlBQVksRUFBdkI7QUFDQSxhQUFLLFVBQUwsR0FBa0IsWUFBWSxTQUE5QjtBQUNBLGFBQUssUUFBTCxHQUFnQixZQUFZLE9BQTVCO0FBQ0EsYUFBSyxLQUFMLEdBQWEsWUFBWSxJQUF6QjtBQUNBLGFBQUssV0FBTCxHQUFtQixZQUFZLFVBQS9CO0FBQ0EsYUFBSyxZQUFMLEdBQW9CLE9BQU8sSUFBUCxDQUFZLEtBQUssV0FBakIsQ0FBcEI7QUFDQSxhQUFLLFlBQUwsQ0FBa0IsSUFBbEI7QUFDQSxhQUFLLFNBQUwsR0FBaUIsTUFBTSxPQUFOLENBQWMsWUFBWSxRQUExQixJQUNYLFlBQVksUUFBWixDQUFxQixHQUFyQixDQUF5QjtBQUFBLG1CQUFTLElBQUksY0FBSixDQUFtQixLQUFuQixFQUEwQixnQkFBMUIsUUFBVDtBQUFBLFNBQXpCLENBRFcsR0FFWCxFQUZOO0FBR0g7Ozs7d0NBRWUs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LFFBQWQsOEhBQXdCO0FBQUEsZ0JBQWYsQ0FBZTs7QUFDcEIsbUJBQU8sSUFBUCxDQUFZLENBQVo7QUFDSDtBQUppQztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOztBQUtsQyxXQUFPLE1BQVA7QUFDSDs7Ozs7Ozs7O0FDTkQ7Ozs7Ozs7Ozs7OztJQUdxQixrQjs7O0FBQ2pCLGdDQUFZLE9BQVosRUFBcUI7QUFBQTs7QUFBQSxxR0FDWCxxQkFBcUIsT0FEVjtBQUVwQjs7Ozs7a0JBSGdCLGtCOzs7Ozs7Ozs7Ozs7Ozs7SUNIQSxXOzs7Ozs7Ozs7O0VBQW9CLEs7O2tCQUFwQixXOzs7OztBQ0FyQjs7Ozs7O0FBRUEsT0FBTyxlQUFQOztBQUVBLE9BQU8sV0FBUCxHQUFxQjtBQUNqQixxQkFBaUIsK0NBREE7QUFFakIsbUJBQWUsQ0FDWDtBQUNJLGNBQU0sR0FEVjtBQUVJLHFCQUFhLENBRmpCO0FBR0ksbUJBQVcsRUFIZjtBQUlJLGdCQUFRLFFBSlo7QUFLSSxzQkFBYztBQUNWLG9CQUFRLE1BREU7QUFFVix5QkFBYTtBQUZIO0FBTGxCLEtBRFcsRUFVUjtBQUNDLGNBQU0sR0FEUDtBQUVDLHFCQUFhLEVBRmQ7QUFHQyxtQkFBVyxFQUhaO0FBSUMsZ0JBQVEsUUFKVDtBQUtDLHNCQUFjO0FBQ1Ysb0JBQVEsTUFERTtBQUVWLHFCQUFTO0FBRkM7QUFMZixLQVZRLEVBbUJSO0FBQ0MsY0FBTSxHQURQO0FBRUMscUJBQWEsRUFGZDtBQUdDLG1CQUFXLEVBSFo7QUFJQyxnQkFBUSxNQUpUO0FBS0Msc0JBQWM7QUFDVixtQkFBTyxJQURHO0FBRVYscUJBQVMsS0FGQztBQUdWLG9CQUFRO0FBSEU7QUFMZixLQW5CUTtBQUZFLENBQXJCIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImltcG9ydCBJbnZhbGlkRm9ybWF0RXJyb3IgZnJvbSBcImV4Y2VwdGlvbnMvSW52YWxpZEZvcm1hdEVycm9yXCI7XG5cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQW5ub3RhdGlvbkRhdGEge1xuICAgIC8vICBQdWJsaWNcblxuICAgIGNvbnN0cnVjdG9yKHNvdXJjZV9kYXRhLCBhbm5vdGF0aW9uc19saXN0LCBwYXJlbnQ9bnVsbCkge1xuICAgICAgICB0aGlzLl92YWx1ZGF0ZUlucHV0KHNvdXJjZV9kYXRhLCBhbm5vdGF0aW9uc19saXN0LCBwYXJlbnQpO1xuICAgICAgICB0aGlzLl9wYXJlbnQgPSBwYXJlbnQ7XG4gICAgICAgIHRoaXMuX2lkID0gc291cmNlX2RhdGEuaWQ7XG4gICAgICAgIHRoaXMuX3N0YXJ0X3BvcyA9IHNvdXJjZV9kYXRhLnN0YXJ0X3BvcztcbiAgICAgICAgdGhpcy5fZW5kX3BvcyA9IHNvdXJjZV9kYXRhLmVuZF9wb3M7XG4gICAgICAgIHRoaXMuX3R5cGUgPSBzb3VyY2VfZGF0YS50eXBlO1xuICAgICAgICB0aGlzLl9wcm9wZXJ0aWVzID0gc291cmNlX2RhdGEucHJvcGVydGllcztcbiAgICAgICAgdGhpcy5fcHJvcHNfdHlwZXMgPSBPYmplY3Qua2V5cyh0aGlzLl9wcm9wZXJ0aWVzKTtcbiAgICAgICAgdGhpcy5fcHJvcHNfdHlwZXMuc29ydCgpO1xuICAgICAgICB0aGlzLl9jaGlsZHJlbiA9IEFycmF5LmlzQXJyYXkoc291cmNlX2RhdGEuY2hpbGRyZW4pXG4gICAgICAgICAgICA/IHNvdXJjZV9kYXRhLmNoaWxkcmVuLm1hcChjaGlsZCA9PiBuZXcgQW5ub3RhdGlvbkRhdGEoY2hpbGQsIGFubm90YXRpb25zX2xpc3QsIHRoaXMpKVxuICAgICAgICAgICAgOiBbXTtcbiAgICB9XG5cbiAgICBnZXRQcm9wZXJ0eU5hbWUoa2V5KSB7XG4gICAgICAgIHJldHVybiBrZXk7XG4gICAgfVxuXG4gICAgZ2V0UHJvcGVydHlWYWx1ZShrZXkpIHtcbiAgICAgICAgaWYgKCEoa2V5IGluIHRoaXMuX3Byb3BlcnRpZXMpKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5fcHJvcGVydGllc1trZXldO1xuICAgIH1cblxuICAgIGdldCBpZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2lkO1xuICAgIH1cblxuICAgIGdldCBzdGFydF9wb3MoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zdGFydF9wb3M7XG4gICAgfVxuXG4gICAgZ2V0IGVuZF9wb3MoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9lbmRfcG9zO1xuICAgIH1cblxuICAgIGdldCB0eXBlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fdHlwZTtcbiAgICB9XG5cbiAgICBnZXQgcHJvcHNfdHlwZXMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9wcm9wc190eXBlcztcbiAgICB9XG5cbiAgICBnZXQgcGFyZW50KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fcGFyZW50O1xuICAgIH1cblxuICAgIGdldCB0b3BfcGFyZW50KCkge1xuICAgICAgICBpZiAodHlwZW9mIHRoaXMuX190b3BfcGFyZW50ID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgICBsZXQgcmVzdWx0ID0gdGhpcztcbiAgICAgICAgICAgIHdoaWxlIChyZXN1bHQucGFyZW50ICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gcmVzdWx0LnBhcmVudDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuX190b3BfcGFyZW50ID0gcmVzdWx0O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLl9fdG9wX3BhcmVudDtcbiAgICB9XG5cbiAgICBnZXQgY2hpbGRyZW4oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jaGlsZHJlbjtcbiAgICB9XG5cbiAgICAvLyBQcml2YXRlXG5cbiAgICBfdmFsdWRhdGVJbnB1dChzb3VyY2VfZGF0YSwgYW5ub3RhdGlvbnNfbGlzdCwgcGFyZW50KSB7XG4gICAgICAgIGNvbnN0IEZJTEVEU19WQUxJREFUT1JTID0ge1xuICAgICAgICAgICAgXCJpZFwiOiB4ID0+IHR5cGVvZiB4ID09PSBcInN0cmluZ1wiLFxuICAgICAgICAgICAgXCJzdGFydF9wb3NcIjogeCA9PiBOdW1iZXIuaXNJbnRlZ2VyKHgpLFxuICAgICAgICAgICAgXCJlbmRfcG9zXCI6IHggPT4gTnVtYmVyLmlzSW50ZWdlcih4KSxcbiAgICAgICAgICAgIFwidHlwZVwiOiB4ID0+IHR5cGVvZiB4ID09PSBcInN0cmluZ1wiLFxuICAgICAgICAgICAgXCJwcm9wZXJ0aWVzXCI6IHggPT4ge1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgeCAhPT0gXCJvYmplY3RcIiB8fCBBcnJheS5pc0FycmF5KHgpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZm9yIChsZXQga2V5IG9mIE9iamVjdC5rZXlzKHgpKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgeFtrZXldICE9PSBcInN0cmluZ1wiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9LFxuICAgICAgICB9XG4gICAgICAgIGNvbnN0IFRPUF9MRVZFTF9GSUVMRFMgPSBbXCJpZFwiLCBcInN0YXJ0X3Bvc1wiLCBcImVuZF9wb3NcIiwgXCJ0eXBlXCIsIFwicHJvcGVydGllc1wiXTtcbiAgICAgICAgY29uc3QgQ0hJTERSRU5fRklFTERTID0gW1wiaWRcIiwgXCJwcm9wZXJ0aWVzXCJdXG4gICAgICAgIGlmICh0eXBlb2Ygc291cmNlX2RhdGEgIT09IFwib2JqZWN0XCIgfHwgQXJyYXkuaXNBcnJheShzb3VyY2VfZGF0YSkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBJbnZhbGlkRm9ybWF0RXJyb3IoXCJBbGwgYW5ub3RhdGlvbnMgc2hvdWxkIGJlIG9iamVjdHNcIik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKChcImNoaWxkcmVuXCIgaW4gc291cmNlX2RhdGEpICYmICFBcnJheS5pc0FycmF5KHNvdXJjZV9kYXRhLmNoaWxkcmVuKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEludmFsaWRGb3JtYXRFcnJvcihgSW52YWxpZCBjaGlsZHJlbiBwcm9wZXJ5IGluIGFubm90YXRpb24gd2l0aCBpZCAke3NvdXJjZV9kYXRhLmlkfWApO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHJlcXVpcmVkX2ZpZWxkcyA9IHBhcmVudCA9PT0gbnVsbCA/IFRPUF9MRVZFTF9GSUVMRFMgOiBDSElMRFJFTl9GSUVMRFM7XG4gICAgICAgIGZvciAobGV0IGZpZWxkIG9mIHJlcXVpcmVkX2ZpZWxkcykge1xuICAgICAgICAgICAgaWYgKCEoZmllbGQgaW4gc291cmNlX2RhdGEpKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEludmFsaWRGb3JtYXRFcnJvcihgTWlzc2luZyAke2ZpZWxkfSBmaWVsZCBpbiBhbm5vdGF0aW9uIHdpdGggaWQgJHtzb3VyY2VfZGF0YS5pZH1gKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghRklMRURTX1ZBTElEQVRPUlNbZmllbGRdKHNvdXJjZV9kYXRhW2ZpZWxkXSkpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgSW52YWxpZEZvcm1hdEVycm9yKGBGYWlsZWQgdmFsaWRhdGlvbiBmb3IgJHtmaWVsZH0gZmllbGQgaW4gYW5ub3RhdGlvbiB3aXRoIGlkICR7c291cmNlX2RhdGEuaWR9YCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHBhcmVudCA9PT0gbnVsbCkge1xuICAgICAgICAgICAgaWYgKHNvdXJjZV9kYXRhLnN0YXJ0X3BvcyA+PSBzb3VyY2VfZGF0YS5lbmRfcG9zKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEludmFsaWRGb3JtYXRFcnJvcihgZW5kX3BvcyBzaG91bGQgYmUgZ3JlYXRlciB0aGFuIHN0YXJ0X3BvcyBpbiBhbm5vdGF0aW9uIHdpdGggaWQgJHtzb3VyY2VfZGF0YS5pZH1gKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChzb3VyY2VfZGF0YS5zdGFydF9wb3MgPCAwKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEludmFsaWRGb3JtYXRFcnJvcihgZW5kX3BvcyBzaG91bGQgYmUgPj0gMCBpbiBhbm5vdGF0aW9uIHdpdGggaWQgJHtzb3VyY2VfZGF0YS5pZH1gKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChzb3VyY2VfZGF0YS5lbmRfcG9zID4gYW5ub3RhdGlvbnNfbGlzdC5kb2N1bWVudF90ZXh0Lmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBJbnZhbGlkRm9ybWF0RXJyb3IoYEFubm90YXRpb24gd2l0aCBpZCAke3NvdXJjZV9kYXRhLmlkfSBleGNlZWRzIGRvY3VtZW50IHRleHQgbGVuZ3RoYCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCJpbXBvcnQgSW52YWxpZEZvcm1hdEVycm9yIGZyb20gXCJleGNlcHRpb25zL0ludmFsaWRGb3JtYXRFcnJvclwiO1xuXG5pbXBvcnQgQW5ub3RhdGlvbkRhdGEgZnJvbSBcIi4vQW5ub3RhdGlvbkRhdGFcIjtcblxuaW1wb3J0IHsgaXRlclRvQXJyYXkgfSBmcm9tIFwiY29tbW9uL3Rvb2xzXCI7XG5cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQW5ub3RhdGlvbnNMaXN0IHtcbiAgICAvLyBQdWJsaWNcblxuICAgIGNvbnN0cnVjdG9yKHNvdXJjZV9kYXRhKSB7XG4gICAgICAgIHRoaXMuX3ZhbGlkYXRlSW5wdXQoc291cmNlX2RhdGEpO1xuICAgICAgICB0aGlzLl9kb2N1bWVudF90ZXh0ID0gc291cmNlX2RhdGFbXCJkb2N1bWVudF90ZXh0XCJdO1xuICAgICAgICB0aGlzLl9hbm5vdGF0aW9ucyA9IHNvdXJjZV9kYXRhW1wiYW5ub3RhdGlvbnNcIl0ubWFwKGFubm90YXRpb24gPT4gbmV3IEFubm90YXRpb25EYXRhKGFubm90YXRpb24sIHRoaXMpKVxuICAgICAgICB0aGlzLl9idWlsZElkSW5kZXgoKTtcbiAgICAgICAgdGhpcy5fYnVpbGREaXNqb2ludExpc3QoKTtcbiAgICB9XG5cbiAgICBnZXRCeUlkKGlkKSB7XG4gICAgICAgIGlmICghdGhpcy5faWRfaW5kZXguaGFzKGlkKSkge1xuICAgICAgICAgICAgdGhyb3cgSW52YWxpZEZvcm1hdEVycm9yKGBJbnZhbGlkIGlkIHJlZmVyZW5jZWQ6ICR7aWR9YCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuX2lkX2luZGV4LmdldChpZCk7XG4gICAgfVxuXG4gICAgZ2V0IGRvY3VtZW50X3RleHQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9kb2N1bWVudF90ZXh0O1xuICAgIH1cblxuICAgIGdldCBhbm5vdGF0aW9ucygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2Fubm90YXRpb25zO1xuICAgIH1cblxuICAgIGdldCBkaXNqb2ludF9hbm5vdGF0aW9ucygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2Rpc2pvaW50X2xpc3Q7XG4gICAgfVxuXG4gICAgLy8gUHJpdmF0ZVxuXG4gICAgX3ZhbGlkYXRlSW5wdXQoc291cmNlX2RhdGEpIHtcbiAgICAgICAgaWYgKCEoXCJkb2N1bWVudF90ZXh0XCIgaW4gc291cmNlX2RhdGEpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgSW52YWxpZEZvcm1hdEVycm9yKFwiTWlzc2luZyBkb2N1bWVudF90ZXh0IHByb3BlcnR5IG9uIHRoZSB0b3AgbGV2ZWxcIik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCEoXCJhbm5vdGF0aW9uc1wiIGluIHNvdXJjZV9kYXRhKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEludmFsaWRGb3JtYXRFcnJvcihcIk1pc3NpbmcgYW5ub3RhdGlvbnMgcHJvcGVydHkgb24gdGhlIHRvcCBsZXZlbFwiKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodHlwZW9mIHNvdXJjZV9kYXRhW1wiZG9jdW1lbnRfdGV4dFwiXSAhPT0gXCJzdHJpbmdcIikge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEludmFsaWRGb3JtYXRFcnJvcihcImRvY3VtZW50X3RleHQgcHJvcGVydHkgb24gdGhlIHRvcCBsZXZlbCBzaG91bGQgYmUgb2YgdHlwZSBzdHJpbmdcIik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFBcnJheS5pc0FycmF5KHNvdXJjZV9kYXRhW1wiYW5ub3RhdGlvbnNcIl0pKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgSW52YWxpZEZvcm1hdEVycm9yKFwiYW5ub3RhdGlvbnMgcHJvcGVydHkgb24gdGhlIHRvcCBsZXZlbCBzaG91bGQgYmUgYW4gYXJyYXlcIik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBfYWRkQW5ub3RhdGlvblRvSWRJbmRleChhbm5vdGF0aW9uKSB7XG4gICAgICAgIGNvbnN0IGlkID0gYW5ub3RhdGlvbi5pZDtcbiAgICAgICAgaWYgKHRoaXMuX2lkX2luZGV4LmhhcyhpZCkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBJbnZhbGlkRm9ybWF0RXJyb3IoYER1cGxpY2F0ZWQgSUQ6ICR7aWR9YCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5faWRfaW5kZXguc2V0KGlkLCBhbm5vdGF0aW9uKTtcbiAgICAgICAgZm9yIChsZXQgY2hpbGQgb2YgYW5ub3RhdGlvbi5jaGlsZHJlbikge1xuICAgICAgICAgICAgdGhpcy5fYWRkQW5ub3RhdGlvblRvSWRJbmRleChjaGlsZCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBfYnVpbGRJZEluZGV4KCkge1xuICAgICAgICB0aGlzLl9pZF9pbmRleCA9IG5ldyBNYXAoKTtcbiAgICAgICAgZm9yIChsZXQgYW5ub3RhdGlvbiBvZiB0aGlzLl9hbm5vdGF0aW9ucykge1xuICAgICAgICAgICAgdGhpcy5fYWRkQW5ub3RhdGlvblRvSWRJbmRleChhbm5vdGF0aW9uKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIF9idWlsZERpc2pvaW50TGlzdCgpIHtcbiAgICAgICAgbGV0IHBvaW50cyA9IG5ldyBNYXAoW1swLCBbXV0sIFt0aGlzLl9kb2N1bWVudF90ZXh0Lmxlbmd0aCwgW11dXSk7XG5cbiAgICAgICAgZnVuY3Rpb24gYWRkUG9pbnQocG9zLCB0eXBlLCBhbm5vdGF0aW9uKSB7XG4gICAgICAgICAgICBpZiAoIXBvaW50cy5oYXMocG9zKSkge1xuICAgICAgICAgICAgICAgIHBvaW50cy5zZXQocG9zLCBbXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBwb2ludHMuZ2V0KHBvcykucHVzaCh7IHR5cGUsIGFubm90YXRpb24gfSk7XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKGxldCBhbm5vdGF0aW9uIG9mIHRoaXMuX2Fubm90YXRpb25zKSB7XG4gICAgICAgICAgICBhZGRQb2ludChhbm5vdGF0aW9uLnN0YXJ0X3BvcywgXCJCXCIsIGFubm90YXRpb24pO1xuICAgICAgICAgICAgYWRkUG9pbnQoYW5ub3RhdGlvbi5lbmRfcG9zLCBcIkVcIiwgYW5ub3RhdGlvbik7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgcG9pbnRzX3ZhbHVlcyA9IGl0ZXJUb0FycmF5KHBvaW50cy5rZXlzKCkpO1xuICAgICAgICBwb2ludHNfdmFsdWVzLnNvcnQoKGEsIGIpID0+IGEgLSBiKTtcblxuICAgICAgICBsZXQgbGF0ZXN0X3BvcyA9IG51bGw7XG4gICAgICAgIGxldCByZXN1bHQgPSBbXTtcbiAgICAgICAgbGV0IGJ1ZmZlciA9IG5ldyBTZXQoKTtcblxuICAgICAgICBmb3IgKGxldCBwb2ludF92YWx1ZSBvZiBwb2ludHNfdmFsdWVzKSB7XG4gICAgICAgICAgICBpZiAobGF0ZXN0X3BvcyAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogdGhpcy5fZG9jdW1lbnRfdGV4dC5zbGljZShsYXRlc3RfcG9zLCBwb2ludF92YWx1ZSksXG4gICAgICAgICAgICAgICAgICAgIGFubm90YXRpb25zOiBpdGVyVG9BcnJheShidWZmZXIpLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZm9yIChsZXQgcG9pbnQgb2YgcG9pbnRzLmdldChwb2ludF92YWx1ZSkpIHtcbiAgICAgICAgICAgICAgICBpZiAocG9pbnQudHlwZSA9PT0gXCJCXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgYnVmZmVyLmFkZChwb2ludC5hbm5vdGF0aW9uKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBidWZmZXIuZGVsZXRlKHBvaW50LmFubm90YXRpb24pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxhdGVzdF9wb3MgPSBwb2ludF92YWx1ZTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9kaXNqb2ludF9saXN0ID0gcmVzdWx0O1xuICAgIH1cbn1cbiIsImV4cG9ydCBmdW5jdGlvbiBpdGVyVG9BcnJheShpdGVyYXRvcikge1xuICAgIGxldCByZXN1bHQgPSBbXTtcbiAgICBmb3IgKGxldCBlIG9mIGl0ZXJhdG9yKSB7XG4gICAgICAgIHJlc3VsdC5wdXNoKGUpO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xufVxuIiwiaW1wb3J0IE15RXhjZXB0aW9uIGZyb20gXCIuL015RXhjZXB0aW9uXCI7XG5cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW52YWxpZEZvcm1hdEVycm9yIGV4dGVuZHMgTXlFeGNlcHRpb24ge1xuICAgIGNvbnN0cnVjdG9yKG1lc3NhZ2UpIHtcbiAgICAgICAgc3VwZXIoXCJJbnZhbGlkIGZvcm1hdDogXCIgKyBtZXNzYWdlKTtcbiAgICB9XG59XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBNeUV4Y2VwdGlvbiBleHRlbmRzIEVycm9yIHt9XG4iLCJpbXBvcnQgQW5ub3RhdGlvbnNMaXN0IGZyb20gXCJjbGFzc2VzL0Fubm90YXRpb25zTGlzdFwiO1xuXG53aW5kb3cuQW5ub3RhdGlvbnNMaXN0ID0gQW5ub3RhdGlvbnNMaXN0O1xuXG53aW5kb3cuU0FNUExFX0RBVEEgPSB7XG4gICAgXCJkb2N1bWVudF90ZXh0XCI6IFwiQWxleGFuZGVyIFMuIFB1c2hraW4gd2FzIGJvcm4gb24gMjYgTWF5IDE3OTkuXCIsXG4gICAgXCJhbm5vdGF0aW9uc1wiOiBbXG4gICAgICAgIHtcbiAgICAgICAgICAgIFwiaWRcIjogXCIxXCIsXG4gICAgICAgICAgICBcInN0YXJ0X3Bvc1wiOiAwLFxuICAgICAgICAgICAgXCJlbmRfcG9zXCI6IDIwLFxuICAgICAgICAgICAgXCJ0eXBlXCI6IFwiRW50aXR5XCIsXG4gICAgICAgICAgICBcInByb3BlcnRpZXNcIjoge1xuICAgICAgICAgICAgICAgIFwiUGFydFwiOiBcIk5vdW5cIixcbiAgICAgICAgICAgICAgICBcIklzIHByb3BlclwiOiBcIlllc1wiLFxuICAgICAgICAgICAgfVxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBcImlkXCI6IFwiMlwiLFxuICAgICAgICAgICAgXCJzdGFydF9wb3NcIjogMjEsXG4gICAgICAgICAgICBcImVuZF9wb3NcIjogMjksXG4gICAgICAgICAgICBcInR5cGVcIjogXCJFbnRpdHlcIixcbiAgICAgICAgICAgIFwicHJvcGVydGllc1wiOiB7XG4gICAgICAgICAgICAgICAgXCJQYXJ0XCI6IFwiVmVyYlwiLFxuICAgICAgICAgICAgICAgIFwiVGVuc2VcIjogXCJQYXN0XCIsXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIFwiaWRcIjogXCIzXCIsXG4gICAgICAgICAgICBcInN0YXJ0X3Bvc1wiOiAzMyxcbiAgICAgICAgICAgIFwiZW5kX3Bvc1wiOiA0NCxcbiAgICAgICAgICAgIFwidHlwZVwiOiBcIkRhdGVcIixcbiAgICAgICAgICAgIFwicHJvcGVydGllc1wiOiB7XG4gICAgICAgICAgICAgICAgXCJEYXlcIjogXCIyNlwiLFxuICAgICAgICAgICAgICAgIFwiTW9udGhcIjogXCJNYXlcIixcbiAgICAgICAgICAgICAgICBcIlllYXJcIjogXCIxNzk5XCIsXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICBdXG59O1xuIl19
