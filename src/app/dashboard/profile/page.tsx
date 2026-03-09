"use client";

import { useState } from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

const identityFields = ["Proof of address", "ID"];
const settingsFields = ["Theme", "Timezone"];

type ContactInfo = {
  name: string;
  userName: string;
  nickname: string;
  dateOfBirth?: Date;
  phoneNumber: string;
  country: string;
  city: string;
  address: string;
  postalCode: string;
  customerId: string;
};

type PasswordForm = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

const initialPasswordForm: PasswordForm = {
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
};

function FieldRow({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid gap-2 rounded-md border border-[var(--border)] px-3 py-2 md:grid-cols-[220px_minmax(0,1fr)] md:items-center">
      <Label htmlFor={htmlFor} className="text-[var(--muted-foreground)]">
        {label}
      </Label>
      {children}
    </div>
  );
}

function ContactInformationSection() {
  const [contactInfo, setContactInfo] = useState<ContactInfo>({
    name: "",
    userName: "",
    nickname: "",
    dateOfBirth: undefined,
    phoneNumber: "",
    country: "",
    city: "",
    address: "",
    postalCode: "",
    customerId: "CUST-000001",
  });
  const [passwordDialogOpen, setPasswordDialogOpen] = useState(false);
  const [passwordForm, setPasswordForm] = useState<PasswordForm>(initialPasswordForm);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  function setTextField(field: Exclude<keyof ContactInfo, "dateOfBirth">, value: string) {
    setContactInfo((prev) => ({ ...prev, [field]: value }));
  }

  function resetPasswordForm() {
    setPasswordForm(initialPasswordForm);
    setPasswordError(null);
  }

  function handlePasswordDialogOpenChange(open: boolean) {
    setPasswordDialogOpen(open);
    if (!open) {
      resetPasswordForm();
    }
  }

  function handlePasswordSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!passwordForm.currentPassword || !passwordForm.newPassword || !passwordForm.confirmPassword) {
      setPasswordError("All password fields are required.");
      return;
    }

    if (passwordForm.newPassword.length < 8) {
      setPasswordError("New password must be at least 8 characters.");
      return;
    }

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPasswordError("New password and confirm password must match.");
      return;
    }

    handlePasswordDialogOpenChange(false);
  }

  return (
    <Card className="rounded-lg border-[var(--challenge-cards-border)] shadow-none">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Contact information</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <FieldRow label="Name" htmlFor="profile-name">
            <Input
              id="profile-name"
              value={contactInfo.name}
              placeholder="Enter your name"
              onChange={(event) => setTextField("name", event.target.value)}
            />
          </FieldRow>

          <FieldRow label="User name (email)" htmlFor="profile-email">
            <Input
              id="profile-email"
              type="email"
              value={contactInfo.userName}
              placeholder="name@example.com"
              onChange={(event) => setTextField("userName", event.target.value)}
            />
          </FieldRow>

          <FieldRow label="Nickname" htmlFor="profile-nickname">
            <Input
              id="profile-nickname"
              value={contactInfo.nickname}
              placeholder="Enter your nickname"
              onChange={(event) => setTextField("nickname", event.target.value)}
            />
          </FieldRow>

          <FieldRow label="Password">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
              <Input value="********" type="password" readOnly disabled className="sm:max-w-xs" />
              <Dialog open={passwordDialogOpen} onOpenChange={handlePasswordDialogOpenChange}>
                <DialogTrigger render={<Button type="button" variant="outline" size="sm" />}>Change</DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Change password</DialogTitle>
                    <DialogDescription>Update your password for this account.</DialogDescription>
                  </DialogHeader>
                  <form className="space-y-3" onSubmit={handlePasswordSubmit}>
                    <div className="space-y-1.5">
                      <Label htmlFor="current-password">Current password</Label>
                      <Input
                        id="current-password"
                        type="password"
                        value={passwordForm.currentPassword}
                        onChange={(event) =>
                          setPasswordForm((prev) => ({ ...prev, currentPassword: event.target.value }))
                        }
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="new-password">New password</Label>
                      <Input
                        id="new-password"
                        type="password"
                        value={passwordForm.newPassword}
                        onChange={(event) =>
                          setPasswordForm((prev) => ({ ...prev, newPassword: event.target.value }))
                        }
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="confirm-password">Confirm new password</Label>
                      <Input
                        id="confirm-password"
                        type="password"
                        value={passwordForm.confirmPassword}
                        onChange={(event) =>
                          setPasswordForm((prev) => ({ ...prev, confirmPassword: event.target.value }))
                        }
                      />
                    </div>
                    {passwordError ? <p className="text-xs text-destructive">{passwordError}</p> : null}
                    <DialogFooter>
                      <DialogClose render={<Button type="button" variant="outline" />}>Cancel</DialogClose>
                      <Button type="submit">Update password</Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          </FieldRow>

          <FieldRow label="Date of birth">
            <Popover>
              <PopoverTrigger
                render={
                  <Button
                    id="profile-date-of-birth"
                    type="button"
                    variant="outline"
                    className={cn(
                      "w-full justify-between text-left font-normal",
                      !contactInfo.dateOfBirth && "text-muted-foreground",
                    )}
                  />
                }
              >
                {contactInfo.dateOfBirth ? format(contactInfo.dateOfBirth, "PPP") : "Select date"}
                <CalendarIcon className="h-4 w-4 text-muted-foreground" />
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={contactInfo.dateOfBirth}
                  onSelect={(date) => setContactInfo((prev) => ({ ...prev, dateOfBirth: date }))}
                  captionLayout="dropdown"
                  endMonth={new Date()}
                />
              </PopoverContent>
            </Popover>
          </FieldRow>

          <FieldRow label="Phone number" htmlFor="profile-phone-number">
            <Input
              id="profile-phone-number"
              value={contactInfo.phoneNumber}
              placeholder="Enter your phone number"
              onChange={(event) => setTextField("phoneNumber", event.target.value)}
            />
          </FieldRow>

          <FieldRow label="Country" htmlFor="profile-country">
            <Input
              id="profile-country"
              value={contactInfo.country}
              placeholder="Enter country"
              onChange={(event) => setTextField("country", event.target.value)}
            />
          </FieldRow>

          <FieldRow label="City" htmlFor="profile-city">
            <Input
              id="profile-city"
              value={contactInfo.city}
              placeholder="Enter city"
              onChange={(event) => setTextField("city", event.target.value)}
            />
          </FieldRow>

          <FieldRow label="Address" htmlFor="profile-address">
            <Input
              id="profile-address"
              value={contactInfo.address}
              placeholder="Enter address"
              onChange={(event) => setTextField("address", event.target.value)}
            />
          </FieldRow>

          <FieldRow label="Postal code" htmlFor="profile-postal-code">
            <Input
              id="profile-postal-code"
              value={contactInfo.postalCode}
              placeholder="Enter postal code"
              onChange={(event) => setTextField("postalCode", event.target.value)}
            />
          </FieldRow>

          <FieldRow label="Customer ID" htmlFor="profile-customer-id">
            <Input id="profile-customer-id" value={contactInfo.customerId} readOnly disabled />
          </FieldRow>
        </div>
      </CardContent>
    </Card>
  );
}

