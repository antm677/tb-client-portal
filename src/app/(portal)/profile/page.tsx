"use client";

import { useMemo, useRef, useState } from "react";
import { format } from "date-fns";
import { CalendarIcon, CheckIcon, ChevronDownIcon, CopyIcon, ShieldCheckIcon, UserIcon } from "lucide-react";
import worldCountries from "world-countries";

import { SectionTitle } from "@/components/challenges/section-title";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
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
import { TopBanner } from "@/components/top-banner";

const settingsFields = ["Theme", "Timezone"];

const countryOptions = worldCountries
  .map((country) => ({
    name: country.name.common,
    flag: country.flag,
    searchText: `${country.name.common} ${country.cca2} ${country.cca3}`.toLowerCase(),
  }))
  .filter((country, index, allCountries) => allCountries.findIndex((item) => item.name === country.name) === index)
  .sort((a, b) => a.name.localeCompare(b.name));

const phoneCodeOptions = worldCountries
  .flatMap((country) => {
    if (!country.idd?.root) {
      return [];
    }

    const suffixes = country.idd.suffixes?.length ? country.idd.suffixes : [""];

    return suffixes
      .map((suffix) => ({
        id: `${country.cca3}-${suffix || "root"}`,
        code: `${country.idd.root}${suffix}`,
        countryName: country.name.common,
        flag: country.flag,
        searchText: `${country.name.common} ${country.cca2} ${country.cca3} ${country.idd.root}${suffix}`.toLowerCase(),
      }))
      .filter((option) => option.code !== "+");
  })
  .sort((a, b) => {
    const numericA = Number(a.code.replace("+", ""));
    const numericB = Number(b.code.replace("+", ""));
    if (numericA === numericB) {
      return a.countryName.localeCompare(b.countryName);
    }
    return numericA - numericB;
  });

type ContactInfo = {
  name: string;
  userName: string;
  nickname: string;
  dateOfBirth?: Date;
  phoneCountryCode: string;
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

function UploadOptionsDialog() {
  const [open, setOpen] = useState(false);
  const deviceInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  function handleSelectFromDevice() {
    deviceInputRef.current?.click();
    setOpen(false);
  }

  function handleTakePhoto() {
    cameraInputRef.current?.click();
    setOpen(false);
  }

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger render={<Button type="button" variant="outline" size="sm" />}>Upload</DialogTrigger>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Upload document</DialogTitle>
            <DialogDescription>Choose how you want to provide your document.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-2">
            <Button type="button" variant="outline" onClick={handleSelectFromDevice}>
              Upload from device
            </Button>
            <Button type="button" variant="outline" onClick={handleTakePhoto}>
              Take a photo
            </Button>
          </div>
          <DialogFooter>
            <DialogClose render={<Button type="button" variant="outline" />}>Close</DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <input
        ref={deviceInputRef}
        type="file"
        className="hidden"
        accept="image/*,.pdf"
        onChange={() => undefined}
      />
      <input
        ref={cameraInputRef}
        type="file"
        className="hidden"
        accept="image/*"
        capture="environment"
        onChange={() => undefined}
      />
    </>
  );
}

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
    <div className="grid gap-1 rounded-md px-3 py-2 md:grid-cols-[180px_minmax(0,1fr)] md:items-center">
      <Label htmlFor={htmlFor} className="text-secondary-foreground">
        {label}
      </Label>
      {children}
    </div>
  );
}

