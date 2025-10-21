import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Mail, 
  Phone, 
  Globe, 
  Calendar, 
  DollarSign, 
  MessageSquare,
  ExternalLink,
  Search,
  Filter,
  TrendingUp,
  Award,
  Star
} from 'lucide-react';

interface Lead {
  id: string;
  created_at: string;
  name: string | null;
  email: string | null;
  phone: string | null;
  business_name: string | null;
  website: string | null;
  project_type: string | null;
  budget_range: string | null;
  timeline: string | null;
  requirements: string | null;
  inspiration_sites: string[] | null;
  preferred_colors: string | null;
  design_style: string | null;
  status: string;
  priority: string;
  extraction_confidence: number;
  lead_score: number;
  full_conversation: Array<{ role: string; content: string }>;
}

export default function Leads() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterPriority, setFilterPriority] = useState<string>('all');

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    try {
      const { data, error } = await supabase
        .from('chat_leads')
        .select('*')
        .order('lead_score', { ascending: false, nullsFirst: false })
        .order('created_at', { ascending: false });

      if (error) throw error;
      setLeads(data || []);
    } catch (error) {
      console.error('Error fetching leads:', error);
    } finally {
      setLoading(false);
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'destructive';
      case 'high': return 'default';
      case 'medium': return 'secondary';
      case 'low': return 'outline';
      default: return 'secondary';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'converted': return 'default';
      case 'qualified': return 'secondary';
      case 'contacted': return 'outline';
      case 'new': return 'destructive';
      case 'lost': return 'outline';
      default: return 'secondary';
    }
  };

  const filteredLeads = leads.filter(lead => {
    const matchesSearch = 
      lead.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.business_name?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || lead.status === filterStatus;
    const matchesPriority = filterPriority === 'all' || lead.priority === filterPriority;

    return matchesSearch && matchesStatus && matchesPriority;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading leads...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Lead Management</h1>
          <p className="text-muted-foreground">
            {filteredLeads.length} leads captured from AI chatbot
          </p>
        </div>
        <Button onClick={fetchLeads}>
          Refresh
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, email, or business..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              >
                <option value="all">All Statuses</option>
                <option value="new">New</option>
                <option value="contacted">Contacted</option>
                <option value="qualified">Qualified</option>
                <option value="converted">Converted</option>
                <option value="lost">Lost</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <select
                value={filterPriority}
                onChange={(e) => setFilterPriority(e.target.value)}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              >
                <option value="all">All Priorities</option>
                <option value="urgent">Urgent</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Leads List */}
      <div className="grid gap-4">
        {filteredLeads.map((lead) => (
          <Card key={lead.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <CardTitle className="flex items-center gap-2 flex-wrap">
                    {lead.name || lead.email || 'Anonymous Lead'}
                    
                    {/* Lead Score Badge */}
                    {lead.lead_score !== undefined && lead.lead_score !== null && (
                      <Badge 
                        variant={
                          lead.lead_score >= 80 ? 'default' : 
                          lead.lead_score >= 60 ? 'secondary' : 
                          'outline'
                        }
                        className={`flex items-center gap-1 ${
                          lead.lead_score >= 80 ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white' :
                          lead.lead_score >= 60 ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white' :
                          ''
                        }`}
                      >
                        {lead.lead_score >= 80 ? <Award className="w-3 h-3" /> : 
                         lead.lead_score >= 60 ? <TrendingUp className="w-3 h-3" /> : 
                         <Star className="w-3 h-3" />}
                        Score: {lead.lead_score}/100
                      </Badge>
                    )}
                    
                    <Badge variant={getPriorityColor(lead.priority)}>
                      {lead.priority}
                    </Badge>
                    <Badge variant={getStatusColor(lead.status)}>
                      {lead.status}
                    </Badge>
                  </CardTitle>
                  <CardDescription>
                    {lead.business_name && (
                      <span className="font-medium">{lead.business_name} • </span>
                    )}
                    Captured {new Date(lead.created_at).toLocaleDateString()}
                  </CardDescription>
                </div>
                <div className="text-right text-sm text-muted-foreground">
                  {Math.round(lead.extraction_confidence * 100)}% AI confidence
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              {/* Contact Info */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {lead.email && (
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <a href={`mailto:${lead.email}`} className="text-blue-600 hover:underline">
                      {lead.email}
                    </a>
                  </div>
                )}
                {lead.phone && (
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <a href={`tel:${lead.phone}`} className="text-blue-600 hover:underline">
                      {lead.phone}
                    </a>
                  </div>
                )}
                {lead.website && (
                  <div className="flex items-center gap-2 text-sm">
                    <Globe className="h-4 w-4 text-muted-foreground" />
                    <a 
                      href={lead.website} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline flex items-center gap-1"
                    >
                      {lead.website}
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                )}
              </div>

              {/* Project Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t">
                {lead.project_type && (
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Project Type</p>
                    <p className="text-sm">{lead.project_type}</p>
                  </div>
                )}
                {lead.budget_range && (
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Budget</p>
                      <p className="text-sm">{lead.budget_range}</p>
                    </div>
                  </div>
                )}
                {lead.timeline && (
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Timeline</p>
                      <p className="text-sm">{lead.timeline}</p>
                    </div>
                  </div>
                )}
                {lead.design_style && (
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Design Style</p>
                    <p className="text-sm">{lead.design_style}</p>
                  </div>
                )}
              </div>

              {/* Design Preferences */}
              {(lead.inspiration_sites || lead.preferred_colors) && (
                <div className="pt-2 border-t space-y-2">
                  <p className="text-sm font-medium">Design Preferences</p>
                  {lead.inspiration_sites && lead.inspiration_sites.length > 0 && (
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Inspiration Sites:</p>
                      <div className="flex flex-wrap gap-2">
                        {lead.inspiration_sites.map((site, idx) => (
                          <a
                            key={idx}
                            href={site}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-blue-600 hover:underline flex items-center gap-1"
                          >
                            {site}
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                  {lead.preferred_colors && (
                    <p className="text-sm">
                      <span className="text-muted-foreground">Colors:</span> {lead.preferred_colors}
                    </p>
                  )}
                </div>
              )}

              {/* Requirements */}
              {lead.requirements && (
                <div className="pt-2 border-t">
                  <p className="text-sm font-medium text-muted-foreground mb-1">Requirements</p>
                  <p className="text-sm">{lead.requirements}</p>
                </div>
              )}

              {/* Conversation Preview */}
              {lead.full_conversation && lead.full_conversation.length > 0 && (
                <div className="pt-2 border-t">
                  <div className="flex items-center gap-2 mb-2">
                    <MessageSquare className="h-4 w-4 text-muted-foreground" />
                    <p className="text-sm font-medium text-muted-foreground">
                      Conversation ({lead.full_conversation.length} messages)
                    </p>
                  </div>
                  <div className="bg-muted/50 rounded-lg p-3 max-h-48 overflow-y-auto space-y-2">
                    {lead.full_conversation.slice(-4).map((msg, idx) => (
                      <div key={idx} className="text-sm">
                        <span className="font-medium">
                          {msg.role === 'user' ? 'Customer' : 'AI'}:
                        </span>
                        <span className="ml-2">{msg.content}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}

        {filteredLeads.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <p className="text-muted-foreground">No leads found matching your filters</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
