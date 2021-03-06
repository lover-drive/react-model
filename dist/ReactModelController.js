"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class ReactModelController {
    static create({ target, name, defaultValue, validate, mask }) {
        return new ReactModelController({
            target: target,
            name: name,
            defaultValue: defaultValue,
            validate: validate,
            mask: mask
        });
    }
    constructor({ target, name, defaultValue = '', validate = () => true, mask = '' }) {
        this.target = target;
        this.name = name;
        this.validate = validate;
        this.mask = mask;
        if (this.target.state == null) {
            this.target.state = {};
        }
        this.target.state[this.name] = defaultValue;
        this.set = this.set.bind(this);
        this.get = this.get.bind(this);
    }
    set(value = x => x) {
        const maskString = (v, mask) => typeof v === 'string' && mask.length ? v.split('').reduce((accumulator, char, index) => {
            let first = char !== mask[index] ? accumulator.mask.indexOf('*') : 0;
            return {
                result: accumulator.result + accumulator.mask.substring(0, first) + char,
                mask: accumulator.mask.substr(first + 1)
            };
        }, {
            result: '',
            mask: mask
        }).result : v;
        return event => {
            this.target.setState({
                [this.name]: maskString(value(event), this.mask)
            });
        };
    }
    get() {
        return this.target.state[this.name];
    }
    get isValid() {
        return this.validate(this.get());
    }
    get link() {
        return {
            value: this.get(),
            onChange: this.set()
        };
    }
    // Deprecated stuff
    get onChange() {
        console.log('ReactModelController.onChange() is deprecated. Use set() instead.');
        return this.set();
    }
    get value() {
        console.log('ReactModelController.value is deprecated. Use get() instead.');
        return this.get();
    }
}
exports.default = ReactModelController;