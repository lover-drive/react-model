const mocha = require('mocha')
const describe = mocha.describe
const beforeEach = mocha.beforeEach
const it = mocha.it
const assert = require('chai').assert

import Model from './ReactModelController'

class ReactComponentMock {
  public state: any
  
  constructor () {
    this.state = {}
  }

  setState (newObject) {
    this.state = {
      ...this.state,
      ...newObject
    }
  }
}

describe('ReactModelController', () => {
  describe('.create()', () => {
    it('Should update state by .set()', () => {
      let component: ReactComponentMock = new ReactComponentMock()
      let model = Model.create({
        target: component,
        name: 'testmodel'
      })
      model.set()(123)
      assert.equal(component.state.testmodel, 123)
    })

    it('Should set correct value determined by function on .set()', () => {
      let component: ReactComponentMock = new ReactComponentMock()
      let model = Model.create({
        target: component,
        name: 'testmodel'
      })
      model.set(x => x.test)({
        test: 123
      })
      assert.equal(component.state.testmodel, '123')
    })

    it('Should retrieve value by .get()', () => {
      let component: ReactComponentMock = new ReactComponentMock()
      let model = Model.create({
        target: component,
        name: 'testmodel'
      })
      model.set()(123)
      assert.equal(component.state.testmodel, model.get())
    })

    it('.isValid should return true if it is valid (lol)', () => {
      let component: ReactComponentMock = new ReactComponentMock()
      let model = Model.create({
        target: component,
        name: 'testmodel',
        validate: (value: string) => {
          return value[0] === 'a'
        }
      })
      model.set()('asd')
      console.log(model.get())
      assert(model.isValid)
    })

    it('.isValid should return false if it is not valid', () => {
      let component: ReactComponentMock = new ReactComponentMock()
      let model = Model.create({
        target: component,
        name: 'testmodel',
        validate: (value: string) => {
          return value[0] === 'a'
        }
      })
      model.set()('dasd')
      assert(!model.isValid)
    })

    it('Should automatically mask input by regex mask', () => {
      let component: ReactComponentMock = new ReactComponentMock()
      let model = Model.create({
        target: component,
        name: 'testmodel',
        mask: '**** **** **** ****'
      })
      model.set()('1234432112344321')
      assert.equal(model.get(), '1234 4321 1234 4321')
    })

    it('Should automatically mask input by regex mask as you input', () => {
      let component: ReactComponentMock = new ReactComponentMock()
      let model = Model.create({
        target: component,
        name: 'testmodel',
        mask: '**** **** **** ****'
      })
      model.set()('1')
      model.set()(model.get() + '2')
      model.set()(model.get() + '3')
      model.set()(model.get() + '4')
      model.set()(model.get() + '5')
      model.set()(model.get() + '6')
      model.set()(model.get() + '7')
      assert.equal(model.get(), '1234 567')
    })
    
    it('Should return blank string if value is blank string', () => {
      let component: ReactComponentMock = new ReactComponentMock()
      let model = Model.create({
        target: component,
        name: 'testmodel'
      })
      assert(model.get() === '', true)
    })
  })

  describe('.linkState()', () => {
    it('Should create an object that defines .value and .onChange', () => {
      let model = Model.create({
        target: {},
        name: 'test-model'
      })
      assert.hasAllKeys(model.link, ['value', 'onChange'])
    })
  })
})