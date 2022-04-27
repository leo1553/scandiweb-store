import { createBrowserHistory, Update } from 'history';
import React from 'react';
import { Router } from 'react-router-dom';

export const history = createBrowserHistory();

export default class AppRouterComponent extends React.Component<AppRouterProps, Update> {
  private unlisten?: () => void;

  constructor(props: AppRouterProps) {
    super(props);

    this.state = {
      action: history.action,
      location: history.location
    };
  }

  componentDidMount() {
    this.unlisten = history.listen((update) => this.updateHistory(update));
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
        navigator={history}
      />
    );
  }
}

export interface AppRouterProps {
  [x: string]: any;
}
