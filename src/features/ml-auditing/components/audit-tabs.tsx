import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ExportTableButton } from "@/components/export-table-button"
import { BatchPredictionPanel } from "./batch-prediction-panel"
import { DefectReviewPanel } from "./defect-review-panel"
import { payments } from "./batch-prediction-panel"

const tabTriggerClassName =
  "data-active:bg-primary data-active:text-primary-foreground data-active:hover:text-primary-foreground dark:data-active:bg-primary dark:data-active:text-primary-foreground dark:data-active:hover:text-primary-foreground"

export function AuditTabs() {
  return (
    <Tabs defaultValue="logs" className="lg:min-h-0 lg:flex-1">
      <div className="flex items-center justify-between gap-4">
        <TabsList className="flex h-10! w-full lg:w-fit">
          <TabsTrigger value="logs" className={tabTriggerClassName}>
            Batch Prediction Logs
          </TabsTrigger>
          <TabsTrigger value="defects" className={tabTriggerClassName}>
            Defect Review Panel
          </TabsTrigger>
        </TabsList>
        <ExportTableButton
          data={payments}
          filename="ml-auditing-batch-logs"
          columnHeaders={[
            { key: "id", label: "ID" },
            { key: "status", label: "Status" },
            { key: "email", label: "Email" },
            { key: "amount", label: "Amount" },
          ]}
        />
      </div>
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