function ContactInformationSection() {
  const profileInputClassName = "border-[var(--challenge-cards-border)]";
  const fixedInputWidthClassName = "w-full sm:w-80";
  const [contactInfo, setContactInfo] = useState<ContactInfo>({
    name: "",
    userName: "",
    nickname: "",
    dateOfBirth: undefined,
    phoneCountryCode: "+1",
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
  const [copiedCustomerId, setCopiedCustomerId] = useState(false);
  const [phoneCodeSearch, setPhoneCodeSearch] = useState("");
  const [phoneCodeOpen, setPhoneCodeOpen] = useState(false);
  const [countrySearch, setCountrySearch] = useState("");
  const [countryOpen, setCountryOpen] = useState(false);

  const selectedPhoneCodeOption = useMemo(
    () => phoneCodeOptions.find((option) => option.code === contactInfo.phoneCountryCode) ?? phoneCodeOptions[0],
    [contactInfo.phoneCountryCode],
  );

  const filteredPhoneCodeOptions = useMemo(() => {
    const searchText = phoneCodeSearch.trim().toLowerCase();
    if (!searchText) {
      return phoneCodeOptions;
    }

    return phoneCodeOptions.filter((option) => option.searchText.includes(searchText));
  }, [phoneCodeSearch]);

  const filteredCountryOptions = useMemo(() => {
    const searchText = countrySearch.trim().toLowerCase();
    if (!searchText) {
      return countryOptions;
    }

    return countryOptions.filter((country) => country.searchText.includes(searchText));
  }, [countrySearch]);

  function setTextField(field: Exclude<keyof ContactInfo, "dateOfBirth">, value: string) {
    setContactInfo((prev) => ({ ...prev, [field]: value }));
  }

  function setDigitsField(field: "phoneNumber" | "postalCode", value: string, maxLength: number) {
    setTextField(field, value.replace(/\D/g, "").slice(0, maxLength));
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

  async function handleCopyCustomerId() {
    try {
      if (!window.isSecureContext || !navigator.clipboard?.writeText) {
        setCopiedCustomerId(false);
        return;
      }

      await navigator.clipboard.writeText(contactInfo.customerId);

      setCopiedCustomerId(true);
      window.setTimeout(() => setCopiedCustomerId(false), 1500);
    } catch {
      setCopiedCustomerId(false);
    }
  }

  function handleSelectPhoneCode(code: string) {
    setTextField("phoneCountryCode", code);
    setPhoneCodeOpen(false);
    setPhoneCodeSearch("");
  }

  function handleSelectCountry(countryName: string) {
    setTextField("country", countryName);
    setCountryOpen(false);
    setCountrySearch("");
  }

  return (
    <div className="space-y-2">
      <FieldRow label="Name" htmlFor="profile-name">
        <Input
          id="profile-name"
          className={cn(profileInputClassName, fixedInputWidthClassName)}
          value={contactInfo.name}
          placeholder="Enter your name"
          onChange={(event) => setTextField("name", event.target.value)}
        />
      </FieldRow>

      <FieldRow label="User name (email)" htmlFor="profile-email">
        <Input
          id="profile-email"
          className={cn(profileInputClassName, fixedInputWidthClassName)}
          type="email"
          value={contactInfo.userName}
          placeholder="name@example.com"
          onChange={(event) => setTextField("userName", event.target.value)}
        />
      </FieldRow>

      <FieldRow label="Nickname" htmlFor="profile-nickname">
        <Input
          id="profile-nickname"
          className={cn(profileInputClassName, fixedInputWidthClassName)}
          value={contactInfo.nickname}
          placeholder="Enter your nickname"
          onChange={(event) => setTextField("nickname", event.target.value)}
        />
      </FieldRow>

      <FieldRow label="Password">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <Input
            value="********"
            type="password"
            readOnly
            disabled
            className={cn(profileInputClassName, fixedInputWidthClassName)}
          />
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
                    className={profileInputClassName}
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
                    className={profileInputClassName}
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
                    className={profileInputClassName}
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
                  `w-fit min-w-[10.5rem] justify-between border-[var(--challenge-cards-border)] text-left font-normal`,
                  !contactInfo.dateOfBirth && "text-muted-foreground",
                )}
              />
            }
          >
            {contactInfo.dateOfBirth ? format(contactInfo.dateOfBirth, "MM/dd/yyyy") : "Select date"}
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
        <div className={cn(fixedInputWidthClassName, "flex gap-2")}>
          <Popover open={phoneCodeOpen} onOpenChange={setPhoneCodeOpen}>
            <PopoverTrigger
              render={
                <Button
                  type="button"
                  variant="outline"
                  className={cn(
                    profileInputClassName,
                    "w-[5.5rem] justify-between px-2 text-left font-normal",
                    !selectedPhoneCodeOption && "text-muted-foreground",
                  )}
                />
              }
            >
              <span className="truncate text-xs">
                {selectedPhoneCodeOption?.flag} {selectedPhoneCodeOption?.code ?? contactInfo.phoneCountryCode}
              </span>
              <ChevronDownIcon className="h-4 w-4 text-muted-foreground" />
            </PopoverTrigger>
            <PopoverContent align="start" className="w-80 max-w-[calc(100vw-2rem)] p-2">
              <Input
                value={phoneCodeSearch}
                className={profileInputClassName}
                placeholder="Search by country or code"
                onChange={(event) => setPhoneCodeSearch(event.target.value)}
              />
              <div className="mt-2 max-h-64 overflow-y-auto space-y-1">
                {filteredPhoneCodeOptions.length ? (
                  filteredPhoneCodeOptions.map((option) => (
                    <button
                      key={option.id}
                      type="button"
                      className="flex w-full items-center justify-between rounded-md px-2 py-1.5 text-left text-sm hover:bg-muted"
                      onClick={() => handleSelectPhoneCode(option.code)}
                    >
                      <span className="truncate">
                        {option.flag} {option.countryName}
                      </span>
                      <span className="shrink-0 text-muted-foreground">{option.code}</span>
                    </button>
                  ))
                ) : (
                  <p className="px-2 py-1.5 text-sm text-muted-foreground">No results found.</p>
                )}
              </div>
            </PopoverContent>
          </Popover>
          <Input
            id="profile-phone-number"
            className={cn(profileInputClassName, "min-w-0 flex-1")}
            value={contactInfo.phoneNumber}
            placeholder="Phone number"
            inputMode="numeric"
            maxLength={20}
            onChange={(event) => setDigitsField("phoneNumber", event.target.value, 20)}
          />
        </div>
      </FieldRow>

      <FieldRow label="Country">
        <Popover open={countryOpen} onOpenChange={setCountryOpen}>
          <PopoverTrigger
            render={
              <Button
                id="profile-country"
                type="button"
                variant="outline"
                className={cn(
                  profileInputClassName,
                  fixedInputWidthClassName,
                  "justify-between text-left font-normal",
                  !contactInfo.country && "text-muted-foreground",
                )}
              />
            }
          >
            <span className="truncate">{contactInfo.country || "Select country"}</span>
            <ChevronDownIcon className="h-4 w-4 text-muted-foreground" />
          </PopoverTrigger>
          <PopoverContent align="start" className="w-80 max-w-[calc(100vw-2rem)] p-2">
            <Input
              value={countrySearch}
              className={profileInputClassName}
              placeholder="Search country"
              onChange={(event) => setCountrySearch(event.target.value)}
            />
            <div className="mt-2 max-h-64 overflow-y-auto space-y-1">
              {filteredCountryOptions.length ? (
                filteredCountryOptions.map((country) => (
                  <button
                    key={country.name}
                    type="button"
                    className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm hover:bg-muted"
                    onClick={() => handleSelectCountry(country.name)}
                  >
                    <span>{country.flag}</span>
                    <span className="truncate">{country.name}</span>
                  </button>
                ))
              ) : (
                <p className="px-2 py-1.5 text-sm text-muted-foreground">No results found.</p>
              )}
            </div>
          </PopoverContent>
        </Popover>
      </FieldRow>

      <FieldRow label="City" htmlFor="profile-city">
        <Input
          id="profile-city"
          className={cn(profileInputClassName, fixedInputWidthClassName)}
          value={contactInfo.city}
          placeholder="Enter city"
          onChange={(event) => setTextField("city", event.target.value)}
        />
      </FieldRow>

      <FieldRow label="Address" htmlFor="profile-address">
        <Input
          id="profile-address"
          className={cn(profileInputClassName, fixedInputWidthClassName)}
          value={contactInfo.address}
          placeholder="Enter address"
          onChange={(event) => setTextField("address", event.target.value)}
        />
      </FieldRow>

      <FieldRow label="Postal code" htmlFor="profile-postal-code">
        <Input
          id="profile-postal-code"
          className={cn(profileInputClassName, "w-full sm:w-36")}
          value={contactInfo.postalCode}
          placeholder="Postal code"
          inputMode="numeric"
          maxLength={10}
          onChange={(event) => setDigitsField("postalCode", event.target.value, 10)}
        />
      </FieldRow>

      <FieldRow label="Customer ID">
        <div className="inline-flex items-center gap-2">
          <span className="font-medium text-[var(--foreground)]">{contactInfo.customerId}</span>
          <Button
            type="button"
            variant="outline"
            size="icon-sm"
            className={cn(profileInputClassName, "shrink-0")}
            onClick={handleCopyCustomerId}
            aria-label="Copy customer ID"
          >
            {copiedCustomerId ? <CheckIcon className="size-4" /> : <CopyIcon className="size-4" />}
          </Button>
        </div>
      </FieldRow>
    </div>
  );
}

