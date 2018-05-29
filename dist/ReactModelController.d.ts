declare class ReactModelController {
    private target;
    private name;
    private validate;
    private mask;
    static create({target, name, defaultValue, validate, mask}: {
        target: any;
        name: string;
        defaultValue?: any;
        validate?: Function;
        mask?: string;
    }): ReactModelController;
    constructor({target, name, defaultValue, validate, mask}: {
        target: any;
        name: string;
        defaultValue?: any;
        validate?: Function;
        mask?: string;
    });
    set(value?: Function): (event: any) => void;
    get(): any;
    readonly isValid: any;
    readonly link: {
        value: any;
        onChange: (event: any) => void;
    };
    readonly onChange: (event: any) => void;
    readonly value: any;
}
export default ReactModelController;
