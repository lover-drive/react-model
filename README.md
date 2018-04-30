# React Model

A v-model analogue for React.

Tired of defining handleChange() functions? Here's solution, react-model.

```
npm i react-model-controller
```

Usage:
```jsx
import Model from 'react-model-controller'

constructor (props) {
  ...
  this.models = {
    name: new Model(this, 'name')
  }
  ...
}

render () {
  ...
    <input
      value={this.models.name.value}
      onChange={this.models.name.onChange}
    >
  ...
}
```