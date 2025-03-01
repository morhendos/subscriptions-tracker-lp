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
  MailCheck 
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';

export default function WaitlistAdmin() {
  const [entries, setEntries] = useState<WaitlistEntryWithId[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [stats, setStats] = useState({
    total: 0,
    contacted: 0,
    converted: 0,
    lastWeek: 0
  });
  
  const router = useRouter();
  
  // Fetch waitlist entries
  useEffect(() => {
    const fetchEntries = async () => {
      try {
        // This will be implemented with a real API endpoint
        // For now we'll use dummy data
        setLoading(true);
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Dummy data
        const dummyEntries: WaitlistEntryWithId[] = [
          {
            id: '1',
            name: 'John Doe',
            email: 'john@example.com',
            createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
            source: 'pricing_page',
            interests: ['unlimited', 'analytics'],
            contacted: false,
            convertedToCustomer: false
          },
          {
            id: '2',
            name: 'Jane Smith',
            email: 'jane@example.com',
            createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
            source: 'feature_gate',
            interests: ['categories'],
            notes: 'Interested in family sharing',
            contacted: true,
            convertedToCustomer: false
          },
          {
            id: '3',
            name: 'Mike Johnson',
            email: 'mike@example.com',
            createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
            source: 'waitlist_page',
            interests: ['unlimited', 'analytics', 'categories'],
            contacted: true,
            convertedToCustomer: true
          }
        ];
        
        setEntries(dummyEntries);
        setStats({
          total: dummyEntries.length,
          contacted: dummyEntries.filter(entry => entry.contacted).length,
          converted: dummyEntries.filter(entry => entry.convertedToCustomer).length,
          lastWeek: dummyEntries.filter(entry => {
            const lastWeek = new Date();
            lastWeek.setDate(lastWeek.getDate() - 7);
            return new Date(entry.createdAt) >= lastWeek;
          }).length
        });
      } catch (err) {
        setError('Failed to load waitlist entries');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchEntries();
  }, []);
  
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
    try {
      // This will call an API endpoint to update in production
      // For now just update the local state
      setEntries(prev => 
        prev.map(entry => 
          entry.id === id 
            ? { ...entry, contacted: !currentValue } 
            : entry
        )
      );
    } catch (err) {
      console.error('Failed to update entry', err);
    }
  };
  
  // Toggle converted status
  const toggleConverted = async (id: string, currentValue: boolean) => {
    try {
      // This will call an API endpoint to update in production
      // For now just update the local state
      setEntries(prev => 
        prev.map(entry => 
          entry.id === id 
            ? { ...entry, convertedToCustomer: !currentValue } 
            : entry
        )
      );
    } catch (err) {
      console.error('Failed to update entry', err);
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
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
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
  };
  
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  
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
        <div className="flex justify-between items-center mb-4">
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
            <Button variant="outline" onClick={exportToCsv}>
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
      
      {error && (
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
    return <div className="py-20 text-center text-muted-foreground">Loading waitlist data...</div>;
  }
  
  if (entries.length === 0) {
    return <div className="py-20 text-center text-muted-foreground">No entries found</div>;
  }
  
  return (
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
  );
}
