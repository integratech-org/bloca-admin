import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Plus } from "lucide-react"
import type z from "zod"
import { useCreateUser, createUserInputSchema } from "../api/create-user"
import { useState } from "react"
import { AddUserForm } from "./add-user-form"

export function AddUserDialog() {
  const [open, setOpen] = useState(false)
  const createUserMutation = useCreateUser()

  function onSubmit(data: z.infer<typeof createUserInputSchema>) {
    createUserMutation.mutate(
      { data },
      {
        onSuccess: () => {
          setOpen(false)
          // TODO: Show success toast/notification
        },
      }
    )
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(next, eventDetails) => {
        if (!next && createUserMutation.isPending) {
          eventDetails.cancel()
          return
        }
        setOpen(next)
      }}
    >
      <DialogTrigger render={<Button />}>
        <Plus />
        Add User
      </DialogTrigger>
      <DialogContent>
        <AddUserForm
          onSubmit={onSubmit}
          isPending={createUserMutation.isPending}
        />
      </DialogContent>
    </Dialog>
  )
}
