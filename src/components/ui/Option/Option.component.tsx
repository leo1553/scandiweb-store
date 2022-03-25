import React from 'react';

export default class OptionComponent extends React.Component<OptionProps> {
  render() {
    return this.props.children;
  }
}

export interface OptionProps {
  children?: React.ReactNode;
  name: string;
  value: unknown;
  disabled?: boolean;
}
