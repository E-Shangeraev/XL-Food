/* eslint-disable import/prefer-default-export */
import { useRef, useState, useEffect } from 'react'

export const useElementOnScreen = options => {
  const containerRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)
  const [entry, setEntry] = useState(null)

  const callbackFunction = entries => {
    try {
      const [currentEntry] = entries
      setEntry(currentEntry)
      setIsVisible(currentEntry.isIntersecting)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    const observer = new IntersectionObserver(callbackFunction, options)

    if (containerRef.current) observer.observe(containerRef.current)

    return () => {
      if (containerRef.current) observer.unobserve(containerRef.current)
    }
  }, [containerRef])

  return [containerRef, isVisible, entry]
}
