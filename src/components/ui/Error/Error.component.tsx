import React from 'react';
import { ButtonComponent } from '../Button/Button.component';

import './Error.style.scss';

export default class ErrorComponent extends React.Component<ErrorProps> {
  get hasButtons() {
    return !!this.props.retry || !!this.props.goBack;
  }

  render() {
    return (
      <div className='error'>
        { this.props.code &&
          <span className='error__code'>{this.props.code}</span>
        }
        { this.props.header &&
          <span className='error__header'>{this.props.header}</span> 
        }
        { this.props.message &&
          <span className='error__message'>{this.props.message}</span>
        }
        {this.renderButtons()}
      </div>
    );
  }

  renderButtons() {
    if(this.hasButtons) {
      return (
        <div className='error__buttons'>
          { this.props.goBack &&
            <ButtonComponent onClick={this.props.goBack} color='primary'>
              <span>Go back</span>
            </ButtonComponent>
          }
          { this.props.retry &&
            <ButtonComponent onClick={this.props.retry} color='primary'>
              <span>Try again</span>
            </ButtonComponent>
          }
        </div>
      );
    }
  }
}

export interface ErrorProps {
  code?: string;
  header?: string;
  message?: string;
  goBack?: () => void;
  retry?: () => void;
}
