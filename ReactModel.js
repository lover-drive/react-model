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

  constructor ({
    target,
    name
  }) {
    this.target = target
    this.name = name
    this.isValid = true
    this.onChange = this.onChange.bind(this)
  }

  onChange (_event) {
    let _newState = {}
    if (!_event.target) {
      _newState[this.name] = _event
    } else {
      _newState[this.name] = _event.target.value
    }
    this.target.setState(_newState)
    console.log(_event instanceof Proxy)
  }

  get value () {
    return this.target.state[this.name]
  }
}
