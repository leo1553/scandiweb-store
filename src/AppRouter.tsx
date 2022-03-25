import { createBrowserHistory, History, Update } from 'history';
import React from 'react';
import { Router } from 'react-router-dom';

export const history = createBrowserHistory();

export default class AppRouter extends React.Component<AppRouterProps, Update> {
  private unlisten?: () => void;

  constructor(props: AppRouterProps) {
    super(props);

    this.state = {
      action: props.history.action,
      location: props.history.location
    };
  }

  componentDidMount() {
    this.unlisten = this.props.history.listen((update) => this.updateHistory(update));
  }

  componentWillUnmount() {
    if(this.unlisten)
      this.unlisten();
  }

  private updateHistory(update: Update) {
    this.setState(update);
  }

  render() {
    return (
      <Router
        {...this.props}
        location={this.state.location}
        navigationType={this.state.action}
        navigator={this.props.history}
      />
    );
  }
}

export interface AppRouterProps {
  history: History;
  [x: string]: any;
}
