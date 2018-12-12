import React from 'react';

const { Provider, Consumer } = React.createContext();

export class Store extends React.Component {

  constructor(props) {
    super(props);
    const { children, ...initState } = props;
    this.state = initState;
    this.dispatch = this.dispatch.bind(this);
  }

  dispatch(namespace, updater, callback) {
    if (typeof updater === 'function') {
      this.setState((state) => ({ [namespace]: updater(state[namespace]) }), callback);
    } else {
      this.setState({ [namespace]: updater }, callback);
    }
  }

  render() {
    return (
      <Provider value={{ state: this.state, dispatch: this.dispatch }}>{this.props.children}</Provider>
    );
  }

}

export function withStore(propsMap, Component) {
  return function WithStore(props) {
    return (
      <Consumer>
        {({ state, dispatch }) => <Component {...props} {...propsMap(state)} dispatch={dispatch} />}
      </Consumer>
    )
  }
} 
