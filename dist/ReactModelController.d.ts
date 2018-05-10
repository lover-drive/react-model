declare class ReactModelController {
    private target;
    private name;
    private validate;
    private mask;
    constructor({target, name, defaultValue, validate, mask}: {
        target: any;
        name: string;
        defaultValue?: any;
        validate?: Function;
        mask?: RegExp;
    });
    set(_value: any): void;
    get(): any;
    readonly isValid: any;
    onChange(_value: any): void;
    readonly value: any;
}
export default ReactModelController;
