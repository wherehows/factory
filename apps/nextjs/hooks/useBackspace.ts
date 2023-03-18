import {
  isBeforePopStateEventTriggered,
  isCurrentPageVisitedByBackspaceAtom,
  updateIsBeforePopStateEventTriggered,
  isRoutingAtom
} from '../atoms/backspaceAtom';
import { useSetAtom } from 'jotai';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
/**
 * Set global states related to a backspace navigation
 * 
 * This hook can be invoked in _app.ts file to append event listener.
 * when event is triggered, those three global states are set.
 * 
 * 1. {@link isBeforePopStateEventTriggered `isBeforePopStateEventTriggered`}
 * 2. {@link isRoutingAtom `isRoutingAtom`}
 * 3. {@link isCurrentPageVisitedByBackspaceAtom `isCurrentPageVisitedByBackspaceAtom`}
 * 
 * please note that out of the three states mentioned earlier, {@link isBeforePopStateEventTriggered `isBeforePopStateEventTriggered`} is not a state managed by React,
 * but rather a regular variable
 */

const useBackspace = () => {
  const router = useRouter();

  const setIsCurrentPageVisitedByBackspace = useSetAtom(
    isCurrentPageVisitedByBackspaceAtom
  );

  const setIsRouting = useSetAtom(isRoutingAtom);

  useEffect(() => {
    // isBeforePopStateEventTriggered always must be initialized as 'false'
    updateIsBeforePopStateEventTriggered(false);

    const handleChangeRouteStart = () => {
      // when route starts, isRouting state is set to 'true'
      setIsRouting(true);

      // depending on isBeforePopStateEventTriggered variable, isCurrentPageVisitedByBackspace is set to 'true' or 'false'
      isBeforePopStateEventTriggered
        ? setIsCurrentPageVisitedByBackspace(true)
        : setIsCurrentPageVisitedByBackspace(false);
    };

    const handleChangeRouteComplete = () => {
      // when route has finished, isRouting state is set to 'false'
      setIsRouting(false);
    };

    router.beforePopState(() => {
      // update isBeforePopStateEventTriggered variable as true only when beforePopState event is triggered
      updateIsBeforePopStateEventTriggered(true);
      return true;
    });

    router.events.on('routeChangeStart', handleChangeRouteStart);
    router.events.on('routeChangeComplete', handleChangeRouteComplete);

    return () => {
      router.events.off('routeChangeStart', handleChangeRouteStart);
      router.events.off('routeChangeComplete', handleChangeRouteComplete);
    };
  }, [router, setIsCurrentPageVisitedByBackspace, setIsRouting]);
};

export default useBackspace;
