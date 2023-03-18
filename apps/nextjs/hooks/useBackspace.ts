import {
  isBeforePopStateEventTriggered,
  isCurrentPageVisitedByBackspaceAtom,
  updateIsBeforePopStateEventTriggered,
  isRoutingAtom
} from '../atoms/backspaceAtom';
import { useSetAtom } from 'jotai';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

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

      // depending on isBeforePopStateEventTriggerd variable, isCurrentPageVisitedByBackspace is set to 'true' or 'false'
      isBeforePopStateEventTriggered
        ? setIsCurrentPageVisitedByBackspace(true)
        : setIsCurrentPageVisitedByBackspace(false);
    };

    const handleChangeRouteComplete = () => {
      // when route has finished, isRouting state is set to 'false'
      setIsRouting(false);
    };

    router.beforePopState(() => {
      // update isBeforePopStateEventTriggerd variable as true only when beforePopState event is triggered
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
