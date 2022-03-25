import React from 'react';
import { Location, NavigateFunction, Params, useLocation, useNavigate, useParams } from 'react-router-dom';

export function withRouter<T extends RoutedProps>(Component: React.ComponentType<T>) {
  const Wrapper = (props: Omit<T, keyof RoutedProps>) => {
    const location = useLocation();
    const navigate = useNavigate();
    const params = useParams();
    
    return (
      <Component
        {...props as T}
        navigate={navigate}
        location={location}
        params={params}
      />
    );
  };
  
  return Wrapper;
}

export interface RoutedProps {
  location: Location;
  navigate: NavigateFunction;
  params: Params<string>;
}
