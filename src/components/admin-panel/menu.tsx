import { Ellipsis, LogOut } from "lucide-react"
import { cn } from "@/lib/utils"
import { getMenuList } from "@/lib/menu-list"
import { Button } from "@/components/ui/button"
import { CollapseMenuButton } from "@/components/admin-panel/collapse-menu-button"
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip"
import { Link, useLocation } from "@tanstack/react-router"
import { motion } from "motion/react"

interface MenuProps {
  isOpen: boolean | undefined
}

export function Menu({ isOpen }: MenuProps) {
  const pathname = useLocation({
    select: (location) => location.pathname,
  })
  const menuList = getMenuList(pathname)

  return (
    <>
      <nav className="scrollbar-thin min-h-0 w-full flex-1 overflow-x-hidden overflow-y-auto pt-8">
        <ul className="flex flex-col items-start space-y-1 px-2">
          {" "}
          {menuList.map(({ groupLabel, menus }, index) => (
            <li className={cn("w-full", groupLabel ? "pt-5" : "")} key={index}>
              {(isOpen && groupLabel) || isOpen === undefined ? (
                <p className="max-w-62 truncate px-4 pb-2 text-sm font-medium text-muted-foreground">
                  {groupLabel}
                </p>
              ) : !isOpen && isOpen !== undefined && groupLabel ? (
                <Tooltip key={`group-${index}-${isOpen}`}>
                  <TooltipTrigger className="w-full">
                    <div className="flex w-full items-center justify-center">
                      <Ellipsis className="h-5 w-5" />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    <p>{groupLabel}</p>
                  </TooltipContent>
                </Tooltip>
              ) : (
                <p className="pb-2"></p>
              )}
              {menus.map(
                ({ id, href, label, icon: Icon, active, submenus }) => {
                  const isActive =
                    active === undefined
                      ? href === "/"
                        ? pathname === href
                        : pathname.startsWith(href)
                      : active

                  return !submenus || submenus.length === 0 ? (
                    <div className="relative w-full" key={id}>
                      {isActive && (
                        <motion.div
                          className="absolute top-0 left-0 h-full w-1 rounded-md bg-primary"
                          layoutId="active-menu-indicator"
                        />
                      )}

                      {isActive && (
                        <motion.div
                          className="absolute top-0 left-0 h-full w-full rounded-md bg-primary/10"
                          layoutId="active-menu-background"
                        />
                      )}
                      <Tooltip disableHoverablePopup key={`${id}-${isOpen}`}>
                        <TooltipTrigger
                          render={
                            <Button
                              nativeButton={false}
                              className={cn(
                                "hover:text-text mb-1 h-10 w-full justify-start ps-4 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                                isActive &&
                                  "text-primary! hover:bg-transparent!"
                              )}
                              variant="ghost"
                              render={
                                <Link
                                  className="relative flex w-full items-center"
                                  to={href}
                                >
                                  <span
                                    className={cn(
                                      isOpen === false
                                        ? "absolute left-1/2 -translate-x-1/2"
                                        : "mr-4"
                                    )}
                                  >
                                    <Icon size={18} />
                                  </span>
                                  <p
                                    className={cn(
                                      "max-w-50 truncate text-base",
                                      isOpen === false
                                        ? "-translate-x-96 opacity-0"
                                        : "translate-x-0 opacity-100"
                                    )}
                                  >
                                    {label}
                                  </p>
                                </Link>
                              }
                            />
                          }
                        />
                        {isOpen === false && (
                          <TooltipContent side="right">{label}</TooltipContent>
                        )}
                      </Tooltip>
                    </div>
                  ) : (
                    <div className="w-full" key={id}>
                      <CollapseMenuButton
                        active={isActive}
                        icon={Icon}
                        isOpen={isOpen}
                        label={label}
                        submenus={submenus}
                      />
                    </div>
                  )
                }
              )}
            </li>
          ))}
        </ul>
      </nav>

      <div className="w-full shrink-0 px-2 pt-2 pb-4 lg:pb-0">
        <Tooltip disableHoverablePopup>
          <TooltipTrigger
            render={
              <Button
                onClick={() => {}}
                variant="outline"
                className="mt-5 h-10 w-full justify-center"
              >
                <span className={cn(isOpen === false ? "" : "mr-4")}>
                  <LogOut size={18} />
                </span>
                <p
                  className={cn(
                    "whitespace-nowrap",
                    isOpen === false ? "hidden opacity-0" : "opacity-100"
                  )}
                >
                  Sign out
                </p>
              </Button>
            }
          />
          {isOpen === false && (
            <TooltipContent side="right">Sign out</TooltipContent>
          )}
        </Tooltip>
      </div>
    </>
  )
}
