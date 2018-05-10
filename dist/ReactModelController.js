"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ReactModelController {
    constructor({ target, name, defaultValue = '', validate = () => true, mask = /.+/ }) {
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
    set(_value) {
        let _newState = {};
        if (_value.target == null) {
            _newState[this.name] = _value;
        }
        else {
            _newState[this.name] = _value.target.value;
        }
        this.target.setState(_newState);
    }
    get() {
        if (typeof this.target.state[this.name] === 'string') {
            return this.target.state[this.name].match(this.mask)[0];
        }
        return this.target.state[this.name];
    }
    get isValid() {
        return this.validate(this.get());
    }
    // Deprecated stuff
    onChange(_value) {
        console.log('ReactModelController.onChange() is deprecated. Use set() instead.');
        this.set(_value);
    }
    get value() {
        console.log('ReactModelController.value is deprecated. Use get() instead.');
        return this.get();
    }
}
exports.default = ReactModelController;