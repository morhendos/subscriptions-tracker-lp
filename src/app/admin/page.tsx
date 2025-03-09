'use client';

import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, Mail, Settings, FileText, CreditCard, BarChart3 } from 'lucide-react';

export default function AdminDashboard() {
  return (
    <div className="container mx-auto py-6 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-muted-foreground">Manage your website and subscription features</p>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Waitlist Card */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              <CardTitle>Waitlist</CardTitle>
            </div>
            <CardDescription>
              Manage users interested in premium features
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>View, export, and manage the waitlist for premium features.</p>
          </CardContent>
          <CardFooter>
            <Button asChild>
              <Link href="/admin/waitlist">Manage Waitlist</Link>
            </Button>
          </CardFooter>
        </Card>
        
        {/* Content Card */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              <CardTitle>Content</CardTitle>
            </div>
            <CardDescription>
              Manage website content
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>Edit blog posts, pages, and marketing content.</p>
          </CardContent>
          <CardFooter>
            <Button variant="outline" disabled>Coming Soon</Button>
          </CardFooter>
        </Card>
        
        {/* Analytics Card */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              <CardTitle>Analytics</CardTitle>
            </div>
            <CardDescription>
              View site performance metrics
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>Check visitor statistics, conversion rates, and site usage.</p>
          </CardContent>
          <CardFooter>
            <Button variant="outline" disabled>Coming Soon</Button>
          </CardFooter>
        </Card>
        
        {/* Payment Settings Card */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              <CardTitle>Payments</CardTitle>
            </div>
            <CardDescription>
              Manage payment settings
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>Configure payment providers, pricing, and subscription settings.</p>
          </CardContent>
          <CardFooter>
            <Button variant="outline" disabled>Coming Soon</Button>
          </CardFooter>
        </Card>
        
        {/* Emails Card */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Mail className="h-5 w-5" />
              <CardTitle>Emails</CardTitle>
            </div>
            <CardDescription>
              Manage email communications
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>Edit email templates and manage newsletter campaigns.</p>
          </CardContent>
          <CardFooter>
            <Button variant="outline" disabled>Coming Soon</Button>
          </CardFooter>
        </Card>
        
        {/* Settings Card */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              <CardTitle>Settings</CardTitle>
            </div>
            <CardDescription>
              Configure site settings
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>Manage feature flags, environment variables, and site configuration.</p>
          </CardContent>
          <CardFooter>
            <Button variant="outline" disabled>Coming Soon</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
