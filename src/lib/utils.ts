import { useEffect, useState } from "react"
import useBreakpoint from "use-breakpoint"

const BREAKPOINTS = { mobile: 0, tablet: 768, desktop: 1280 }

export const useResponsive = () => {
  const { breakpoint } = useBreakpoint(BREAKPOINTS)

  const isMobile = breakpoint === "mobile"
  const isTablet = breakpoint === "tablet"
  const isDesktop = breakpoint === "desktop"

  return { isMobile, isTablet, isDesktop }
}

export function useIsVisible(ref: React.RefObject<any>) {
  const [isIntersecting, setIntersecting] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) =>
      setIntersecting(entry.isIntersecting)
    )

    observer.observe(ref.current)
    return () => {
      observer.disconnect()
    }
  }, [ref])

  return isIntersecting
}