function StaticSection({ title, fields }: { title: string; fields: string[] }) {
  return (
    <Card className="rounded-lg border-[var(--challenge-cards-border)] shadow-none">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {fields.map((field) => (
            <li key={field} className="flex items-center justify-between gap-4 rounded-md border border-[var(--border)] px-3 py-2">
              <span className="font-medium text-[var(--muted-foreground)]">{field}</span>
              <span className="text-[var(--foreground)]">Not set</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}

export default function ProfilePage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold leading-tight">Profile</h1>
      <Tabs defaultValue="contact-information" className="space-y-4">
        <TabsList className="h-auto flex-wrap gap-1.5 p-1">
          <TabsTrigger value="contact-information" className="px-3 py-1.5">
            Contact information
          </TabsTrigger>
          <TabsTrigger value="identity" className="px-3 py-1.5">
            Identity
          </TabsTrigger>
          <TabsTrigger value="settings" className="px-3 py-1.5">
            Settings
          </TabsTrigger>
        </TabsList>

        <TabsContent value="contact-information">
          <ContactInformationSection />
        </TabsContent>

        <TabsContent value="identity">
          <StaticSection title="Identity" fields={identityFields} />
        </TabsContent>

        <TabsContent value="settings">
          <StaticSection title="Settings" fields={settingsFields} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
