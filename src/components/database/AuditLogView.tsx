import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabaseClient';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ArrowLeft } from 'lucide-react';

interface AuditLogViewProps {
  onClose: () => void;
}

interface AccessLog {
  id: string;
  timestamp: string;
  user_id: string;
  action_description: string;
}

const AuditLogView = ({ onClose }: AuditLogViewProps) => {
  const { data: logs, isLoading, error } = useQuery({
    queryKey: ['access_logs'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('access_logs')
        .select('*')
        .order('timestamp', { ascending: false });
      
      if (error) throw error;
      return data as AccessLog[];
    },
  });

  return (
    <div className="h-full bg-cyber-darker p-8">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary neon-glow tracking-widest font-['Orbitron']">
            AUDIT LOGS
          </h1>
          <p className="text-sm text-primary/70 terminal-text tracking-[0.3em] mt-1">
            // ACCESS LEVEL ALPHA
          </p>
        </div>
        <Button
          onClick={onClose}
          variant="outline"
          className="border-primary text-primary hover:bg-primary hover:text-primary-foreground terminal-text"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          RETURN TO TERMINAL
        </Button>
      </div>

      {/* Content */}
      <div className="neon-border bg-card/30 backdrop-blur-sm">
        {isLoading ? (
          <div className="p-12 text-center">
            <div className="text-primary terminal-text text-lg animate-pulse">
              Loading...
            </div>
          </div>
        ) : error ? (
          <div className="p-12 text-center">
            <div className="text-destructive terminal-text text-lg">
              Error: Could not retrieve logs
            </div>
          </div>
        ) : (
          <ScrollArea className="h-[calc(100vh-280px)]">
            <Table>
              <TableHeader>
                <TableRow className="border-primary/30 hover:bg-transparent">
                  <TableHead className="text-primary terminal-text tracking-widest">
                    TIMESTAMP
                  </TableHead>
                  <TableHead className="text-primary terminal-text tracking-widest">
                    USER ID
                  </TableHead>
                  <TableHead className="text-primary terminal-text tracking-widest">
                    ACTION DESCRIPTION
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {logs?.map((log) => (
                  <TableRow 
                    key={log.id}
                    className="border-primary/20 hover:bg-primary/5"
                  >
                    <TableCell className="text-primary/90 terminal-text">
                      {new Date(log.timestamp).toLocaleString('pt-BR', {
                        dateStyle: 'short',
                        timeStyle: 'medium',
                      })}
                    </TableCell>
                    <TableCell className="text-primary/90 terminal-text font-mono text-xs">
                      {log.user_id}
                    </TableCell>
                    <TableCell className="text-foreground/80 terminal-text">
                      {log.action_description}
                    </TableCell>
                  </TableRow>
                ))}
                {logs?.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={3} className="text-center text-muted-foreground terminal-text py-12">
                      No audit logs found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </ScrollArea>
        )}
      </div>
    </div>
  );
};

export default AuditLogView;