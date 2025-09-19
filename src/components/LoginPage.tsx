import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calculator, TrendingUp, Shield, PieChart } from "lucide-react";

interface LoginPageProps {
  onLogin: () => void;
}

const LoginPage = ({ onLogin }: LoginPageProps) => {
  const [loginData, setLoginData] = useState({ username: "", password: "" });
  const [signupData, setSignupData] = useState({ 
    username: "", 
    email: "", 
    password: "", 
    confirmPassword: "" 
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // This is a demo - in production, you'd validate with Supabase
    if (loginData.username && loginData.password) {
      onLogin();
    }
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    // This is a demo - in production, you'd create account with Supabase
    if (signupData.password === signupData.confirmPassword && signupData.username && signupData.email) {
      onLogin();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center">
        
        {/* Hero Section */}
        <div className="space-y-6 text-center lg:text-left">
          <div className="space-y-2">
            <h1 className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-primary to-info bg-clip-text text-transparent">
              Budget Wise
            </h1>
            <p className="text-xl text-muted-foreground">
              Smart Financial Management Made Simple
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-4 max-w-md mx-auto lg:mx-0">
            <div className="flex items-center gap-2 text-sm">
              <div className="p-2 rounded-lg bg-success/10">
                <Calculator className="h-4 w-4 text-success" />
              </div>
              <span>Smart Calculations</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <div className="p-2 rounded-lg bg-info/10">
                <TrendingUp className="h-4 w-4 text-info" />
              </div>
              <span>Real-time Analytics</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <div className="p-2 rounded-lg bg-warning/10">
                <PieChart className="h-4 w-4 text-warning" />
              </div>
              <span>Visual Reports</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <div className="p-2 rounded-lg bg-primary/10">
                <Shield className="h-4 w-4 text-primary" />
              </div>
              <span>Secure Platform</span>
            </div>
          </div>
        </div>

        {/* Auth Form */}
        <Card className="w-full max-w-md mx-auto backdrop-blur-sm bg-card/50 border-border/50">
          <CardHeader className="text-center">
            <CardTitle>Welcome Back</CardTitle>
            <CardDescription>
              Access your financial dashboard
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>
              
              <TabsContent value="login" className="space-y-4 mt-6">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="username">Username</Label>
                    <Input
                      id="username"
                      placeholder="Enter your username"
                      value={loginData.username}
                      onChange={(e) => setLoginData({...loginData, username: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter your password"
                      value={loginData.password}
                      onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                    />
                  </div>
                  <Button type="submit" className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70">
                    Sign In
                  </Button>
                </form>
              </TabsContent>
              
              <TabsContent value="signup" className="space-y-4 mt-6">
                <form onSubmit={handleSignup} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="new-username">Username</Label>
                    <Input
                      id="new-username"
                      placeholder="Choose a username"
                      value={signupData.username}
                      onChange={(e) => setSignupData({...signupData, username: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={signupData.email}
                      onChange={(e) => setSignupData({...signupData, email: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="new-password">Password</Label>
                    <Input
                      id="new-password"
                      type="password"
                      placeholder="Create a password"
                      value={signupData.password}
                      onChange={(e) => setSignupData({...signupData, password: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm Password</Label>
                    <Input
                      id="confirm-password"
                      type="password"
                      placeholder="Confirm your password"
                      value={signupData.confirmPassword}
                      onChange={(e) => setSignupData({...signupData, confirmPassword: e.target.value})}
                    />
                  </div>
                  <Button type="submit" className="w-full bg-gradient-to-r from-success to-success/80 hover:from-success/90 hover:to-success/70">
                    Create Account
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
          
          <CardFooter className="text-center">
            <p className="text-sm text-muted-foreground">
              🔒 Demo mode - Connect Supabase for real authentication
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;