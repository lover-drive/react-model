const mocha = require('mocha')
const describe = mocha.describe
const beforeEach = mocha.beforeEach
const it = mocha.it
const assert = require('chai').assert

import Model from '../src/ReactModelController'

class ReactComponentMock {
  public state: any
  
  constructor () {
    this.state = {}
  }

  setState (_newObject) {
    this.state = Object.assign({}, this.state, _newObject)
  }
}

describe('ReactModelController', () => {
  it('Should update state state onChange()', () => {
    let _component: ReactComponentMock = new ReactComponentMock()
    let _model = new Model({
      target: _component,
      name: 'test_model'
    })
    _model.set(123)
    assert(_component.state.test_model, 123)
  })

  it('Should retrieve value by .get()', () => {
    let _component: ReactComponentMock = new ReactComponentMock()
    let _model = new Model({
      target: _component,
      name: 'test_model'
    })
    _model.set(123)
    assert(_component.state.test_model, _model.get())
  })

  it('.isValid should return true if it is valid (lol)', () => {
    let _component: ReactComponentMock = new ReactComponentMock()
    let _model = new Model({
      target: _component,
      name: 'test_model',
      validate: (_value: string) => {
        return _value.startsWith('a')
      }
    })
    _model.set('asd')
    assert(_model.isValid, true)
  })

  it('.isValid should return false if it is not valid', () => {
    let _component: ReactComponentMock = new ReactComponentMock()
    let _model = new Model({
      target: _component,
      name: 'test_model',
      validate: (_value: string) => {
        return _value.startsWith('a')
      }
    })
    _model.set('dasd')
    assert(_model.isValid === false, true)
  })

  it('Should automatically mask input by regex mask', () => {
    let _component: ReactComponentMock = new ReactComponentMock()
    let _model = new Model({
      target: _component,
      name: 'test_model',
      mask: /a.+/
    })
    _model.set('dasd')
    assert(_model.get(), 'asd')
  })

  it('Should return blank string if value is blank string', () => {
    let _component: ReactComponentMock = new ReactComponentMock()
    let _model = new Model({
      target: _component,
      name: 'test_model',
      mask: /a.+/
    })
    assert(_model.get() === '', true)
  })
})