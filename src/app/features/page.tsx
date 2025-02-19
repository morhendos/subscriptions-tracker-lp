import type { Metadata } from "next";
import Link from "next/link";
import { 
  CheckCircle, Clock, CreditCard, Bell, Wallet, ArrowRight, 
  PieChart, History, RefreshCw, Shield, Zap, Calculator,
  LineChart, BarChart3, DollarSign, Percent, Calendar, Filter,
  Smartphone, Tag, UserPlus, Trash2
} from "lucide-react";

export const metadata: Metadata = {
  title: "Features | Subscriptions Tracker",
  description:
    "Discover all the powerful features of Subscriptions Tracker that help you manage, monitor, and optimize your subscriptions",
  alternates: {
    canonical: "https://subscriptions-tracker.com/features",
  },
};

function FeatureCard({ icon, title, description }) {
  return (
    <div className="relative p-6 bg-card border rounded-xl shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start gap-4">
        <div className="shrink-0 p-2 bg-primary/10 rounded-lg text-primary">
          {icon}
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-2">{title}</h3>
          <p className="text-muted-foreground">{description}</p>
        </div>
      </div>
    </div>
  );
}

// Dashboard UI mock using pure CSS/SVG instead of an image
function DashboardMock() {
  return (
    <div className="rounded-xl overflow-hidden shadow-xl border bg-card p-4">
      <div className="bg-background rounded-lg p-4">
        {/* Mock header */}
        <div className="flex justify-between items-center mb-6">
          <div className="bg-muted h-8 w-40 rounded-md"></div>
          <div className="flex space-x-3">
            <div className="bg-muted h-8 w-8 rounded-full"></div>
            <div className="bg-muted h-8 w-24 rounded-md"></div>
          </div>
        </div>
        
        {/* Mock stats row */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-card p-4 rounded-lg border">
            <div className="flex justify-between mb-2">
              <div className="bg-muted/50 h-4 w-20 rounded-sm"></div>
              <DollarSign className="h-5 w-5 text-green-500" />
            </div>
            <div className="text-2xl font-bold">$128.45</div>
            <div className="bg-muted/30 h-3 w-32 rounded-sm mt-2"></div>
          </div>
          <div className="bg-card p-4 rounded-lg border">
            <div className="flex justify-between mb-2">
              <div className="bg-muted/50 h-4 w-20 rounded-sm"></div>
              <Bell className="h-5 w-5 text-amber-500" />
            </div>
            <div className="text-2xl font-bold">4</div>
            <div className="bg-muted/30 h-3 w-32 rounded-sm mt-2"></div>
          </div>
          <div className="bg-card p-4 rounded-lg border">
            <div className="flex justify-between mb-2">
              <div className="bg-muted/50 h-4 w-20 rounded-sm"></div>
              <Percent className="h-5 w-5 text-blue-500" />
            </div>
            <div className="text-2xl font-bold">22%</div>
            <div className="bg-muted/30 h-3 w-32 rounded-sm mt-2"></div>
          </div>
        </div>
        
        {/* Mock charts and tables */}
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-2 bg-card p-4 rounded-lg border">
            <div className="flex justify-between mb-4">
              <div className="bg-muted/70 h-5 w-40 rounded-sm"></div>
              <div className="flex space-x-2">
                <div className="bg-muted/50 h-6 w-20 rounded-md"></div>
                <div className="bg-muted/50 h-6 w-6 rounded-md"></div>
              </div>
            </div>
            
            {/* Chart mockup */}
            <div className="h-60 relative">
              <div className="absolute inset-x-0 bottom-0 h-px bg-border"></div>
              <div className="absolute inset-y-0 left-0 w-px bg-border"></div>
              
              {/* Chart bars */}
              <div className="flex justify-between items-end h-full pt-6 pb-4">
                <div className="w-8 bg-primary/20 rounded-t-sm h-[20%]"></div>
                <div className="w-8 bg-primary/30 rounded-t-sm h-[30%]"></div>
                <div className="w-8 bg-primary/40 rounded-t-sm h-[50%]"></div>
                <div className="w-8 bg-primary/50 rounded-t-sm h-[40%]"></div>
                <div className="w-8 bg-primary/60 rounded-t-sm h-[70%]"></div>
                <div className="w-8 bg-primary/70 rounded-t-sm h-[60%]"></div>
                <div className="w-8 bg-primary/80 rounded-t-sm h-[80%]"></div>
                <div className="w-8 bg-primary rounded-t-sm h-[90%]"></div>
              </div>
              
              {/* Chart labels */}
              <div className="flex justify-between mt-2">
                <div className="w-8 text-center text-xs text-muted-foreground">Jan</div>
                <div className="w-8 text-center text-xs text-muted-foreground">Feb</div>
                <div className="w-8 text-center text-xs text-muted-foreground">Mar</div>
                <div className="w-8 text-center text-xs text-muted-foreground">Apr</div>
                <div className="w-8 text-center text-xs text-muted-foreground">May</div>
                <div className="w-8 text-center text-xs text-muted-foreground">Jun</div>
                <div className="w-8 text-center text-xs text-muted-foreground">Jul</div>
                <div className="w-8 text-center text-xs text-muted-foreground">Aug</div>
              </div>
            </div>
          </div>
          
          {/* Upcoming renewals */}
          <div className="bg-card p-4 rounded-lg border h-full">
            <div className="bg-muted/70 h-5 w-40 rounded-sm mb-4"></div>
            
            <div className="space-y-3">
              <div className="p-2 border rounded-md flex justify-between">
                <div className="flex items-center">
                  <div className="bg-red-100 h-8 w-8 rounded-md mr-3 flex items-center justify-center">
                    <div className="bg-red-500 h-4 w-4 rounded-sm"></div>
                  </div>
                  <div>
                    <div className="bg-muted/70 h-4 w-20 rounded-sm"></div>
                    <div className="bg-muted/40 h-3 w-14 rounded-sm mt-1"></div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-medium">$14.99</div>
                  <div className="text-xs text-muted-foreground">Tomorrow</div>
                </div>
              </div>
              
              <div className="p-2 border rounded-md flex justify-between">
                <div className="flex items-center">
                  <div className="bg-blue-100 h-8 w-8 rounded-md mr-3 flex items-center justify-center">
                    <div className="bg-blue-500 h-4 w-4 rounded-sm"></div>
                  </div>
                  <div>
                    <div className="bg-muted/70 h-4 w-20 rounded-sm"></div>
                    <div className="bg-muted/40 h-3 w-14 rounded-sm mt-1"></div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-medium">$9.99</div>
                  <div className="text-xs text-muted-foreground">in 3 days</div>
                </div>
              </div>
              
              <div className="p-2 border rounded-md flex justify-between">
                <div className="flex items-center">
                  <div className="bg-green-100 h-8 w-8 rounded-md mr-3 flex items-center justify-center">
                    <div className="bg-green-500 h-4 w-4 rounded-sm"></div>
                  </div>
                  <div>
                    <div className="bg-muted/70 h-4 w-20 rounded-sm"></div>
                    <div className="bg-muted/40 h-3 w-14 rounded-sm mt-1"></div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-medium">$19.99</div>
                  <div className="text-xs text-muted-foreground">in 5 days</div>
                </div>
              </div>
            </div>
            
            <div className="mt-4">
              <div className="bg-muted/30 h-8 w-full rounded-md"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
