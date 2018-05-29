# React Model

An easy way to implement two-way data binding in React without using mixins.
Tired of defining handleChange() functions? Here's solution, react-model-controller.

```
npm i react-model-controller
```

Usage:
```jsx
import ModelController from 'react-model-controller'

constructor (props) {
  ...
  this.models = {
    name: ModelController.create({
      target: this,
      name: 'name'
    })
  }
  ...
}

render () {
  ...
    <input
      value={this.models.name.get()}
      onChange={this.models.name.set()}
    >
  ...
}
```

or

```jsx
<input {...ModelController.link(this, 'name')}>
```

## API
#### public static ReactModelController.create()
| Argument     | Type            |                                                                                                          |
|--------------|-----------------|----------------------------------------------------------------------------------------------------------|
| target       | React.Component | A react component, which state should be updated, when input value changes. Most of the time it will be  |
| name         | String          | A name for state prop to change.                                                                         |
| defaultValue | Any             | Default value to state.                                                                                  |
| validate     | Function        | Function                                                                                                 |
| mask         | String          | An input mask. Example: "**** **** **** ****"                                                            |

Returns a new ReactModelController instance.

## Changelog
#### v2.0
- Added automating input masking.
- Added ReactModelController.create() static method
- Added .link public property