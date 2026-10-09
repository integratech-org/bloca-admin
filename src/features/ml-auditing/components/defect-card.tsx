import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface Props {
  confidence: number
  batchId: string
  imageUrl: string
}

export function DefectCard({ confidence, batchId, imageUrl }: Props) {
  return (
    <Card className="overflow-hidden pt-0">
      {/* image */}
      <div className="relative aspect-video w-full overflow-hidden rounded-t-xl">
        <img
          src={imageUrl}
          alt={`${batchId}`}
          className="h-full w-full object-cover"
          loading="lazy"
        />

        <Badge className="absolute top-2 right-2 bg-black/60 text-green-300">
          {confidence}% conf.
        </Badge>

        <span className="absolute bottom-2 left-3 font-mono text-xs text-slate-300">
          {batchId} · CV-CAPTURE
        </span>
      </div>

      <CardContent className="flex flex-col gap-2">
        <div className="flex items-start justify-between">
          <span className="text-base font-semibold">Void Inclusion</span>
          <Badge className="bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300">
            Critical
          </Badge>
        </div>

        <div className="flex items-center justify-between">
          <Badge className="bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300">
            Confirmed
          </Badge>
          <div className="flex gap-2">
            <Button
              size="sm"
              className="bg-green-50 text-green-700 hover:bg-green-100 hover:text-green-800 dark:bg-green-950 dark:text-green-300 dark:hover:bg-green-900 dark:hover:text-green-200"
            >
              Confirm
            </Button>
            <Button
              size="sm"
              className="bg-red-50 text-red-700 hover:bg-red-100 hover:text-red-800 dark:bg-red-950 dark:text-red-300 dark:hover:bg-red-900 dark:hover:text-red-200"
            >
              Reject
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
