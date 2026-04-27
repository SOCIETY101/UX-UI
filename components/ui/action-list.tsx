"use client"

import * as React from "react"
import { Menu as MenuPrimitive } from "@base-ui/react/menu"
import { IconDots } from "@tabler/icons-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type ActionListItem = {
  label: string
  icon: React.ComponentType<{ className?: string }>
  onSelect?: () => void
  destructive?: boolean
}

type ActionListProps = {
  label?: string
  items: ActionListItem[]
  align?: "start" | "center" | "end"
  side?: "top" | "right" | "bottom" | "left"
  className?: string
  contentClassName?: string
}

export function ActionList({
  label = "Open row actions",
  items,
  align = "end",
  side = "bottom",
  className,
  contentClassName,
}: ActionListProps) {
  return (
    <MenuPrimitive.Root>
      <MenuPrimitive.Trigger
        data-slot="action-list-trigger"
        render={
          <Button
            variant="ghost"
            size="icon-sm"
            className={cn(
              "rounded-lg bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-900 aria-expanded:bg-slate-200 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-50 dark:aria-expanded:bg-zinc-800",
              className
            )}
            aria-label={label}
          />
        }
      >
        <IconDots className="size-4" />
      </MenuPrimitive.Trigger>
      <MenuPrimitive.Portal>
        <MenuPrimitive.Positioner
          className="isolate z-50 outline-none"
          align={align}
          side={side}
          sideOffset={8}
        >
          <MenuPrimitive.Popup
            data-slot="action-list-content"
            className={cn(
              "min-w-56 rounded-sm border border-slate-200 bg-white p-1.5 text-slate-950 shadow-xl outline-none dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50",
              "origin-(--transform-origin) duration-100 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95",
              contentClassName
            )}
          >
            {items.map((item) => {
              const Icon = item.icon

              return (
                <MenuPrimitive.Item
                  key={item.label}
                  data-slot="action-list-item"
                  data-variant={item.destructive ? "destructive" : "default"}
                  onClick={item.onSelect}
                  className={cn(
                    "flex h-11 cursor-default items-center gap-2.5 rounded-md px-2.5 text-[15px] font-normal text-slate-900 outline-none select-none focus:bg-slate-100 focus:text-slate-950 data-highlighted:bg-slate-100 data-highlighted:text-slate-950 dark:text-zinc-100 dark:focus:bg-zinc-900 dark:focus:text-zinc-50 dark:data-highlighted:bg-zinc-900 dark:data-highlighted:text-zinc-50 [&_svg]:shrink-0",
                    item.destructive &&
                      "text-red-600 focus:bg-red-50 focus:text-red-700 data-highlighted:bg-red-50 data-highlighted:text-red-700 dark:text-red-400 dark:focus:bg-red-950/40 dark:focus:text-red-300 dark:data-highlighted:bg-red-950/40 dark:data-highlighted:text-red-300"
                  )}
                >
                  <Icon
                    className={cn(
                      "size-5 text-slate-500 dark:text-zinc-500",
                      item.destructive && "text-red-600 dark:text-red-400"
                    )}
                  />
                  <span>{item.label}</span>
                </MenuPrimitive.Item>
              )
            })}
          </MenuPrimitive.Popup>
        </MenuPrimitive.Positioner>
      </MenuPrimitive.Portal>
    </MenuPrimitive.Root>
  )
}

export type { ActionListItem }
