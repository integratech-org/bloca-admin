import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"

export function ProfileInformationCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-semibold">
          Profile information
        </CardTitle>
        <CardDescription>
          Your name is locked. Only your photo can be changed here.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-6">
        <div className="flex items-center gap-4">
          <Avatar className="size-20">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>

          <div className="flex flex-col gap-2">
            <div>
              <p className="text-lg font-medium">John Doe</p>
              <p className="text-sm text-muted-foreground">System Admin</p>
            </div>
            <Button type="button" variant="outline" size="sm">
              Change photo
            </Button>
          </div>
        </div>

        <FieldGroup>
          <div className="grid gap-6 sm:grid-cols-2">
            <Field>
              <FieldLabel htmlFor="firstName">First name</FieldLabel>
              <Input
                id="firstName"
                type="text"
                placeholder="First name"
                value="John"
                defaultValue="John"
                disabled
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="lastName">Last name</FieldLabel>
              <Input
                id="lastName"
                type="text"
                placeholder="Last name"
                value="Doe"
                defaultValue="Doe"
                disabled
              />
            </Field>
          </div>
        </FieldGroup>
      </CardContent>
    </Card>
  )
}
