import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  ReactNode,
} from "react";
import { toast } from "@/components/ui/use-toast";

// Types
export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  verified: boolean;
  mfaEnabled: boolean;
  preferences: {
    theme?: string;
    language?: string;
    accessibility?: Record<string, any>;
    notifications?: boolean;
  };
  progress: {
    completedSections: string[];
    achievements: string[];
    bookmarks: string[];
    lastVisited: string;
  };
  createdAt: string;
  lastLogin: string;
}

export interface AuthSession {
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
  deviceId: string;
  sessionId: string;
}

export interface SecurityCheck {
  deviceFingerprint: string;
  ipAddress: string;
  userAgent: string;
  location?: {
    country: string;
    city: string;
  };
  isSuspicious: boolean;
  riskScore: number;
}

interface AuthState {
  user: User | null;
  session: AuthSession | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  securityCheck: SecurityCheck | null;
  mfaRequired: boolean;
  mfaToken: string | null;
  authModal: {
    isOpen: boolean;
    step: "signin" | "signup" | "mfa" | "security" | "recovery" | "success";
    provider?: "email" | "google" | "github" | "apple";
    data?: any;
  };
}

type AuthAction =
  | { type: "AUTH_START" }
  | { type: "AUTH_SUCCESS"; payload: { user: User; session: AuthSession } }
  | { type: "AUTH_ERROR"; payload: string }
  | { type: "LOGOUT" }
  | { type: "SECURITY_CHECK"; payload: SecurityCheck }
  | { type: "MFA_REQUIRED"; payload: string }
  | { type: "MFA_SUCCESS" }
  | {
      type: "OPEN_AUTH_MODAL";
      payload: {
        step: AuthState["authModal"]["step"];
        provider?: AuthState["authModal"]["provider"];
        data?: any;
      };
    }
  | { type: "CLOSE_AUTH_MODAL" }
  | { type: "UPDATE_USER"; payload: Partial<User> }
  | { type: "RESTORE_SESSION"; payload: { user: User; session: AuthSession } };

const initialState: AuthState = {
  user: null,
  session: null,
  isLoading: false,
  isAuthenticated: false,
  securityCheck: null,
  mfaRequired: false,
  mfaToken: null,
  authModal: {
    isOpen: false,
    step: "signin",
  },
};

function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case "AUTH_START":
      return { ...state, isLoading: true };

    case "AUTH_SUCCESS":
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        user: action.payload.user,
        session: action.payload.session,
        mfaRequired: false,
        mfaToken: null,
        authModal: { ...state.authModal, isOpen: false },
      };

    case "AUTH_ERROR":
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false,
        user: null,
        session: null,
        mfaRequired: false,
        mfaToken: null,
      };

    case "LOGOUT":
      return {
        ...initialState,
        securityCheck: state.securityCheck, // Keep security info
      };

    case "SECURITY_CHECK":
      return {
        ...state,
        securityCheck: action.payload,
      };

    case "MFA_REQUIRED":
      return {
        ...state,
        mfaRequired: true,
        mfaToken: action.payload,
        authModal: { ...state.authModal, step: "mfa" },
      };

    case "MFA_SUCCESS":
      return {
        ...state,
        mfaRequired: false,
        mfaToken: null,
      };

    case "OPEN_AUTH_MODAL":
      return {
        ...state,
        authModal: {
          isOpen: true,
          step: action.payload.step,
          provider: action.payload.provider,
          data: action.payload.data,
        },
      };

    case "CLOSE_AUTH_MODAL":
      return {
        ...state,
        authModal: { ...state.authModal, isOpen: false },
        mfaRequired: false,
        mfaToken: null,
      };

    case "UPDATE_USER":
      return {
        ...state,
        user: state.user ? { ...state.user, ...action.payload } : null,
      };

    case "RESTORE_SESSION":
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        session: action.payload.session,
        isLoading: false,
      };

    default:
      return state;
  }
}

