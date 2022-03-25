import React from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';

export function withRouter<T = unknown>(Component: React.ComponentType<T>) {
  const Wrapper = (props: T) => {
    const navigate = useNavigate();
    
    return (
      <Component
        navigate={navigate}
        {...props}
      />
    );
  };
  
  return Wrapper;
}

export interface WithRouterProps {
  navigate: NavigateFunction;
}
