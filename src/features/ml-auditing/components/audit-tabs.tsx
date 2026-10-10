import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BatchPredictionPanel } from "./batch-prediction-panel"
import { DefectReviewPanel } from "./defect-review-panel"

const tabTriggerClassName =
  "data-active:bg-primary data-active:text-primary-foreground data-active:hover:text-primary-foreground dark:data-active:bg-primary dark:data-active:text-primary-foreground dark:data-active:hover:text-primary-foreground"

export function AuditTabs() {
  return (
    <Tabs defaultValue="logs" className="lg:min-h-0 lg:flex-1">
      <TabsList className="flex h-10! w-full lg:w-fit">
        <TabsTrigger value="logs" className={tabTriggerClassName}>
          Batch Prediction Logs
        </TabsTrigger>
        <TabsTrigger value="defects" className={tabTriggerClassName}>
          Defect Review Panel
        </TabsTrigger>
      </TabsList>
      <TabsContent value="logs" className="flex flex-col lg:min-h-0 lg:flex-1">
        <BatchPredictionPanel />
      </TabsContent>
      <TabsContent
        value="defects"
        className="flex flex-col lg:min-h-0 lg:flex-1"
      >
        <DefectReviewPanel />
      </TabsContent>
    </Tabs>
  )
}
