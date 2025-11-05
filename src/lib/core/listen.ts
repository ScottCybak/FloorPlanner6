export const listen = <
    T extends EventTarget,
    K extends T extends HTMLElement
        ? keyof HTMLElementEventMap
        : T extends Document
            ? keyof DocumentEventMap
            : T extends Window
                ? keyof WindowEventMap
                : string
>(
    element: T,
    type: K,
    listener: (
        this: T,
        ev: K extends keyof HTMLElementEventMap
            ? HTMLElementEventMap[K]
            : K extends keyof DocumentEventMap
                ? DocumentEventMap[K]
                : K extends keyof WindowEventMap
                    ? WindowEventMap[K]
                    : Event

    ) => any
): () => void => {
    element.addEventListener(type, listener as EventListener);
    return () => element.removeEventListener(type, listener as EventListener);
}