import { useEffect, useState } from "react"
import { MapContainer, Marker, Popup, useMap } from "react-leaflet"
import { Card, CardContent } from "@/components/ui/card"
import { Toggle } from "@/components/ui/toggle"
import { Satellite, Map as MapIcon } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import L from "leaflet"
import "leaflet/dist/leaflet.css"
import type { DeploymentSite } from "../types"

// Custom marker icons for different statuses
const createCustomIcon = (status: string) => {
  const colors = {
    completed: "#22c55e", // green-500
    "in-progress": "#eab308", // yellow-500
    planned: "#f97316", // orange-500
  }

  const color = colors[status as keyof typeof colors] || "#6b7280"

  return L.divIcon({
    html: `<div style="background-color: ${color}; width: 32px; height: 32px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3); display: flex; align-items: center; justify-content: center; font-weight: 600; color: white; font-size: 11px; transform: translate(-50%, -50%);">${status === "completed" ? "✓" : status === "in-progress" ? "◐" : "○"}</div>`,
    className: "",
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, -16],
  })
}

const BAGONG_SILANG_CENTER: [number, number] = [
  14.776838282222053, 121.05383925153258,
]

interface DeploymentMapProps {
  sites: DeploymentSite[]
  selectedSiteId?: string
  onSiteSelect?: (siteId: string) => void
}

// Flies to selected site when selectedSiteId changes
function MapController({
  selectedSiteId,
  sites,
}: {
  selectedSiteId?: string
  sites: DeploymentSite[]
}) {
  const map = useMap()

  useEffect(() => {
    if (!selectedSiteId) return
    const site = sites.find((s) => s.id === selectedSiteId)
    if (site) {
      map.flyTo(site.coordinates, 16, { duration: 1 })
    }
  }, [selectedSiteId, sites, map])

  return null
}

// Manages tile layer switching (OSM ↔ Esri satellite).
// Owns ALL tile layer management — no static <TileLayer> in JSX to avoid duplicate loads.
function MapLayerToggle() {
  const [useSatellite, setUseSatellite] = useState(false)
  const map = useMap()

  useEffect(() => {
    // Clear any existing tile layers then add the correct one
    map.eachLayer((layer) => {
      if (layer instanceof L.TileLayer) {
        map.removeLayer(layer)
      }
    })

    const tileLayer = useSatellite
      ? L.tileLayer(
          "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
          {
            attribution: "Tiles © Esri",
            maxZoom: 19,
          }
        )
      : L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution:
            '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
          maxZoom: 19,
        })

    tileLayer.addTo(map)
  }, [useSatellite, map])

  return (
    <div className="absolute top-3 right-3 z-[1000]">
      <Toggle
        pressed={useSatellite}
        onPressedChange={setUseSatellite}
        className="bg-white shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700"
        aria-label="Toggle satellite view"
      >
        {useSatellite ? (
          <MapIcon className="h-4 w-4" />
        ) : (
          <Satellite className="h-4 w-4" />
        )}
      </Toggle>
    </div>
  )
}

export function DeploymentMap({
  sites,
  selectedSiteId,
  onSiteSelect,
}: DeploymentMapProps) {
  return (
    <Card className="overflow-hidden lg:min-h-0 lg:flex-1">
      <CardContent className="p-0">
        <div className="relative h-[400px] w-full lg:h-[600px]">
          <MapContainer
            center={BAGONG_SILANG_CENTER}
            zoom={14}
            scrollWheelZoom={true}
            className="h-full w-full"
            style={{ height: "100%", width: "100%" }}
          >
            <MapController selectedSiteId={selectedSiteId} sites={sites} />
            {/* MapLayerToggle owns all tile layers — no static <TileLayer> here */}
            <MapLayerToggle />
            {sites.map((site) => (
              <Marker
                key={site.id}
                position={site.coordinates}
                icon={createCustomIcon(site.status)}
                eventHandlers={{
                  click: () => {
                    onSiteSelect?.(site.id)
                  },
                }}
              >
                <Popup>
                  <div className="space-y-2 p-1">
                    <div className="flex items-center gap-2">
                      <div className="font-mono text-xs font-semibold">
                        {site.siteNumber}
                      </div>
                      <h4 className="text-sm font-semibold">{site.title}</h4>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {site.location}
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {site.badges.map((badge) => (
                        <Badge
                          key={badge}
                          variant="outline"
                          className="text-xs"
                        >
                          {badge}
                        </Badge>
                      ))}
                    </div>
                    {site.blocksUsed && (
                      <p className="text-xs">
                        <span className="font-medium">Blocks:</span>{" "}
                        {site.blocksUsed}
                      </p>
                    )}
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>

          {/* Legend */}
          <div className="absolute bottom-3 left-3 z-[1000] rounded-lg bg-white p-3 text-xs shadow-md dark:bg-gray-800">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-green-500"></div>
                <span>Completed</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                <span>In Progress</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-orange-500"></div>
                <span>Planned</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
