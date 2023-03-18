import { atom } from "jotai";
/**
 * Determine whether beforePopState event is triggered or not
 */
export let isBeforePopStateEventTriggered = false;

/**
 * Update isBeforePopStateEventTriggered
 * 
 * This function is only called in beforePopState event handler
 */
export const updateIsBeforePopStateEventTriggered = (nextState: boolean) => isBeforePopStateEventTriggered = nextState;

/**
 * State to decide whether the current page has been reached through a backword navigation or not
 * 
 * The setter function for this state is only invoked in the 'routeChangeStart' event handler, 
 * and the state is only set to 'true' if the {@link isBeforePopStateEventTriggered `isBeforePopStateEventTriggered`} flag is 'true'.
 */
export const isCurrentPageVisitedByBackspaceAtom = atom(false);

/**
 * Determine whether routeChange event has finished or not
 * 
 * The setter function for this state is invoked in the 'routeChangeStart' event handler for setting 'true'
 * and also invoked in 'routeChangeComplete' event handler for setting 'false'
 */
export const isRoutingAtom = atom(false);