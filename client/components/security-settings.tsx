import React, { useState } from "react";
import { useAuth } from "./auth-provider";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import {
  Shield,
  Smartphone,
  QrCode,
  Key,
  AlertTriangle,
  CheckCircle,
  Copy,
  Download,
  Refresh,
  Trash2,
  Eye,
  Globe,
  Fingerprint,
  Clock,
  Monitor,
  Lock,
} from "lucide-react";

// Mock active sessions data
const mockSessions = [
  {
    id: "current",
    device: "MacBook Pro",
    browser: "Chrome 119",
    location: "San Francisco, CA",
    lastActive: "Now",
    isCurrent: true,
    ip: "192.168.1.100",
  },
  {
    id: "mobile",
    device: "iPhone 14",
    browser: "Safari",
    location: "San Francisco, CA",
    lastActive: "2 hours ago",
    isCurrent: false,
    ip: "192.168.1.101",
  },
  {
    id: "tablet",
    device: "iPad Pro",
    browser: "Safari",
    location: "San Francisco, CA",
    lastActive: "1 day ago",
    isCurrent: false,
    ip: "192.168.1.102",
  },
];

function TwoFactorAuthSection() {
  const { user, enableMFA, disableMFA, verifyMFA } = useAuth();
  const { toast } = useToast();
  const [showSetup, setShowSetup] = useState(false);
  const [setupStep, setSetupStep] = useState<"method" | "qr" | "verify">(
    "method",
  );
  const [selectedMethod, setSelectedMethod] = useState<"totp" | "sms">("totp");
  const [setupKey, setSetupKey] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [backupCodes, setBackupCodes] = useState<string[]>([]);

  const handleEnableMFA = async () => {
    setIsLoading(true);
    try {
      const setupData = await enableMFA(selectedMethod);
      setSetupKey(setupData);
      setSetupStep("qr");

      // Generate mock backup codes
      const codes = Array.from({ length: 8 }, () =>
        Math.random().toString(36).substring(2, 8).toUpperCase(),
      );
      setBackupCodes(codes);
    } catch (error) {
      toast({
        title: "MFA setup failed",
        description:
          error instanceof Error ? error.message : "Please try again",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifySetup = async () => {
    if (verificationCode.length < 6) return;

    setIsLoading(true);
    try {
      await verifyMFA(verificationCode, selectedMethod);
      setShowSetup(false);
      setSetupStep("method");
      setVerificationCode("");
      toast({
        title: "MFA enabled successfully",
        description:
          "Your account is now more secure with two-factor authentication",
      });
    } catch (error) {
      toast({
        title: "Verification failed",
        description: "Please check your code and try again",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDisableMFA = async () => {
    setIsLoading(true);
    try {
      await disableMFA();
      toast({
        title: "MFA disabled",
        description: "Two-factor authentication has been disabled",
      });
    } catch (error) {
      toast({
        title: "Failed to disable MFA",
        description: "Please try again",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied",
      description: "Text copied to clipboard",
    });
  };

  const downloadBackupCodes = () => {
    const content = backupCodes.join("\n");
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "replit-backup-codes.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Shield className="w-5 h-5" />
          <span>Two-Factor Authentication</span>
          {user?.mfaEnabled && (
            <Badge variant="default" className="ml-auto">
              Enabled
            </Badge>
          )}
        </CardTitle>
        <CardDescription>
          Add an extra layer of security to your account
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="font-medium">Two-factor authentication</div>
            <div className="text-sm text-muted-foreground">
              {user?.mfaEnabled
                ? "Your account is protected with 2FA"
                : "Secure your account with an additional verification step"}
            </div>
          </div>
          <Switch
            checked={user?.mfaEnabled || false}
            onCheckedChange={(checked) => {
              if (checked) {
                setShowSetup(true);
              } else {
                handleDisableMFA();
              }
            }}
            disabled={isLoading}
          />
        </div>

        {user?.mfaEnabled && (
          <Alert>
            <CheckCircle className="h-4 w-4" />
            <AlertDescription>
              Two-factor authentication is active. You'll need to provide a
              verification code when signing in from new devices.
            </AlertDescription>
          </Alert>
        )}

        {/* MFA Setup Dialog */}
        <Dialog open={showSetup} onOpenChange={setShowSetup}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Enable Two-Factor Authentication</DialogTitle>
              <DialogDescription>
                Choose your preferred method for receiving verification codes
              </DialogDescription>
            </DialogHeader>

            {setupStep === "method" && (
              <div className="space-y-4">
                <div className="space-y-3">
                  <Button
                    variant={selectedMethod === "totp" ? "default" : "outline"}
                    className="w-full justify-start"
                    onClick={() => setSelectedMethod("totp")}
                  >
                    <Smartphone className="w-4 h-4 mr-2" />
                    Authenticator App (Recommended)
                  </Button>
                  <Button
                    variant={selectedMethod === "sms" ? "default" : "outline"}
                    className="w-full justify-start"
                    onClick={() => setSelectedMethod("sms")}
                  >
                    <MessageSquare className="w-4 h-4 mr-2" />
                    SMS Text Message
                  </Button>
                </div>

                <div className="text-sm text-muted-foreground">
                  {selectedMethod === "totp"
                    ? "Use apps like Google Authenticator, Authy, or 1Password to generate verification codes."
                    : "Receive verification codes via text message to your phone."}
                </div>

                <Button
                  onClick={handleEnableMFA}
                  className="w-full"
                  disabled={isLoading}
                >
                  Continue
                </Button>
              </div>
            )}

            {setupStep === "qr" && selectedMethod === "totp" && (
              <div className="space-y-4">
                <div className="text-center">
                  <div className="w-48 h-48 mx-auto bg-white rounded-lg flex items-center justify-center border">
                    <QrCode className="w-24 h-24 text-muted-foreground" />
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    Scan this QR code with your authenticator app
                  </p>
                </div>

                <div className="space-y-2">
                  <Label>Or enter this code manually:</Label>
                  <div className="flex items-center space-x-2">
                    <code className="flex-1 p-2 bg-muted rounded text-sm font-mono">
                      {setupKey}
                    </code>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => copyToClipboard(setupKey)}
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <Button
                  onClick={() => setSetupStep("verify")}
                  className="w-full"
                >
                  I've Added the Account
                </Button>
              </div>
            )}

            {setupStep === "verify" && (
              <div className="space-y-4">
                <div className="text-center">
                  <h3 className="font-medium">Enter verification code</h3>
                  <p className="text-sm text-muted-foreground">
                    Enter the 6-digit code from your authenticator app
                  </p>
                </div>

                <div className="flex justify-center">
                  <InputOTP
                    maxLength={6}
                    value={verificationCode}
                    onChange={setVerificationCode}
                  >
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </div>

                <Button
                  onClick={handleVerifySetup}
                  className="w-full"
                  disabled={verificationCode.length < 6 || isLoading}
                >
                  Verify and Enable
                </Button>

                {/* Backup codes */}
                {backupCodes.length > 0 && (
                  <Card className="bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200">
                    <CardHeader>
                      <CardTitle className="text-sm">
                        Save Your Backup Codes
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="grid grid-cols-2 gap-2 text-sm font-mono">
                        {backupCodes.map((code, index) => (
                          <div
                            key={index}
                            className="p-1 bg-background rounded"
                          >
                            {code}
                          </div>
                        ))}
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={downloadBackupCodes}
                        className="w-full"
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Download Codes
                      </Button>
                      <p className="text-xs text-muted-foreground">
                        Save these backup codes in a secure location. You can
                        use them to access your account if you lose access to
                        your authenticator.
                      </p>
                    </CardContent>
                  </Card>
                )}
              </div>
            )}
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}

function ActiveSessionsSection() {
  const { toast } = useToast();
  const [sessions, setSessions] = useState(mockSessions);

  const revokeSession = (sessionId: string) => {
    setSessions(sessions.filter((session) => session.id !== sessionId));
    toast({
      title: "Session revoked",
      description: "The device has been signed out",
    });
  };

  const revokeAllOtherSessions = () => {
    setSessions(sessions.filter((session) => session.isCurrent));
    toast({
      title: "All other sessions revoked",
      description: "You've been signed out from all other devices",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Monitor className="w-5 h-5" />
          <span>Active Sessions</span>
        </CardTitle>
        <CardDescription>
          Manage devices that are currently signed in to your account
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          {sessions.map((session) => (
            <div
              key={session.id}
              className="flex items-center justify-between p-3 border rounded-lg"
            >
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <div className="font-medium text-sm">
                    {session.device} • {session.browser}
                  </div>
                  {session.isCurrent && (
                    <Badge variant="default" className="text-xs">
                      Current
                    </Badge>
                  )}
                </div>
                <div className="text-xs text-muted-foreground">
                  {session.location} • {session.lastActive}
                </div>
                <div className="text-xs text-muted-foreground">
                  IP: {session.ip}
                </div>
              </div>
              {!session.isCurrent && (
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => revokeSession(session.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              )}
            </div>
          ))}
        </div>

        {sessions.filter((s) => !s.isCurrent).length > 0 && (
          <>
            <Separator />
            <Button
              variant="outline"
              onClick={revokeAllOtherSessions}
              className="w-full"
            >
              Sign out all other devices
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  );
}

function PasswordSecuritySection() {
  const { toast } = useToast();
  const [showPasswordChange, setShowPasswordChange] = useState(false);

  const handlePasswordChange = () => {
    // In a real app, this would open a password change modal
    toast({
      title: "Password change",
      description: "Password change feature would be implemented here",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Key className="w-5 h-5" />
          <span>Password Security</span>
        </CardTitle>
        <CardDescription>
          Manage your password and account security
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="font-medium">Password</div>
            <div className="text-sm text-muted-foreground">
              Last changed 3 months ago
            </div>
          </div>
          <Button variant="outline" onClick={handlePasswordChange}>
            Change Password
          </Button>
        </div>

        <Separator />

        <div className="space-y-3">
          <div className="font-medium text-sm">Security Recommendations</div>
          <div className="space-y-2 text-sm">
            <div className="flex items-center space-x-2 text-green-600">
              <CheckCircle className="w-4 h-4" />
              <span>Using a strong password</span>
            </div>
            <div className="flex items-center space-x-2 text-green-600">
              <CheckCircle className="w-4 h-4" />
              <span>Two-factor authentication enabled</span>
            </div>
            <div className="flex items-center space-x-2 text-yellow-600">
              <Clock className="w-4 h-4" />
              <span>Consider updating your password regularly</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function SecurityAlertsSection() {
  const { securityCheck } = useAuth();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <AlertTriangle className="w-5 h-5" />
          <span>Security Alerts</span>
        </CardTitle>
        <CardDescription>
          Recent security events and notifications
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {securityCheck && (
          <Alert>
            <Globe className="h-4 w-4" />
            <AlertDescription>
              Recent sign-in from{" "}
              {securityCheck.location?.city || "Unknown location"} • Risk level:{" "}
              {securityCheck.riskScore < 0.3 ? "Low" : "High"}
            </AlertDescription>
          </Alert>
        )}

        <div className="text-sm text-muted-foreground">
          No recent security alerts. Your account appears secure.
        </div>

        <Button variant="outline" className="w-full">
          View Security Log
        </Button>
      </CardContent>
    </Card>
  );
}

// Main security settings component
export function SecuritySettings() {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated || !user) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="text-center text-muted-foreground">
            Please sign in to access security settings
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Security Settings</h2>
        <p className="text-muted-foreground">
          Manage your account security and privacy settings
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-6">
          <TwoFactorAuthSection />
          <PasswordSecuritySection />
        </div>
        <div className="space-y-6">
          <ActiveSessionsSection />
          <SecurityAlertsSection />
        </div>
      </div>
    </div>
  );
}
