import { ReactNode } from 'react'

export function Steps({ children }: { children: ReactNode }) {
  return <ol className="list-decimal list-inside space-y-2">{children}</ol>
}

export function Step({ children }: { children: ReactNode }) {
  return <li>{children}</li>
}