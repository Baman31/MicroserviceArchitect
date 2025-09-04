import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Eye, EyeOff, Shield, AlertTriangle } from 'lucide-react';

interface LoginAttempt {
  attempts: number;
  lockedUntil?: Date;
  lastAttempt?: Date;
}

export function AdminLogin() {
  const [, setLocation] = useLocation();
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loginAttempts, setLoginAttempts] = useState<LoginAttempt>({ attempts: 0 });
  const [remainingTime, setRemainingTime] = useState<number | null>(null);

  // Check if user is already logged in
  useEffect(() => {
    checkExistingSession();
  }, []);

  // Update countdown timer for lockout
  useEffect(() => {
    if (loginAttempts.lockedUntil) {
      const interval = setInterval(() => {
        const now = new Date().getTime();
        const lockTime = new Date(loginAttempts.lockedUntil!).getTime();
        const remaining = Math.max(0, Math.ceil((lockTime - now) / 1000));
        
        if (remaining <= 0) {
          setLoginAttempts(prev => ({ ...prev, lockedUntil: undefined }));
          setRemainingTime(null);
        } else {
          setRemainingTime(remaining);
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [loginAttempts.lockedUntil]);

  const checkExistingSession = async () => {
    try {
      const token = localStorage.getItem('admin_token');
      if (!token) return;

      const response = await fetch('/api/secure/admin/session', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        if (data.valid) {
          setLocation('/admin/dashboard');
        }
      } else {
        localStorage.removeItem('admin_token');
      }
    } catch (error) {
      console.error('Session check failed:', error);
      localStorage.removeItem('admin_token');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check if locked out
    if (loginAttempts.lockedUntil && new Date() < new Date(loginAttempts.lockedUntil)) {
      setError('Account temporarily locked. Please try again later.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/secure/admin/authenticate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        // Store token securely
        localStorage.setItem('admin_token', data.sessionToken);
        localStorage.setItem('admin_user', JSON.stringify({
          id: data.admin.id,
          username: data.admin.username,
          role: data.admin.role,
          permissions: data.admin.permissions,
          firstName: data.admin.firstName,
          lastName: data.admin.lastName
        }));

        // Reset login attempts on success
        setLoginAttempts({ attempts: 0 });
        
        // Redirect to admin dashboard
        setLocation('/admin/dashboard');
      } else {
        // Handle failed login
        const newAttempts = loginAttempts.attempts + 1;
        const maxAttempts = 5;
        
        setLoginAttempts(prev => ({
          attempts: newAttempts,
          lastAttempt: new Date(),
          lockedUntil: newAttempts >= maxAttempts 
            ? new Date(Date.now() + 15 * 60 * 1000) // 15 minutes lockout
            : undefined
        }));

        if (newAttempts >= maxAttempts) {
          setError('Too many failed attempts. Account locked for 15 minutes.');
        } else {
          const remaining = maxAttempts - newAttempts;
          setError(`${data.error || 'Invalid credentials'}. ${remaining} attempts remaining.`);
        }
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('Network error. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  const isLocked = loginAttempts.lockedUntil && new Date() < new Date(loginAttempts.lockedUntil);
  const attemptsRemaining = Math.max(0, 5 - loginAttempts.attempts);

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Security Warning */}
        <Alert className="mb-6 border-amber-200 bg-amber-50 text-amber-800">
          <Shield className="h-4 w-4" />
          <AlertDescription>
            This is a restricted admin area. All access attempts are logged and monitored.
          </AlertDescription>
        </Alert>

        <Card className="backdrop-blur-sm bg-white/95 shadow-2xl">
          <CardHeader className="text-center">
            <div className="mx-auto w-12 h-12 bg-slate-900 rounded-full flex items-center justify-center mb-4">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold text-slate-900">
              Admin Portal
            </CardTitle>
            <CardDescription>
              Enter your credentials to access the admin dashboard
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {isLocked && remainingTime && (
                <Alert className="border-red-200 bg-red-50 text-red-800">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>
                    Account locked for {formatTime(remainingTime)}
                  </AlertDescription>
                </Alert>
              )}

              {loginAttempts.attempts > 0 && !isLocked && (
                <Alert className="border-orange-200 bg-orange-50 text-orange-800">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>
                    {attemptsRemaining} login attempts remaining
                  </AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  value={credentials.username}
                  onChange={(e) => setCredentials(prev => ({ ...prev, username: e.target.value }))}
                  required
                  disabled={loading || isLocked}
                  autoComplete="username"
                  className="bg-white"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={credentials.password}
                    onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
                    required
                    disabled={loading || isLocked}
                    autoComplete="current-password"
                    className="bg-white pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={loading || isLocked}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700 disabled:opacity-50"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-slate-900 hover:bg-slate-800 text-white"
                disabled={loading || isLocked}
              >
                {loading ? 'Authenticating...' : 'Sign In'}
              </Button>
            </form>

            <div className="mt-6 text-center text-sm text-slate-600">
              <p>Secured with enterprise-grade authentication</p>
              <p className="mt-1">• Rate limiting • Session management • Activity logging</p>
            </div>
          </CardContent>
        </Card>

        <div className="mt-4 text-center text-xs text-slate-400">
          Protected by advanced security protocols
        </div>
      </div>
    </div>
  );
}