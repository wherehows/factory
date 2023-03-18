import { atom } from "jotai";

export let isBeforePopStateEventTriggered = false;

export const updateIsBeforePopStateEventTriggered = (nextState) => isBeforePopStateEventTriggered = nextState;

export const isCurrentPageVisitedByBackspaceAtom = atom(false);

export const isRoutingAtom = atom(false);