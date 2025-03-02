'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { WaitlistEntryWithId } from '@/types/waitlist';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { 
  Download, 
  Search, 
  Users, 
  CheckCircle, 
  DollarSign,
  MailCheck,
  Loader2,
  ShieldAlert
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/components/ui/use-toast';

export default function WaitlistAdmin() {
  const [entries, setEntries] = useState<WaitlistEntryWithId[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAuthError, setIsAuthError] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [stats, setStats] = useState({
    total: 0,
    contacted: 0,
    converted: 0,
    lastWeek: 0
  });
  
  const router = useRouter();
  const { toast } = useToast();
  
  // First, fetch the API key
  useEffect(() => {
    const getApiKey = async () => {
      try {
        const response = await fetch('/api/admin/auth');
        if (!response.ok) {
          throw new Error('Failed to get API key');
        }
        
        const data = await response.json();
        setApiKey(data.apiKey);
      } catch (err) {
        console.error('Failed to get API key:', err);
        setError('Failed to authenticate');
      }
    };
    
    getApiKey();
  }, []);
  
  // Then fetch waitlist entries once we have the API key
  useEffect(() => {
    if (!apiKey) return; // Wait until we have the API key
    
    const fetchEntries = async () => {
      try {
        setLoading(true);
        setIsAuthError(false);
        
        // Use the actual API endpoint to fetch waitlist data
        const response = await fetch('/api/admin/waitlist', {
          headers: { 'x-api-key': apiKey }
        });
        
        if (response.status === 401) {
          setIsAuthError(true);
          throw new Error('Authentication failed - incorrect admin key');
        }
        
        if (!response.ok) {
          throw new Error('Failed to fetch waitlist entries');
        }
        
        const data = await response.json();
        
        setEntries(data.entries || []);
        setStats(data.stats || {
          total: (data.entries || []).length,
          contacted: (data.entries || []).filter((e: WaitlistEntryWithId) => e.contacted).length,
          converted: (data.entries || []).filter((e: WaitlistEntryWithId) => e.convertedToCustomer).length,
          lastWeek: 0
        });
      } catch (err) {
        console.error('Failed to load waitlist entries:', err);
        
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('Failed to load waitlist entries');
        }
        
        toast({
          title: 'Error',
          description: isAuthError ? 'Authentication failed' : 'Failed to load waitlist data',
          variant: 'destructive'
        });
        
        // Fallback to empty data
        setEntries([]);
        setStats({
          total: 0,
          contacted: 0,
          converted: 0,
          lastWeek: 0
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchEntries();
  }, [apiKey, toast]);
  
  // Filter entries based on search query
  const filteredEntries = entries.filter(entry => {
    const query = searchQuery.toLowerCase();
    return (
      entry.name.toLowerCase().includes(query) ||
      entry.email.toLowerCase().includes(query) ||
      entry.source.toLowerCase().includes(query) ||
      (entry.notes && entry.notes.toLowerCase().includes(query))
    );
  });
  
  // Toggle contacted status
  const toggleContacted = async (id: string, currentValue: boolean) => {
    if (!apiKey) return;
    
    try {
      // Call the API to update the entry
      const response = await fetch('/api/admin/waitlist', {
        method: 'PATCH',
        headers: { 
          'Content-Type': 'application/json',
          'x-api-key': apiKey
        },
        body: JSON.stringify({ id, contacted: !currentValue })
      });
      
      if (response.status === 401) {
        setIsAuthError(true);
        throw new Error('Authentication failed - incorrect admin key');
      }
      
      if (!response.ok) {
        throw new Error('Failed to update entry');
      }
      
      // Update local state
      setEntries(prev => 
        prev.map(entry => 
          entry.id === id 
            ? { ...entry, contacted: !currentValue } 
            : entry
        )
      );
      
      // Update stats
      setStats(prev => {
        const newContacted = currentValue 
          ? prev.contacted - 1 
          : prev.contacted + 1;
        
        return {
          ...prev,
          contacted: newContacted
        };
      });
      
      toast({
        title: 'Updated',
        description: `Marked ${currentValue ? 'not contacted' : 'contacted'}`,
      });
    } catch (err) {
      console.error('Failed to update entry', err);
      toast({
        title: 'Error',
        description: isAuthError ? 'Authentication failed' : 'Failed to update entry',
        variant: 'destructive'
      });
    }
  };
  
  // Toggle converted status
  const toggleConverted = async (id: string, currentValue: boolean) => {
    if (!apiKey) return;
    
    try {
      // Call the API to update the entry
      const response = await fetch('/api/admin/waitlist', {
        method: 'PATCH',
        headers: { 
          'Content-Type': 'application/json',
          'x-api-key': apiKey
        },
        body: JSON.stringify({ id, convertedToCustomer: !currentValue })
      });
      
      if (response.status === 401) {
        setIsAuthError(true);
        throw new Error('Authentication failed - incorrect admin key');
      }
      
      if (!response.ok) {
        throw new Error('Failed to update entry');
      }
      
      // Update local state
      setEntries(prev => 
        prev.map(entry => 
          entry.id === id 
            ? { ...entry, convertedToCustomer: !currentValue } 
            : entry
        )
      );
      
      // Update stats
      setStats(prev => {
        const newConverted = currentValue 
          ? prev.converted - 1 
          : prev.converted + 1;
        
        return {
          ...prev,
          converted: newConverted
        };
      });
      
      toast({
        title: 'Updated',
        description: `Marked ${currentValue ? 'not converted' : 'converted to customer'}`,
      });
    } catch (err) {
      console.error('Failed to update entry', err);
      toast({
        title: 'Error',
        description: isAuthError ? 'Authentication failed' : 'Failed to update entry',
        variant: 'destructive'
      });
    }
  };
  
  // Export as CSV
  const exportToCsv = () => {
    // Create CSV content
    const headers = ['Name', 'Email', 'Date', 'Source', 'Interests', 'Notes', 'Contacted', 'Converted'];
    const rows = entries.map(entry => [
      entry.name,
      entry.email,
      new Date(entry.createdAt).toLocaleDateString(),
      entry.source,
      (entry.interests || []).join(', '),
      entry.notes || '',
      entry.contacted ? 'Yes' : 'No',
      entry.convertedToCustomer ? 'Yes' : 'No'
    ]);
    
    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(','))
    ].join('\n');
    
    // Create download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `waitlist-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast({
      title: 'Export complete',
      description: 'CSV file downloaded successfully',
    });
  };
  
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  
  // Loading state while getting API key
  if (!apiKey && !error) {
    return (
      <div className="container mx-auto py-10 px-4">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold">Waitlist Management</h1>
            <p className="text-muted-foreground">Manage and track interest in premium features</p>
          </div>
          <Button variant="outline" onClick={() => router.push('/admin')}>
            Back to Admin
          </Button>
        </div>
        
        <div className="py-20 flex justify-center items-center text-muted-foreground">
          <Loader2 className="h-8 w-8 animate-spin mr-2" />
          <span>Authenticating...</span>
        </div>
      </div>
    );
  }
  
  // Show authentication error message
  if (isAuthError || (error && error.includes('authenticate'))) {
    return (
      <div className="container mx-auto py-10 px-4">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold">Waitlist Management</h1>
            <p className="text-muted-foreground">Manage and track interest in premium features</p>
          </div>
          <Button variant="outline" onClick={() => router.push('/admin')}>
            Back to Admin
          </Button>
        </div>
        
        <div className="bg-red-50 border border-red-200 text-red-700 p-8 rounded-lg flex flex-col items-center justify-center">
          <ShieldAlert className="h-12 w-12 mb-4 text-red-500" />
          <h2 className="text-xl font-bold mb-2">Authentication Failed</h2>
          <p className="text-center mb-6">
            Could not authenticate to the admin API. The API key may be incorrect or not configured properly.
          </p>
          <p className="text-sm text-red-600 max-w-lg text-center mb-4">
            Please make sure the ADMIN_API_KEY environment variable is set correctly on the server.
          </p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto py-10 px-4">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Waitlist Management</h1>
          <p className="text-muted-foreground">Manage and track interest in premium features</p>
        </div>
        <Button variant="outline" onClick={() => router.push('/admin')}>
          Back to Admin
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Signups
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Users className="h-4 w-4 text-muted-foreground mr-2" />
              <span className="text-2xl font-bold">{stats.total}</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Last 7 Days
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Users className="h-4 w-4 text-muted-foreground mr-2" />
              <span className="text-2xl font-bold">{stats.lastWeek}</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Contacted
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <MailCheck className="h-4 w-4 text-muted-foreground mr-2" />
              <span className="text-2xl font-bold">{stats.contacted}</span>
              <span className="text-sm text-muted-foreground ml-2">
                ({stats.total ? Math.round((stats.contacted / stats.total) * 100) : 0}%)
              </span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Converted
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <DollarSign className="h-4 w-4 text-muted-foreground mr-2" />
              <span className="text-2xl font-bold">{stats.converted}</span>
              <span className="text-sm text-muted-foreground ml-2">
                ({stats.total ? Math.round((stats.converted / stats.total) * 100) : 0}%)
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="all">
        <div className="flex justify-between items-center mb-4 flex-wrap gap-4">
          <TabsList>
            <TabsTrigger value="all">All Entries</TabsTrigger>
            <TabsTrigger value="not-contacted">Not Contacted</TabsTrigger>
            <TabsTrigger value="contacted">Contacted</TabsTrigger>
            <TabsTrigger value="converted">Converted</TabsTrigger>
          </TabsList>
          
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search..."
                className="pl-8 w-[250px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline" onClick={exportToCsv} disabled={entries.length === 0 || loading}>
              <Download className="h-4 w-4 mr-2" />
              Export CSV
            </Button>
          </div>
        </div>
        
        <Separator className="my-4" />
        
        <TabsContent value="all" className="mt-0">
          <WaitlistTable 
            entries={filteredEntries}
            loading={loading}
            formatDate={formatDate}
            toggleContacted={toggleContacted}
            toggleConverted={toggleConverted}
          />
        </TabsContent>
        
        <TabsContent value="not-contacted" className="mt-0">
          <WaitlistTable 
            entries={filteredEntries.filter(entry => !entry.contacted)}
            loading={loading}
            formatDate={formatDate}
            toggleContacted={toggleContacted}
            toggleConverted={toggleConverted}
          />
        </TabsContent>
        
        <TabsContent value="contacted" className="mt-0">
          <WaitlistTable 
            entries={filteredEntries.filter(entry => entry.contacted)}
            loading={loading}
            formatDate={formatDate}
            toggleContacted={toggleContacted}
            toggleConverted={toggleConverted}
          />
        </TabsContent>
        
        <TabsContent value="converted" className="mt-0">
          <WaitlistTable 
            entries={filteredEntries.filter(entry => entry.convertedToCustomer)}
            loading={loading}
            formatDate={formatDate}
            toggleContacted={toggleContacted}
            toggleConverted={toggleConverted}
          />
        </TabsContent>
      </Tabs>
      
      {error && !isAuthError && !error.includes('authenticate') && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mt-6">
          {error}
        </div>
      )}
    </div>
  );
}