function IdentitySection() {
  return (
    <div className="space-y-5">
      <div className="mt-4 mb-5 flex items-center gap-3 rounded-md border border-[var(--border)] bg-[var(--muted)] px-3 py-2 text-sm text-[var(--foreground)] dark:border-transparent">
        <ShieldCheckIcon className="h-5 w-5 shrink-0 text-[#FFA301]" />
        <p>
          Identity and address verification is not required to complete challenges. We will only ask you to provide
          documents when you get your first Funded account and in case documents you provide expire.
        </p>
      </div>

      <ul className="space-y-2">
        <li className="flex items-center justify-between gap-4 rounded-md px-3 py-2">
          <span className="inline-flex items-center gap-2">
            <Badge className="border-transparent bg-[var(--deal)]/15 text-black dark:text-[var(--foreground)]">Verified</Badge>
            <span className="font-medium text-[var(--muted-foreground)]">Proof of address</span>
          </span>
          <UploadOptionsDialog />
        </li>
        <li className="flex items-center justify-between gap-4 rounded-md px-3 py-2">
          <span className="inline-flex items-center gap-2">
            <Badge variant="secondary">Pending</Badge>
            <span className="font-medium text-[var(--muted-foreground)]">ID</span>
          </span>
          <Button type="button" variant="outline" size="sm" disabled>
            Upload
          </Button>
        </li>
      </ul>
    </div>
  );
}

