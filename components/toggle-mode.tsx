"use client"

import * as React from "react"
import { Sun1, Moon } from "iconsax-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function ModeToggle() {
    
  const { setTheme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="rounded-lg p-2 border border-slate-200 dark:border-slate-600" size="icon">
          <Sun1 className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="rounded-lg bg-light-100 text-black dark:bg-dark-100 dark:text-white">
        <DropdownMenuItem className="cursor-pointer p-1 hover:bg-blue-200 dark:hover:bg-blue-600 rounded-sm duration-300" onClick={() => setTheme("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer p-1 hover:bg-blue-200 dark:hover:bg-blue-600 rounded-sm duration-300" onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer p-1 hover:bg-blue-200 dark:hover:bg-blue-600 rounded-sm duration-300" onClick={() => setTheme("system")}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