// Auth Context
interface AuthContextType extends AuthState {
  login: (credentials: { email: string; password: string }) => Promise<void>;
  loginWithProvider: (provider: "google" | "github" | "apple") => Promise<void>;
  loginWithWebAuthn: () => Promise<void>;
  signup: (data: {
    email: string;
    password: string;
    name: string;
  }) => Promise<void>;
  logout: () => Promise<void>;
  verifyMFA: (code: string, method: "totp" | "sms" | "device") => Promise<void>;
  enableMFA: (method: "totp" | "sms") => Promise<string>; // Returns setup key/QR
  disableMFA: () => Promise<void>;
  requestPasswordReset: (email: string) => Promise<void>;
  resetPassword: (token: string, newPassword: string) => Promise<void>;
  updateProfile: (data: Partial<User>) => Promise<void>;
  refreshSession: () => Promise<void>;
  checkSecurity: () => Promise<void>;
  syncData: () => Promise<void>;
  openAuthModal: (
    step: AuthState["authModal"]["step"],
    provider?: AuthState["authModal"]["provider"],
  ) => void;
  closeAuthModal: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Device fingerprinting utility
function generateDeviceFingerprint(): string {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d")!;
  ctx.textBaseline = "top";
  ctx.font = "14px Arial";
  ctx.fillText("Device fingerprint", 2, 2);

  const fingerprint = [
    navigator.userAgent,
    navigator.language,
    screen.width + "x" + screen.height,
    new Date().getTimezoneOffset(),
    navigator.hardwareConcurrency,
    navigator.maxTouchPoints,
    canvas.toDataURL(),
  ].join("|");

  return btoa(fingerprint).substring(0, 32);
}

// Rate limiting utility
class RateLimiter {
  private attempts: Map<string, { count: number; resetTime: number }> =
    new Map();

  check(
    key: string,
    maxAttempts: number = 5,
    windowMs: number = 15 * 60 * 1000,
  ): boolean {
    const now = Date.now();
    const attempt = this.attempts.get(key);

    if (!attempt || now > attempt.resetTime) {
      this.attempts.set(key, { count: 1, resetTime: now + windowMs });
      return true;
    }

    if (attempt.count >= maxAttempts) {
      return false;
    }

    attempt.count++;
    return true;
  }
}

const rateLimiter = new RateLimiter();

// Auth Provider Component
export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Session management
  const saveSession = (session: AuthSession) => {
    localStorage.setItem("auth_session", JSON.stringify(session));
  };

  const clearSession = () => {
    localStorage.removeItem("auth_session");
    localStorage.removeItem("auth_user");
  };

  const restoreSession = async () => {
    try {
      const sessionData = localStorage.getItem("auth_session");
      const userData = localStorage.getItem("auth_user");

      if (sessionData && userData) {
        const session: AuthSession = JSON.parse(sessionData);
        const user: User = JSON.parse(userData);

        // Check if session is still valid
        if (Date.now() < session.expiresAt) {
          dispatch({ type: "RESTORE_SESSION", payload: { user, session } });
          await checkSecurity();
          return;
        }
      }

      clearSession();
    } catch (error) {
      clearSession();
    }
  };

  // Security check
  const checkSecurity = async () => {
    try {
      const deviceFingerprint = generateDeviceFingerprint();
      const ipResponse = await fetch("https://api.ipify.org?format=json");
      const { ip } = await ipResponse.json();

      // Mock security analysis (in real app, this would be server-side)
      const securityCheck: SecurityCheck = {
        deviceFingerprint,
        ipAddress: ip,
        userAgent: navigator.userAgent,
        isSuspicious: false,
        riskScore: Math.random() * 0.3, // Low risk for demo
      };

      dispatch({ type: "SECURITY_CHECK", payload: securityCheck });
    } catch (error) {
      console.warn("Security check failed:", error);
    }
  };

