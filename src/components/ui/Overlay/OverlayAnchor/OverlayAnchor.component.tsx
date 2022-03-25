import React from 'react';

export default class OverlayAnchorComponent extends React.Component<OverlayAnchorProps, OverlayAnchorState> {
  constructor(props: OverlayAnchorProps) {
    super(props);

    this.state = {
      left: 0,
      top: 0
    };
  }

  private getPosition() {
    const target = this.props.anchor.current;
    if(target) {
      const targetRect = target.getBoundingClientRect();

      return {
        left: targetRect.left,
        top: targetRect.top + targetRect.height
      };
    }
  }

  private getStyle() {
    const style: React.CSSProperties = {
      position: 'absolute',
      left: this.state.left,
      top: this.state.top
    };
    this.props.modifyStyle?.(this.props.anchor.current, style);
    return style;
  }

  private updatePosition() {
    const position = this.getPosition();
    if(position)
      this.setState(position);
  }

  componentDidMount() {
    window.addEventListener('resize', this.updatePosition.bind(this));
    this.updatePosition();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updatePosition.bind(this));
  }

  render() {
    if(this.props.children) {
      return React.Children.map(this.props.children, (child) => {
        if (React.isValidElement(child)) {
          return (
            <div style={this.getStyle()}>
              {child}
            </div>
          );
        }
        return child;
      });
    }
  }
}

export interface OverlayAnchorProps {
  children?: React.ReactNode;
  anchor: React.RefObject<HTMLElement>;
  modifyStyle?: (ref: HTMLElement | null, style: React.CSSProperties) => void;
}

export interface OverlayAnchorState {
  left: number;
  top: number;
}
