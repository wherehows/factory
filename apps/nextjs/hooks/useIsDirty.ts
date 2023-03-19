import { deepEqual } from '../utils/assistances';
import { useEffect, useRef, useState } from 'react';
/**
 * Monitor a state if it has been changed from it's original value or not
 * 
 * This hook is useful for checking if an existing state has been modified or not. 
 * So, if the user tries to leave the current page after editing its state without saving the changes, 
 * the isDirty value returned by this hook will be true.
 * This can be used to display an alert modal that warns the user that any unsaved changes will be lost if they leave the page.
 * 
 * @param targetState A target state to monitor
 * 
 * @param isTargetStateInitialized Option to wait for storing the original state or to store it immediately
 * The original value may be set at a later time. 
 * For example, when a user tries to edit a post and reaches the edit page, 
 * the page may need to display the page with the previously written data. 
 * To accomplish this, a server request may need to be made and there may be a waiting time. 
 * When it is ready to store the original value after receiving the server response, 
 * the setIsPossibleToCaptureOriginState setter that is returned by this hook can be called to capture original state.
 */
const useIsDirty = <T>(
    targetState: T,
    isTargetStateInitialized = true
) => {
    const originStateRef = useRef<T>();
    const isOriginStateCapturedRef = useRef(false);
    const [isPossibleToCaptureOriginState, setIsPossibleToCaptureOriginState] = useState(
        isTargetStateInitialized
    );

    useEffect(() => {
        // If it is not possible to capture original state Or Already original state is captured, return early
        if (!isPossibleToCaptureOriginState || isOriginStateCapturedRef.current) {
            return;
        }

        // If it is possible to capture original state, capture state
        if (isPossibleToCaptureOriginState) {
            originStateRef.current = targetState;
        }

        // After capturing the original state, set isOriginalStateCapturedRef to true to prevent the state from being captured again
        isOriginStateCapturedRef.current = true;
    }, [
        isTargetStateInitialized,
        isPossibleToCaptureOriginState,
        targetState
    ]);

    return {
        isOriginStateCaptured: isOriginStateCapturedRef.current,
        isDirty: isOriginStateCapturedRef.current
            ? !deepEqual(originStateRef.current, targetState)
            : undefined,
        setIsPossibleToCaptureOriginState
    };
};

export default useIsDirty;