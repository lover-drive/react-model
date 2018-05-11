class ReactModelController {
  private target: any
  private name: string
  private validate: Function
  private mask: RegExp

  constructor ({
    target,
    name,
    defaultValue = '',
    validate = () => true,
    mask = /.+/
  }: {
    target: any,
    name: string,
    defaultValue?: any,
    validate?: Function,
    mask?: RegExp
  }) {
    this.target = target
    this.name = name
    this.validate = validate
    this.mask = mask

    if (this.target.state == null) {
      this.target.state = {}
    }
    this.target.state[this.name] = defaultValue

    this.onChange = this.onChange.bind(this)
    this.set = this.set.bind(this)
    this.get = this.get.bind(this)
  }

  public set (_value) {
    let _newState: any = {}
    
    if (_value.target == null) {
      _newState[this.name] = _value
    } else {
    _newState[this.name] = _value.target.value
    }
    
    this.target.setState(_newState)
  }
  
  public get () {
    if (typeof this.target.state[this.name] === 'string') {
      if (this.target.state[this.name].match(this.mask)) {
        return this.target.state[this.name].match(this.mask)[0]
      }
      return this.target.state[this.name]
    }
    return this.target.state[this.name]
  }

  public get isValid () {
    return this.validate(this.get())
  }
  
  // Deprecated stuff
  public onChange (_value) {
    console.log('ReactModelController.onChange() is deprecated. Use set() instead.')
    this.set(_value)
  }
  
  get value () {
    console.log('ReactModelController.value is deprecated. Use get() instead.')
    return this.get()
  }
}

export default ReactModelController
