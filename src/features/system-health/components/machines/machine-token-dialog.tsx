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
import {
  useMachineTokenStore,
  type MachineTokenMode,
} from "../../stores/machine-token-store"
import { TriangleAlertIcon } from "lucide-react"

const COPY: Record<
  MachineTokenMode,
  { title: string; description: (name?: string) => string }
> = {
  created: {
    title: "Machine created",
    description: (name) =>
      `${name} is registered. Copy its device token and add it to the machine's edge config.`,
  },
  issued: {
    title: "Device token issued",
    description: (name) =>
      `${name} now has a device token. Copy it and add it to the machine's edge config.`,
  },
  rotated: {
    title: "Device token rotated",
    description: (name) =>
      `${name} has a new device token. The old one no longer works, so copy this and update the machine's edge config.`,
  },
}

export function MachineTokenDialog() {
  const open = useMachineTokenStore((s) => s.open)
  const mode = useMachineTokenStore((s) => s.mode)
  const machine = useMachineTokenStore((s) => s.machine)
  const close = useMachineTokenStore((s) => s.close)
  const reset = useMachineTokenStore((s) => s.reset)

  const copy = COPY[mode]
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
          <AlertDialogTitle>{copy.title}</AlertDialogTitle>
          <AlertDialogDescription>
            {copy.description(machine?.name)}
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
