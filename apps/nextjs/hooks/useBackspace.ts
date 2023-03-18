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
        updateIsBeforePopStateEventTriggered(false);

        const handleChangeRouteStart = () => {
            setIsRouting(true);

            isBeforePopStateEventTriggered
                ? setIsCurrentPageVisitedByBackspace(true)
                : setIsCurrentPageVisitedByBackspace(false);
        };

        const handleChangeRouteComplete = () => {
            setIsRouting(false);
        };

        router.beforePopState(() => {
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
