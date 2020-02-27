import {useEffect} from "react";

/**
 * Prints component lifecycle events to console
 * Used for debug purposes
 * @param name component display name
 */
export function useComponentLifecycleLog(name: string) {
    useEffect(() => {
        console.log(`💫 "${name}" did mount at`, new Date().getTime());

        return () => {
            console.log(`💦 "${name}" did unmount at`, new Date().getTime());
        }
    }, []);
}