interface WaitlistTableProps {
  entries: WaitlistEntryWithId[];
  loading: boolean;
  formatDate: (date: Date) => string;
  toggleContacted: (id: string, current: boolean) => void;
  toggleConverted: (id: string, current: boolean) => void;
}

function WaitlistTable({ 
  entries, 
  loading, 
  formatDate,
  toggleContacted,
  toggleConverted
}: WaitlistTableProps) {
  if (loading) {
    return (
      <div className="py-20 flex justify-center items-center text-muted-foreground">
        <Loader2 className="h-8 w-8 animate-spin mr-2" />
        <span>Loading waitlist data...</span>
      </div>
    );
  }
  
  if (entries.length === 0) {
    return <div className="py-20 text-center text-muted-foreground">No entries found</div>;
  }
  
  return (
    <div className="overflow-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Source</TableHead>
            <TableHead>Interests</TableHead>
            <TableHead>Contacted</TableHead>
            <TableHead>Converted</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {entries.map((entry) => (
            <TableRow key={entry.id}>
              <TableCell className="font-medium">{entry.name}</TableCell>
              <TableCell>{entry.email}</TableCell>
              <TableCell>{formatDate(entry.createdAt)}</TableCell>
              <TableCell>
                <Badge variant="outline">{entry.source}</Badge>
              </TableCell>
              <TableCell>
                <div className="flex flex-wrap gap-1">
                  {entry.interests && entry.interests.map(interest => (
                    <Badge key={interest} variant="secondary" className="text-xs">
                      {interest}
                    </Badge>
                  ))}
                  {(!entry.interests || entry.interests.length === 0) && (
                    <span className="text-muted-foreground text-xs">None specified</span>
                  )}
                </div>
              </TableCell>
              <TableCell>
                <Switch 
                  checked={entry.contacted} 
                  onCheckedChange={() => toggleContacted(entry.id, entry.contacted)} 
                />
              </TableCell>
              <TableCell>
                <Switch 
                  checked={entry.convertedToCustomer} 
                  onCheckedChange={() => toggleConverted(entry.id, entry.convertedToCustomer)} 
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
