import type { ComponentType } from 'react';

export const withLogger = <P extends object>(Component: ComponentType<P>) => {
  return function ComponentWithLogger(props: P) {
    console.log('Current props: ', props);
    return <Component {...props} />;
  };
};