function StaticSection({ fields }: { fields: string[] }) {
  return (
    <ul className="space-y-2">
      {fields.map((field) => (
        <li key={field} className="flex items-center justify-between gap-4 rounded-md border border-[var(--border)] px-3 py-2">
          <span className="font-medium text-[var(--muted-foreground)]">{field}</span>
          <span className="text-[var(--foreground)]">Not set</span>
        </li>
      ))}
    </ul>
  );
}

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("contact-information");

  return (
    <div className="flex min-h-0 flex-1 flex-col space-y-6 overflow-y-auto">
      <TopBanner />

      <SectionTitle icon={<UserIcon className="h-5 w-5" />} title="Profile" subtitle="Yout contact information" />
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <Card className="rounded-lg border-[var(--challenge-cards-border)] shadow-none">
          <CardContent className="space-y-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
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
              {activeTab !== "identity" ? (
                <Button type="button" className="hidden h-9 bg-[#FFA301] text-white hover:bg-[#e69500] md:inline-flex">
                  Save
                </Button>
              ) : null}
            </div>
            <div className="h-px w-full bg-[var(--border)]" />

            <TabsContent value="contact-information">
              <ContactInformationSection />
            </TabsContent>

            <TabsContent value="identity">
              <IdentitySection />
            </TabsContent>

            <TabsContent value="settings">
              <StaticSection fields={settingsFields} />
            </TabsContent>

            {activeTab !== "identity" ? (
              <div className="pt-2 md:hidden">
                <Button type="button" className="h-9 w-full bg-[#FFA301] text-white hover:bg-[#e69500]">
                  Save
                </Button>
              </div>
            ) : null}
          </CardContent>
        </Card>
      </Tabs>
    </div>
  );
}
