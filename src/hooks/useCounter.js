import { useState } from 'react'

export default function useCounter(initial = 0, maximum = 10) {
  const [count, setCount] = useState(initial)

  function increment() {
    if (count >= maximum) return
    setCount(prevCount => prevCount + 1)
  }

  function decrement() {
    if (count < 1) return
    setCount(prevCount => prevCount - 1)
  }

  function goTo(value) {
    setCount(value)
  }

  return [count, increment, decrement, goTo]
}
