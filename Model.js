export default class Model {
  constructor (_target, _name) {
    this.target = _target
    this.name = _name
    this.onChange = this.onChange.bind(this)
  }

  onChange (_event) {
    let _newState = {}
    _newState[this.name] = _event
    this.target.setState(_newState)
  }

  get value () {
    return this.target.state[this.name]
  }
}
