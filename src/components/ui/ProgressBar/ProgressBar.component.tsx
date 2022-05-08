import React from 'react';

import './LoadingBar.style.scss';

export class ProgressBarComponent extends React.PureComponent<ProgressBarProps> {
  constructor(props: ProgressBarProps) {
    super(props);
  }

  get percentage() {
    return Math.min(this.props.value / this.props.total, 1) * 100;
  }

  render() {
    return (
      <div className='loading-bar'>
        <div className='progress-bar__bar' style={{ width: `${this.percentage}%` }} />
      </div>
    );
  }
}

export interface ProgressBarProps {
  value: number;
  total: number;
}
