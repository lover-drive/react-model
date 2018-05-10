export default class Model {
  static handleChange (_target) {
    return (_name) => {
      return (_value) => {
        //let _newState = {}
        // if (!.target) {
        //   _newState[this.name] = _event
        // } else {
        //   _newState[this.name] = _event.target.value
        // }
        // this.target.setState(_newState)
      }
    }
  }

  constructor (_target, _name) {
    this.target = _target
    this.name = _name
    this.onChange = this.onChange.bind(this)

    
    Object.defineProperty(this, 'value', {
      get: this.getValue.bind.this()
    })
  }

  onChange (_event) {
    let _newState = {}
    if (!_event.target) {
      _newState[this.name] = _event
    } else {
      _newState[this.name] = _event.target.value
    }
    this.target.setState(_newState)
    console.log(instanceof _event)
  }

  getValue () {
    return this.target.state[this.name]
  }
}
