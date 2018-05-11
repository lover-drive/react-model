"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ReactModelController = /** @class */ (function () {
    function ReactModelController(_a) {
        var target = _a.target, name = _a.name, _b = _a.defaultValue, defaultValue = _b === void 0 ? '' : _b, _c = _a.validate, validate = _c === void 0 ? function () { return true; } : _c, _d = _a.mask, mask = _d === void 0 ? /.+/ : _d;
        this.target = target;
        this.name = name;
        this.validate = validate;
        this.mask = mask;
        if (this.target.state == null) {
            this.target.state = {};
        }
        this.target.state[this.name] = defaultValue;
        this.onChange = this.onChange.bind(this);
        this.set = this.set.bind(this);
        this.get = this.get.bind(this);
    }
    ReactModelController.prototype.set = function (_value) {
        var _newState = {};
        if (_value.target == null) {
            _newState[this.name] = _value;
        }
        else {
            _newState[this.name] = _value.target.value;
        }
        this.target.setState(_newState);
    };
    ReactModelController.prototype.get = function () {
        if (typeof this.target.state[this.name] === 'string') {
            if (this.target.state[this.name].match(this.mask)) {
                return this.target.state[this.name].match(this.mask)[0];
            }
            return this.target.state[this.name];
        }
        return this.target.state[this.name];
    };
    Object.defineProperty(ReactModelController.prototype, "isValid", {
        get: function () {
            return this.validate(this.get());
        },
        enumerable: true,
        configurable: true
    });
    // Deprecated stuff
    ReactModelController.prototype.onChange = function (_value) {
        console.log('ReactModelController.onChange() is deprecated. Use set() instead.');
        this.set(_value);
    };
    Object.defineProperty(ReactModelController.prototype, "value", {
        get: function () {
            console.log('ReactModelController.value is deprecated. Use get() instead.');
            return this.get();
        },
        enumerable: true,
        configurable: true
    });
    return ReactModelController;
}());
exports.default = ReactModelController;
