export default function SettingsPage() {
  return (
    <div className="mx-auto max-w-[1400px] space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-text-primary">Settings</h1>
        <p className="text-text-secondary">
          Manage your account and project preferences.
        </p>
      </div>

      <div className="rounded-lg border border-border bg-bg-secondary p-6">
        <p className="text-text-secondary">
          General dashboard and deployment settings will go here.
        </p>
      </div>
    </div>
  );
}
