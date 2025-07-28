import { useCallback, useRef, type RefCallback } from "react"

export function useInView (callback: () => void) {
    const freshCallbackRef = useRef(callback)
    freshCallbackRef.current = callback


    const ref: RefCallback<HTMLElement> = useCallback((node: HTMLElement) => {
        const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
            freshCallbackRef.current()
        }
    })
        observer.observe(node)
        return () => observer.unobserve(node)
    }, [])

    return ref
}