  // Authentication methods
  const login = async (credentials: { email: string; password: string }) => {
    const rateLimitKey = `login_${credentials.email}`;

    if (!rateLimiter.check(rateLimitKey)) {
      throw new Error("Too many login attempts. Please try again later.");
    }

    dispatch({ type: "AUTH_START" });

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock user data (in real app, this comes from server)
      const user: User = {
        id: "1",
        email: credentials.email,
        name: "User Name",
        verified: true,
        mfaEnabled: false,
        preferences: {
          theme: "dark",
          notifications: true,
        },
        progress: {
          completedSections: [],
          achievements: [],
          bookmarks: [],
          lastVisited: "/",
        },
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString(),
      };

      const session: AuthSession = {
        accessToken: "mock_access_token",
        refreshToken: "mock_refresh_token",
        expiresAt: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
        deviceId: generateDeviceFingerprint(),
        sessionId: Math.random().toString(36),
      };

      localStorage.setItem("auth_user", JSON.stringify(user));
      saveSession(session);

      dispatch({ type: "AUTH_SUCCESS", payload: { user, session } });
      toast({
        title: "Welcome back!",
        description: "You have been signed in successfully.",
      });
    } catch (error) {
      dispatch({
        type: "AUTH_ERROR",
        payload: error instanceof Error ? error.message : "Login failed",
      });
      throw error;
    }
  };

  const loginWithProvider = async (provider: "google" | "github" | "apple") => {
    dispatch({ type: "AUTH_START" });

    try {
      // In real implementation, this would redirect to OAuth provider
      toast({
        title: `${provider} login initiated`,
        description: "Redirecting to authentication...",
      });

      // Simulate OAuth flow
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Mock successful OAuth response
      const user: User = {
        id: "1",
        email: `user@${provider}.com`,
        name: `${provider} User`,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${provider}`,
        verified: true,
        mfaEnabled: false,
        preferences: {
          theme: "dark",
          notifications: true,
        },
        progress: {
          completedSections: [],
          achievements: [],
          bookmarks: [],
          lastVisited: "/",
        },
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString(),
      };

      const session: AuthSession = {
        accessToken: `${provider}_access_token`,
        refreshToken: `${provider}_refresh_token`,
        expiresAt: Date.now() + 24 * 60 * 60 * 1000,
        deviceId: generateDeviceFingerprint(),
        sessionId: Math.random().toString(36),
      };

      localStorage.setItem("auth_user", JSON.stringify(user));
      saveSession(session);

      dispatch({ type: "AUTH_SUCCESS", payload: { user, session } });
      toast({
        title: "Welcome!",
        description: `Signed in with ${provider} successfully.`,
      });
    } catch (error) {
      dispatch({ type: "AUTH_ERROR", payload: `${provider} login failed` });
      throw error;
    }
  };

  const loginWithWebAuthn = async () => {
    try {
      // Check if WebAuthn is supported
      if (!window.PublicKeyCredential) {
        throw new Error("WebAuthn is not supported on this device");
      }

      dispatch({ type: "AUTH_START" });

      // Mock WebAuthn challenge (in real app, get from server)
      const challenge = new Uint8Array(32);
      crypto.getRandomValues(challenge);

      const credential = await navigator.credentials.create({
        publicKey: {
          challenge,
          rp: { name: "Replit Guide" },
          user: {
            id: new TextEncoder().encode("user123"),
            name: "user@example.com",
            displayName: "User",
          },
          pubKeyCredParams: [{ alg: -7, type: "public-key" }],
          authenticatorSelection: {
            authenticatorAttachment: "platform",
            userVerification: "required",
          },
          timeout: 60000,
          attestation: "direct",
        },
      });

      if (credential) {
        // Mock successful WebAuthn authentication
        const user: User = {
          id: "1",
          email: "user@webauthn.com",
          name: "Biometric User",
          verified: true,
          mfaEnabled: true,
          preferences: {
            theme: "dark",
            notifications: true,
          },
          progress: {
            completedSections: [],
            achievements: [],
            bookmarks: [],
            lastVisited: "/",
          },
          createdAt: new Date().toISOString(),
          lastLogin: new Date().toISOString(),
        };

        const session: AuthSession = {
          accessToken: "webauthn_access_token",
          refreshToken: "webauthn_refresh_token",
          expiresAt: Date.now() + 24 * 60 * 60 * 1000,
          deviceId: generateDeviceFingerprint(),
          sessionId: Math.random().toString(36),
        };

        localStorage.setItem("auth_user", JSON.stringify(user));
        saveSession(session);

        dispatch({ type: "AUTH_SUCCESS", payload: { user, session } });
        toast({
          title: "Biometric login successful!",
          description: "You have been authenticated securely.",
        });
      }
    } catch (error) {
      dispatch({
        type: "AUTH_ERROR",
        payload: "Biometric authentication failed",
      });
      toast({
        title: "Authentication failed",
        description: "Biometric login could not be completed.",
      });
      throw error;
    }
  };

  const signup = async (data: {
    email: string;
    password: string;
    name: string;
  }) => {
    const rateLimitKey = `signup_${data.email}`;

    if (!rateLimiter.check(rateLimitKey, 3)) {
      throw new Error("Too many signup attempts. Please try again later.");
    }

    dispatch({ type: "AUTH_START" });

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const user: User = {
        id: Math.random().toString(36),
        email: data.email,
        name: data.name,
        verified: false,
        mfaEnabled: false,
        preferences: {
          theme: "dark",
          notifications: true,
        },
        progress: {
          completedSections: [],
          achievements: ["account_created"],
          bookmarks: [],
          lastVisited: "/",
        },
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString(),
      };

      const session: AuthSession = {
        accessToken: "new_user_access_token",
        refreshToken: "new_user_refresh_token",
        expiresAt: Date.now() + 24 * 60 * 60 * 1000,
        deviceId: generateDeviceFingerprint(),
        sessionId: Math.random().toString(36),
      };

      localStorage.setItem("auth_user", JSON.stringify(user));
      saveSession(session);

      dispatch({ type: "AUTH_SUCCESS", payload: { user, session } });
      toast({
        title: "Account created successfully!",
        description: "Welcome to your enhanced learning experience.",
      });
    } catch (error) {
      dispatch({
        type: "AUTH_ERROR",
        payload: error instanceof Error ? error.message : "Signup failed",
      });
      throw error;
    }
  };

  const logout = async () => {
    try {
      clearSession();
      dispatch({ type: "LOGOUT" });
      toast({
        title: "Signed out",
        description: "You have been signed out successfully.",
      });
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const verifyMFA = async (code: string, method: "totp" | "sms" | "device") => {
    try {
      // Simulate MFA verification
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock verification (in real app, verify with server)
      if (code.length >= 6) {
        dispatch({ type: "MFA_SUCCESS" });
        toast({
          title: "MFA verified",
          description: "Multi-factor authentication successful.",
        });
      } else {
        throw new Error("Invalid verification code");
      }
    } catch (error) {
      throw error;
    }
  };

  const enableMFA = async (method: "totp" | "sms") => {
    try {
      // Simulate MFA setup
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (state.user) {
        dispatch({ type: "UPDATE_USER", payload: { mfaEnabled: true } });
        localStorage.setItem(
          "auth_user",
          JSON.stringify({ ...state.user, mfaEnabled: true }),
        );
      }

      // Return setup key for TOTP or phone number for SMS
      return method === "totp"
        ? "JBSWY3DPEHPK3PXP" // Mock TOTP secret
        : "+1234567890"; // Mock phone number
    } catch (error) {
      throw error;
    }
  };

  const disableMFA = async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));

      if (state.user) {
        dispatch({ type: "UPDATE_USER", payload: { mfaEnabled: false } });
        localStorage.setItem(
          "auth_user",
          JSON.stringify({ ...state.user, mfaEnabled: false }),
        );
      }
    } catch (error) {
      throw error;
    }
  };

  const requestPasswordReset = async (email: string) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast({
        title: "Reset link sent",
        description: "Check your email for password reset instructions.",
      });
    } catch (error) {
      throw error;
    }
  };

  const resetPassword = async (token: string, newPassword: string) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast({
        title: "Password updated",
        description: "Your password has been changed successfully.",
      });
    } catch (error) {
      throw error;
    }
  };

  const updateProfile = async (data: Partial<User>) => {
    try {
      if (state.user) {
        const updatedUser = { ...state.user, ...data };
        dispatch({ type: "UPDATE_USER", payload: data });
        localStorage.setItem("auth_user", JSON.stringify(updatedUser));
        toast({
          title: "Profile updated",
          description: "Your changes have been saved.",
        });
      }
    } catch (error) {
      throw error;
    }
  };

  const refreshSession = async () => {
    try {
      if (state.session) {
        const newSession = {
          ...state.session,
          expiresAt: Date.now() + 24 * 60 * 60 * 1000,
        };
        saveSession(newSession);
      }
    } catch (error) {
      throw error;
    }
  };

  const openAuthModal = (
    step: AuthState["authModal"]["step"],
    provider?: AuthState["authModal"]["provider"],
  ) => {
    dispatch({ type: "OPEN_AUTH_MODAL", payload: { step, provider } });
  };

  const closeAuthModal = () => {
    dispatch({ type: "CLOSE_AUTH_MODAL" });
  };

  // Initialize auth on mount
  useEffect(() => {
    restoreSession();
  }, []);

  // Auto-refresh session
  useEffect(() => {
    if (state.isAuthenticated && state.session) {
      const refreshInterval = setInterval(
        () => {
          const timeUntilExpiry = state.session!.expiresAt - Date.now();
          if (timeUntilExpiry < 30 * 60 * 1000) {
            // Refresh 30 minutes before expiry
            refreshSession();
          }
        },
        5 * 60 * 1000,
      ); // Check every 5 minutes

      return () => clearInterval(refreshInterval);
    }
  }, [state.isAuthenticated, state.session]);

  const contextValue: AuthContextType = {
    ...state,
    login,
    loginWithProvider,
    loginWithWebAuthn,
    signup,
    logout,
    verifyMFA,
    enableMFA,
    disableMFA,
    requestPasswordReset,
    resetPassword,
    updateProfile,
    refreshSession,
    checkSecurity,
    openAuthModal,
    closeAuthModal,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
