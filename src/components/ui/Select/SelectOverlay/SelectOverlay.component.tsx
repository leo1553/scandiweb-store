import React from 'react';
import { OptionProps } from '../../Option/Option.component';
import OverlayComponent from '../../Overlay/Overlay.component';
import OverlayAnchorComponent from '../../Overlay/OverlayAnchor/OverlayAnchor.component';

export default class SelectOverlayComponent extends React.PureComponent<SelectOverlayProps> {
  private modifyStyle(ref: HTMLElement | null, style: React.CSSProperties) {
    if(ref) {
      const rect = ref.getBoundingClientRect();
      style.minWidth = rect.width;
    }
  }

  render() {
    return (
      <OverlayComponent onClick={this.props.onOutsideClick}>
        <OverlayAnchorComponent anchor={this.props.anchor} modifyStyle={this.modifyStyle}>
          {this.props.children}
        </OverlayAnchorComponent>
      </OverlayComponent>
    );
  }
}

export interface SelectOverlayProps {
  children?: React.ReactElement<OptionProps> | React.ReactElement<OptionProps>[];
  anchor: React.RefObject<HTMLElement>;
  onOutsideClick: (event: React.MouseEvent) => void;
}
