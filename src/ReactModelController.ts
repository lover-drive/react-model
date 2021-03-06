class ReactModelController {
  private target: any
  private name: string
  private validate: Function
  private mask: string

  public static create ({
    target,
    name,
    defaultValue,
    validate,
    mask
  }: {
    target: any,
    name: string,
    defaultValue?: any,
    validate?: Function,
    mask?: string
  }) {
    return new ReactModelController({
      target: target,
      name: name,
      defaultValue: defaultValue,
      validate: validate,
      mask: mask
    })
  }

  constructor ({
    target,
    name,
    defaultValue = '',
    validate = () => true,
    mask = ''
  }: {
    target: any,
    name: string,
    defaultValue?: any,
    validate?: Function,
    mask?: string
  }) {
    this.target = target
    this.name = name
    this.validate = validate
    this.mask = mask

    if (this.target.state == null) {
      this.target.state = {}
    }
    this.target.state[this.name] = defaultValue

    this.set = this.set.bind(this)
    this.get = this.get.bind(this)
  }

  public set (value: Function = x => x) {
    const maskString = (v: string, mask: string) => 
      (typeof v === 'string' && mask.length)
      ? v.split('').reduce(
          (accumulator, char, index) => {
            let first = (char !== mask[index]) ? accumulator.mask.indexOf('*') : 0
            return {
              result: accumulator.result
                       + accumulator.mask.substring(0, first)
                       + char,
              mask: accumulator.mask.substr(first + 1)
            }
          }, {
            result: '',
            mask: mask
          }
        ).result
      : v

    return (event) => {
      this.target.setState({
        [this.name]: maskString(value(event), this.mask)
      })
    }
  }
  
  public get () {
    return this.target.state[this.name]
  }

  public get isValid () {
    return this.validate(this.get())
  }

  public get link () {
    return {
      value: this.get(),
      onChange: this.set()
    }
  }
  
  // Deprecated stuff
  get onChange () {
    console.log('ReactModelController.onChange() is deprecated. Use set() instead.')
    return this.set()
  }
  
  get value () {
    console.log('ReactModelController.value is deprecated. Use get() instead.')
    return this.get()
  }
}

export default ReactModelController
