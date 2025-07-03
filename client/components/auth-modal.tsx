import React, { useState, useEffect } from "react";
import { useAuth } from "./auth-provider";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useToast } from "@/components/ui/use-toast";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  Shield,
  Smartphone,
  AlertTriangle,
  CheckCircle,
  Github,
  Apple,
  Chrome,
  Fingerprint,
  QrCode,
  MessageSquare,
  ArrowRight,
  ArrowLeft,
  Loader2,
  ExternalLink,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";

// Validation utilities
const validateEmail = (email: string) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

const validatePassword = (password: string) => {
  return {
    minLength: password.length >= 8,
    hasUpperCase: /[A-Z]/.test(password),
    hasLowerCase: /[a-z]/.test(password),
    hasNumbers: /\d/.test(password),
    hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
  };
};

const calculatePasswordStrength = (password: string) => {
  const checks = validatePassword(password);
  const passedChecks = Object.values(checks).filter(Boolean).length;
  return (passedChecks / 5) * 100;
};

// Sign In Component
function SignInStep() {
  const {
    login,
    loginWithProvider,
    loginWithWebAuthn,
    authModal,
    closeAuthModal,
  } = useAuth();
  const { toast } = useToast();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {},
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    const newErrors: typeof errors = {};
    if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      await login(formData);
    } catch (error) {
      toast({
        title: "Sign in failed",
        description:
          error instanceof Error ? error.message : "Please try again",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleOAuthLogin = async (provider: "google" | "github" | "apple") => {
    setIsLoading(true);
    try {
      await loginWithProvider(provider);
    } catch (error) {
      toast({
        title: `${provider} sign in failed`,
        description: "Please try again",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleWebAuthnLogin = async () => {
    setIsLoading(true);
    try {
      await loginWithWebAuthn();
    } catch (error) {
      toast({
        title: "Biometric sign in failed",
        description:
          error instanceof Error ? error.message : "Please try again",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold">Welcome back</h2>
        <p className="text-muted-foreground mt-2">
          Sign in to unlock your personalized learning experience
        </p>
      </div>

      {/* Progress indicator */}
      <div className="flex items-center justify-center space-x-2">
        <div className="flex items-center space-x-1">
          <div className="w-2 h-2 bg-primary rounded-full" />
          <span className="text-xs text-primary">Sign In</span>
        </div>
      </div>

      {/* OAuth Providers */}
      <div className="space-y-3">
        <Button
          variant="outline"
          className="w-full"
          onClick={() => handleOAuthLogin("google")}
          disabled={isLoading}
        >
          <Chrome className="w-4 h-4 mr-2" />
          Continue with Google
        </Button>

        <Button
          variant="outline"
          className="w-full"
          onClick={() => handleOAuthLogin("github")}
          disabled={isLoading}
        >
          <Github className="w-4 h-4 mr-2" />
          Continue with GitHub
        </Button>

        <Button
          variant="outline"
          className="w-full"
          onClick={() => handleOAuthLogin("apple")}
          disabled={isLoading}
        >
          <Apple className="w-4 h-4 mr-2" />
          Continue with Apple
        </Button>

        {/* WebAuthn option for supported devices */}
        {window.PublicKeyCredential && (
          <Button
            variant="outline"
            className="w-full"
            onClick={handleWebAuthnLogin}
            disabled={isLoading}
          >
            <Fingerprint className="w-4 h-4 mr-2" />
            Use Biometric Authentication
          </Button>
        )}
      </div>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with email
          </span>
        </div>
      </div>

      {/* Email/Password Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              className="pl-10"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              disabled={isLoading}
            />
          </div>
          {errors.email && (
            <p className="text-sm text-destructive">{errors.email}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              className="pl-10 pr-10"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              disabled={isLoading}
            />
            <button
              type="button"
              className="absolute right-3 top-3 h-4 w-4 text-muted-foreground hover:text-foreground"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff /> : <Eye />}
            </button>
          </div>
          {errors.password && (
            <p className="text-sm text-destructive">{errors.password}</p>
          )}
        </div>

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Signing in...
            </>
          ) : (
            "Sign in"
          )}
        </Button>
      </form>

      {/* Footer actions */}
      <div className="space-y-4 text-center">
        <Button variant="link" size="sm" className="text-muted-foreground">
          Forgot password?
        </Button>

        <Separator />

        <div className="text-sm text-muted-foreground">
          Don't have an account?{" "}
          <Button
            variant="link"
            size="sm"
            className="p-0 h-auto font-medium"
            onClick={() => {
              /* Open signup modal */
            }}
          >
            Create account
          </Button>
        </div>

        <div className="text-xs text-muted-foreground">
          or{" "}
          <Button
            variant="link"
            size="sm"
            className="p-0 h-auto text-xs"
            onClick={closeAuthModal}
          >
            continue without an account
          </Button>
        </div>
      </div>
    </div>
  );
}

// Sign Up Component
function SignUpStep() {
  const { signup, loginWithProvider, openAuthModal } = useAuth();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    terms?: string;
  }>({});

  const passwordStrength = calculatePasswordStrength(formData.password);
  const passwordChecks = validatePassword(formData.password);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    const newErrors: typeof errors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (passwordStrength < 60) {
      newErrors.password = "Password doesn't meet security requirements";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords don't match";
    }

    if (!acceptTerms) {
      newErrors.terms = "Please accept the terms and conditions";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      await signup({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });
    } catch (error) {
      toast({
        title: "Account creation failed",
        description:
          error instanceof Error ? error.message : "Please try again",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold">Unlock enhanced features</h2>
        <p className="text-muted-foreground mt-2">
          Create an account to save progress, sync across devices, and access
          exclusive content
        </p>
      </div>

      {/* Benefits preview */}
      <Card className="bg-gradient-to-r from-primary/5 to-secondary/5">
        <CardContent className="pt-6">
          <div className="space-y-3">
            <h3 className="font-semibold text-sm">With an account you get:</h3>
            <div className="grid grid-cols-1 gap-2 text-sm">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Progress tracking across all devices</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Personalized learning recommendations</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Bookmark and comment on sections</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Achievement system and learning analytics</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick OAuth options */}
      <div className="space-y-3">
        <Button
          variant="outline"
          className="w-full"
          onClick={() => loginWithProvider("google")}
          disabled={isLoading}
        >
          <Chrome className="w-4 h-4 mr-2" />
          Continue with Google
        </Button>

        <Button
          variant="outline"
          className="w-full"
          onClick={() => loginWithProvider("github")}
          disabled={isLoading}
        >
          <Github className="w-4 h-4 mr-2" />
          Continue with GitHub
        </Button>
      </div>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or create account with email
          </span>
        </div>
      </div>

      {/* Registration Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <div className="relative">
            <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              id="name"
              placeholder="Enter your name"
              className="pl-10"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              disabled={isLoading}
            />
          </div>
          {errors.name && (
            <p className="text-sm text-destructive">{errors.name}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="signup-email">Email</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              id="signup-email"
              type="email"
              placeholder="Enter your email"
              className="pl-10"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              disabled={isLoading}
            />
          </div>
          {errors.email && (
            <p className="text-sm text-destructive">{errors.email}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="signup-password">Password</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              id="signup-password"
              type={showPassword ? "text" : "password"}
              placeholder="Create a strong password"
              className="pl-10 pr-10"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              disabled={isLoading}
            />
            <button
              type="button"
              className="absolute right-3 top-3 h-4 w-4 text-muted-foreground hover:text-foreground"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff /> : <Eye />}
            </button>
          </div>

          {/* Password strength indicator */}
          {formData.password && (
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Progress value={passwordStrength} className="flex-1 h-2" />
                <span className="text-xs text-muted-foreground">
                  {passwordStrength < 40
                    ? "Weak"
                    : passwordStrength < 70
                      ? "Good"
                      : "Strong"}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div
                  className={`flex items-center space-x-1 ${passwordChecks.minLength ? "text-green-600" : "text-muted-foreground"}`}
                >
                  <CheckCircle className="w-3 h-3" />
                  <span>8+ characters</span>
                </div>
                <div
                  className={`flex items-center space-x-1 ${passwordChecks.hasUpperCase ? "text-green-600" : "text-muted-foreground"}`}
                >
                  <CheckCircle className="w-3 h-3" />
                  <span>Uppercase letter</span>
                </div>
                <div
                  className={`flex items-center space-x-1 ${passwordChecks.hasNumbers ? "text-green-600" : "text-muted-foreground"}`}
                >
                  <CheckCircle className="w-3 h-3" />
                  <span>Number</span>
                </div>
                <div
                  className={`flex items-center space-x-1 ${passwordChecks.hasSpecialChar ? "text-green-600" : "text-muted-foreground"}`}
                >
                  <CheckCircle className="w-3 h-3" />
                  <span>Special character</span>
                </div>
              </div>
            </div>
          )}

          {errors.password && (
            <p className="text-sm text-destructive">{errors.password}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirm-password">Confirm Password</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              id="confirm-password"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm your password"
              className="pl-10 pr-10"
              value={formData.confirmPassword}
              onChange={(e) =>
                setFormData({ ...formData, confirmPassword: e.target.value })
              }
              disabled={isLoading}
            />
            <button
              type="button"
              className="absolute right-3 top-3 h-4 w-4 text-muted-foreground hover:text-foreground"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <EyeOff /> : <Eye />}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="text-sm text-destructive">{errors.confirmPassword}</p>
          )}
        </div>

        {/* Terms acceptance */}
        <div className="flex items-start space-x-2">
          <Switch
            id="terms"
            checked={acceptTerms}
            onCheckedChange={setAcceptTerms}
            disabled={isLoading}
          />
          <div className="grid gap-1.5 leading-none">
            <Label
              htmlFor="terms"
              className="text-sm font-normal cursor-pointer"
            >
              I agree to the{" "}
              <Button variant="link" className="p-0 h-auto text-sm">
                Terms of Service
              </Button>{" "}
              and{" "}
              <Button variant="link" className="p-0 h-auto text-sm">
                Privacy Policy
              </Button>
            </Label>
          </div>
        </div>
        {errors.terms && (
          <p className="text-sm text-destructive">{errors.terms}</p>
        )}

        <Button
          type="submit"
          className="w-full"
          disabled={isLoading || passwordStrength < 60}
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Creating account...
            </>
          ) : (
            "Create account"
          )}
        </Button>
      </form>

      {/* Footer */}
      <div className="text-center space-y-4">
        <div className="text-sm text-muted-foreground">
          Already have an account?{" "}
          <Button
            variant="link"
            size="sm"
            className="p-0 h-auto font-medium"
            onClick={() => openAuthModal("signin")}
          >
            Sign in
          </Button>
        </div>
      </div>
    </div>
  );
}

// MFA Verification Component
function MFAStep() {
  const { verifyMFA, mfaToken, authModal } = useAuth();
  const { toast } = useToast();
  const [code, setCode] = useState("");
  const [method, setMethod] = useState<"totp" | "sms" | "device">("totp");
  const [isLoading, setIsLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  const handleVerify = async () => {
    if (code.length < 6) {
      toast({
        title: "Invalid code",
        description: "Please enter a 6-digit verification code",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      await verifyMFA(code, method);
    } catch (error) {
      toast({
        title: "Verification failed",
        description: error instanceof Error ? error.message : "Invalid code",
        variant: "destructive",
      });
      setCode("");
    } finally {
      setIsLoading(false);
    }
  };

  const resendCode = () => {
    setTimeLeft(30);
    toast({
      title: "Code sent",
      description: "A new verification code has been sent",
    });
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
          <Shield className="w-8 h-8 text-primary" />
        </div>
        <h2 className="text-2xl font-bold">Security Verification</h2>
        <p className="text-muted-foreground mt-2">
          Enter the verification code to complete sign in
        </p>
      </div>

      {/* Method selection */}
      <div className="flex space-x-2">
        <Button
          variant={method === "totp" ? "default" : "outline"}
          size="sm"
          onClick={() => setMethod("totp")}
          className="flex-1"
        >
          <Smartphone className="w-4 h-4 mr-1" />
          Authenticator
        </Button>
        <Button
          variant={method === "sms" ? "default" : "outline"}
          size="sm"
          onClick={() => setMethod("sms")}
          className="flex-1"
        >
          <MessageSquare className="w-4 h-4 mr-1" />
          SMS
        </Button>
      </div>

      {/* Code input */}
      <div className="space-y-4">
        <div className="text-center">
          <Label>Verification Code</Label>
          <p className="text-sm text-muted-foreground">
            {method === "totp"
              ? "Open your authenticator app and enter the 6-digit code"
              : "Enter the code sent to your phone"}
          </p>
        </div>

        <div className="flex justify-center">
          <InputOTP
            maxLength={6}
            value={code}
            onChange={setCode}
            disabled={isLoading}
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
          onClick={handleVerify}
          className="w-full"
          disabled={isLoading || code.length < 6}
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Verifying...
            </>
          ) : (
            "Verify"
          )}
        </Button>

        {/* Resend option */}
        {method === "sms" && (
          <div className="text-center">
            {timeLeft > 0 ? (
              <p className="text-sm text-muted-foreground">
                Resend code in {timeLeft}s
              </p>
            ) : (
              <Button variant="link" size="sm" onClick={resendCode}>
                Resend code
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// Security Check Component
function SecurityStep() {
  const { securityCheck, openAuthModal } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const handleContinue = () => {
    setIsLoading(true);
    // Continue to next step after security review
    setTimeout(() => {
      openAuthModal("signin");
    }, 1000);
  };

  if (!securityCheck) return null;

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="w-16 h-16 mx-auto mb-4 bg-yellow-100 dark:bg-yellow-900/20 rounded-full flex items-center justify-center">
          <AlertTriangle className="w-8 h-8 text-yellow-600" />
        </div>
        <h2 className="text-2xl font-bold">Security Check</h2>
        <p className="text-muted-foreground mt-2">
          We detected a sign-in from a new device or location
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Sign-in Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Location:</span>
            <span>{securityCheck.location?.city || "Unknown"}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Device:</span>
            <span className="text-right text-sm">{navigator.platform}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Browser:</span>
            <span className="text-right text-sm">
              {navigator.userAgent.split(" ")[0]}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Risk Level:</span>
            <Badge
              variant={
                securityCheck.riskScore < 0.3 ? "default" : "destructive"
              }
            >
              {securityCheck.riskScore < 0.3 ? "Low" : "High"}
            </Badge>
          </div>
        </CardContent>
      </Card>

      {!securityCheck.isSuspicious ? (
        <Alert>
          <CheckCircle className="h-4 w-4" />
          <AlertDescription>
            This appears to be a legitimate sign-in attempt. You can continue
            safely.
          </AlertDescription>
        </Alert>
      ) : (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            This sign-in attempt appears suspicious. Please verify your
            identity.
          </AlertDescription>
        </Alert>
      )}

      <div className="space-y-3">
        <Button
          onClick={handleContinue}
          className="w-full"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Verifying...
            </>
          ) : securityCheck.isSuspicious ? (
            "Verify Identity"
          ) : (
            "Continue"
          )}
        </Button>

        <Button variant="outline" className="w-full">
          Report Suspicious Activity
        </Button>
      </div>
    </div>
  );
}

// Success Component
function SuccessStep() {
  const { user, closeAuthModal } = useAuth();

  useEffect(() => {
    const timer = setTimeout(() => {
      closeAuthModal();
    }, 3000);

    return () => clearTimeout(timer);
  }, [closeAuthModal]);

  return (
    <div className="space-y-6 text-center">
      <div className="w-16 h-16 mx-auto mb-4 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center">
        <CheckCircle className="w-8 h-8 text-green-600" />
      </div>

      <div>
        <h2 className="text-2xl font-bold">
          Welcome back{user?.name ? `, ${user.name}` : ""}!
        </h2>
        <p className="text-muted-foreground mt-2">
          You're successfully signed in to your enhanced learning experience
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 text-sm">
        <div className="text-center">
          <div className="font-semibold">Progress Synced</div>
          <div className="text-muted-foreground">Across all devices</div>
        </div>
        <div className="text-center">
          <div className="font-semibold">Personalized</div>
          <div className="text-muted-foreground">Learning experience</div>
        </div>
      </div>

      <Button onClick={closeAuthModal} className="w-full">
        Continue Learning
        <ArrowRight className="w-4 h-4 ml-2" />
      </Button>
    </div>
  );
}

// Main Modal Component
export function AuthModal() {
  const { authModal, closeAuthModal } = useAuth();

  const getStepComponent = () => {
    switch (authModal.step) {
      case "signin":
        return <SignInStep />;
      case "signup":
        return <SignUpStep />;
      case "mfa":
        return <MFAStep />;
      case "security":
        return <SecurityStep />;
      case "success":
        return <SuccessStep />;
      default:
        return <SignInStep />;
    }
  };

  return (
    <Dialog
      open={authModal.isOpen}
      onOpenChange={(open) => !open && closeAuthModal()}
    >
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="sr-only">
          <DialogTitle>Authentication</DialogTitle>
          <DialogDescription>
            Sign in or create account to enhance your experience
          </DialogDescription>
        </DialogHeader>

        {getStepComponent()}

        {/* Close button */}
        <div className="absolute right-4 top-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={closeAuthModal}
            className="h-8 w-8 p-0"
          >
            <span className="sr-only">Close</span>✕
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
