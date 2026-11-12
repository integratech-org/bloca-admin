import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Field, FieldGroup } from "@/components/ui/field"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import type { AddressData } from "../types/profile"

interface AddressCardProps {
  data: AddressData
  isEditing: boolean
}

export function AddressCard({ data, isEditing }: AddressCardProps) {
  return (
    <Card>
      <CardHeader>
        <h3 className="font-heading text-base font-semibold">Address</h3>
        <p className="text-sm text-muted-foreground">
          Used for official records and correspondence.
        </p>
      </CardHeader>
      <CardContent>
        <FieldGroup>
          {/* Street / house no. */}
          <Field>
            <Label htmlFor="street">Street / house no.</Label>
            <Input
              id="street"
              defaultValue={data.street}
              placeholder="Street, house number"
              disabled={!isEditing}
            />
          </Field>

          {/* Barangay & City - Two column grid */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field>
              <Label htmlFor="barangay">Barangay</Label>
              <Input
                id="barangay"
                defaultValue={data.barangay}
                placeholder="Barangay"
                disabled={!isEditing}
              />
            </Field>

            <Field>
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                defaultValue={data.city}
                placeholder="City"
                disabled={!isEditing}
              />
            </Field>
          </div>
        </FieldGroup>
      </CardContent>
    </Card>
  )
}
