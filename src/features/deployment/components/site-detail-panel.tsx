import { useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { cn } from "@/lib/utils"
import type { DeploymentSite } from "../types"

// ---- Toggle class ----

const toggleItemClassName =
  "data-pressed:bg-primary data-pressed:text-primary-foreground"

// ---- Status display config ----

const statusConfig = {
  completed: {
    circle: "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300",
    badge: "bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300",
    label: "Completed",
  },
  "in-progress": {
    circle:
      "bg-yellow-100 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-300",
    badge:
      "bg-yellow-50 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-300",
    label: "In Progress",
  },
  planned: {
    circle:
      "bg-orange-100 text-orange-700 dark:bg-orange-950 dark:text-orange-300",
    badge:
      "bg-orange-50 text-orange-700 dark:bg-orange-950 dark:text-orange-300",
    label: "Planned",
  },
}

// ---- Main component ----

interface SiteDetailPanelProps {
  sites: DeploymentSite[]
  selectedSiteId?: string
  onSiteSelect?: (siteId: string | undefined) => void
}

export function SiteDetailPanel({
  sites,
  selectedSiteId,
  onSiteSelect,
}: SiteDetailPanelProps) {
  const [activeTab, setActiveTab] = useState("all")

  const filteredSites = sites.filter((site) => {
    if (activeTab === "all") return true
    if (activeTab === "completed") return site.status === "completed"
    if (activeTab === "active") return site.status === "in-progress"
    if (activeTab === "planned") return site.status === "planned"
    return true
  })

  const selectedSite = sites.find((s) => s.id === selectedSiteId)

  return (
    <Card className="flex flex-col overflow-hidden lg:min-h-0 lg:flex-1">
      {/* Header: title + inline tab pills */}
      <CardHeader className="shrink-0">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="font-heading text-base font-semibold">
            Site Detail
          </span>
          <ToggleGroup
            value={[activeTab]}
            onValueChange={([next]) => {
              if (next) setActiveTab(next)
            }}
            className="flex"
          >
            <ToggleGroupItem value="all" className={toggleItemClassName}>
              All
            </ToggleGroupItem>
            <ToggleGroupItem value="completed" className={toggleItemClassName}>
              Completed
            </ToggleGroupItem>
            <ToggleGroupItem value="active" className={toggleItemClassName}>
              Active
            </ToggleGroupItem>
            <ToggleGroupItem value="planned" className={toggleItemClassName}>
              Planned
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
      </CardHeader>

      {/* Body: scrollable list + conditional detail panel */}
      <CardContent className="flex min-h-0 flex-1 flex-col p-0">
        {/* Scrollable site list */}
        <div className="min-h-0 flex-1 overflow-y-auto">
          <div className="divide-y">
            {filteredSites.length > 0 ? (
              filteredSites.map((site) => (
                <SiteListItem
                  key={site.id}
                  site={site}
                  isSelected={selectedSiteId === site.id}
                  onSelect={() =>
                    onSiteSelect?.(
                      selectedSiteId === site.id ? undefined : site.id
                    )
                  }
                />
              ))
            ) : (
              <p className="py-4 text-center text-sm text-muted-foreground">
                No sites found
              </p>
            )}
          </div>
        </div>

        {/* Site detail — only shown when a site is selected */}
        {selectedSite && (
          <>
            <Separator />
            <SiteDetailView site={selectedSite} />
          </>
        )}
      </CardContent>
    </Card>
  )
}

// ---- Site list item ----

interface SiteListItemProps {
  site: DeploymentSite
  isSelected: boolean
  onSelect: () => void
}

function SiteListItem({ site, isSelected, onSelect }: SiteListItemProps) {
  const config = statusConfig[site.status]

  return (
    <button
      onClick={onSelect}
      className={cn(
        "flex w-full gap-3 px-6 py-3 text-left transition-colors hover:bg-primary/5",
        isSelected ? "bg-primary/5" : ""
      )}
    >
      {/* Status circle */}
      <div
        className={cn(
          "flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-mono text-xs font-semibold",
          config.circle
        )}
      >
        {site.siteNumber}
      </div>

      {/* Info */}
      <div className="flex-1 space-y-1 overflow-hidden">
        <h4 className="truncate text-sm font-semibold">{site.title}</h4>
        <p className="text-xs text-muted-foreground">{site.location}</p>
        <div className="flex flex-wrap gap-1">
          {[...site.badges]
            .sort((a, b) => {
              const aIsPhase = a.toLowerCase().startsWith("phase")
              const bIsPhase = b.toLowerCase().startsWith("phase")
              if (aIsPhase && !bIsPhase) return -1
              if (!aIsPhase && bIsPhase) return 1
              return 0
            })
            .map((badge) => (
              <Badge
                key={badge}
                className="bg-primary/10 text-xs font-normal text-primary"
              >
                {badge}
              </Badge>
            ))}
        </div>
      </div>
    </button>
  )
}

// ---- Site detail view (bottom panel) ----

function SiteDetailView({ site }: { site: DeploymentSite }) {
  const config = statusConfig[site.status]

  return (
    <div className="shrink-0 px-6 py-4">
      {/* Title + status badge */}
      <div className="flex items-start justify-between gap-2">
        <h3 className="font-heading text-base font-semibold">{site.title}</h3>
        <Badge className={cn("shrink-0", config.badge)}>{config.label}</Badge>
      </div>

      {/* Location */}
      <p className="mt-0.5 text-sm text-muted-foreground">{site.location}</p>

      {/* Detail rows */}
      <div className="mt-4 flex flex-col gap-2">
        {site.date && (
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Date</span>
            <span className="font-mono">{site.date}</span>
          </div>
        )}
        {site.blocksUsed != null && (
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Blocks used</span>
            <span className="font-mono font-semibold">{site.blocksUsed}</span>
          </div>
        )}
        {site.contact && (
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Contact</span>
            <span className="text-right">{site.contact}</span>
          </div>
        )}
      </div>

      {/* Description */}
      {site.description && (
        <p className="mt-4 text-sm text-primary">{site.description}</p>
      )}
    </div>
  )
}
