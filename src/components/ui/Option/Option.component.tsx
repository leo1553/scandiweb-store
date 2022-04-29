import React from 'react';

export default class OptionComponent extends React.PureComponent<OptionProps> {
  render() {
    return this.props.children;
  }
}

export interface OptionProps {
  children?: React.ReactNode;
  label: string;
  value: unknown;
  disabled?: boolean;
}
