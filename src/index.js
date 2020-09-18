import React from 'react';

const { Provider, Consumer } = React.createContext();

export class Store extends React.Component {

  constructor(props) {
    super(props);
    const { children, ...initState } = props;
    this.state = initState;
    this.dispatch = this.dispatch.bind(this);
    this.withDispatch = this.withDispatch.bind(this)
  }

  dispatch(namespace, updater, callback) {
    this.setState((state) => ({ [namespace]: updater(state[namespace]) }), callback);
  }

  withDispatch(action) {
    return (...args) => action(this.dispatch)(...args);
  }

  render() {
    return <Provider value={{ state: this.state, withDispatch: this.withDispatch }}>{this.props.children}</Provider>;
  }

}


export function withStore(propsMap, Component) {
  return class WithStore extends React.Component {
    constructor(props) {
      super(props);
      this.consumerChildren = ({ state, withDispatch }) => <Component {...this.props} {...propsMap(state)} withDispatch={withDispatch} />;
    }
    render() {
      return <Consumer children={this.consumerChildren} />;
    }
  }
} 
