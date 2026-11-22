import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import {
  CodeBlock,
  CodeBlockActions,
  CodeBlockContent,
  CodeBlockCopyButton,
  CodeBlockHeader,
  CodeBlockTitle,
} from "@/components/ui/code-block"
import { useMachineTokenStore } from "../../stores/machine-token-store"
import { TriangleAlertIcon } from "lucide-react"

export function MachineTokenDialog() {
  const open = useMachineTokenStore((s) => s.open)
  const machine = useMachineTokenStore((s) => s.machine)
  const close = useMachineTokenStore((s) => s.close)
  const reset = useMachineTokenStore((s) => s.reset)

  const output = machine?.token ? `DEVICE_TOKEN=${machine.token}` : ""

  return (
    <AlertDialog
      open={open}
      onOpenChange={(next) => {
        if (!next) close()
      }}
      onOpenChangeComplete={(next) => {
        if (!next) reset()
      }}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Machine created</AlertDialogTitle>
          <AlertDialogDescription>
            {machine?.name} is registered. Copy its access token and add it to
            the machine's edge config.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <CodeBlock>
          <CodeBlockHeader>
            <CodeBlockTitle>.env</CodeBlockTitle>
            <CodeBlockActions>
              <CodeBlockCopyButton value={output} />
            </CodeBlockActions>
          </CodeBlockHeader>
          <CodeBlockContent wrap>{output}</CodeBlockContent>
        </CodeBlock>

        <Alert className="border-amber-200 bg-amber-50 text-amber-900 dark:border-amber-900 dark:bg-amber-950 dark:text-amber-50">
          <TriangleAlertIcon />
          <AlertTitle>Copy this token now</AlertTitle>
          <AlertDescription>
            It won't be shown again. If you lose it, you'll need to issue a new
            one.
          </AlertDescription>
        </Alert>

        <AlertDialogFooter>
          <AlertDialogAction onClick={close}>Done</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
