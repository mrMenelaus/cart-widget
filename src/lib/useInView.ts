import { useCallback, useRef, type RefCallback } from "react"

export function useInView (callback: () => void) {
    const ref: RefCallback<HTMLElement> = useCallback((node: HTMLElement) => {
        const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
            callback()
        }
    })
        observer.observe(node)
        return () => observer.unobserve(node)
    }, [callback])

    return ref
}