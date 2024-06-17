import { Suspense } from 'react';
import Loading from './Loading';
const Loadable = (Component) => {
  const LoadableComponent = (props) => (
    <Suspense fallback={<Loading/>}>
      <Component {...props} />
    </Suspense>
  );

  return LoadableComponent;
};

export default Loadable;
