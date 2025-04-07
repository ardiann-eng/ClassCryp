import { useQuery } from "@tanstack/react-query";
import { 
  Wallet, 
  ArrowDownCircle, 
  ArrowUpCircle, 
  Users,
  TrendingUp,
  TrendingDown
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { formatCurrency } from "@/lib/utils";

interface FinanceSummary {
  totalBalance: number;
  totalIncome: number;
  totalExpenses: number;
  duesCollected: number;
}

export default function FinancialOverview() {
  const { data: summary, isLoading } = useQuery<FinanceSummary>({
    queryKey: ['/api/finance-summary'],
  });
  
  // Mock percentage changes (in a real app, these would come from the backend)
  const percentages = {
    balance: 15.3,
    income: 8.2,
    expenses: 12.5,
    dues: 89
  };
  
  // Create loading skeleton card
  const SkeletonCard = () => (
    <Card className="stat-card">
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <Skeleton className="h-4 w-24 mb-2" />
            <Skeleton className="h-8 w-32 mb-2" />
          </div>
          <Skeleton className="h-12 w-12 rounded-lg" />
        </div>
        <div className="mt-4 flex items-center">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="ml-2 h-4 w-24" />
        </div>
      </CardContent>
    </Card>
  );
  
  return (
    <div className="finance-overview grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {isLoading ? (
        <>
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </>
      ) : (
        <>
          {/* Total Balance Card */}
          <Card className="gradient-bg text-white shadow-md">
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium opacity-80">Total Balance</p>
                  <h3 className="text-2xl font-bold mt-1">
                    {formatCurrency(summary?.totalBalance || 0)}
                  </h3>
                </div>
                <div className="stat-icon bg-white/20">
                  <Wallet className="h-5 w-5" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                <span className="flex items-center text-[#C4E75A]">
                  <TrendingUp className="h-3 w-3 mr-1" /> {percentages.balance}%
                </span>
                <span className="ml-2 opacity-80">vs last month</span>
              </div>
            </CardContent>
          </Card>
          
          {/* Total Income Card */}
          <Card className="stat-card">
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-gray-500">Total Income</p>
                  <h3 className="text-2xl font-bold text-gray-800 mt-1">
                    {formatCurrency(summary?.totalIncome || 0)}
                  </h3>
                </div>
                <div className="stat-icon bg-[#FFD500]/20">
                  <ArrowDownCircle className="text-[#D6B100] h-5 w-5" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                <span className="flex items-center text-[#D6B100]">
                  <TrendingUp className="h-3 w-3 mr-1" /> {percentages.income}%
                </span>
                <span className="ml-2 text-gray-500">vs last month</span>
              </div>
            </CardContent>
          </Card>
          
          {/* Total Expenses Card */}
          <Card className="stat-card">
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-gray-500">Total Expenses</p>
                  <h3 className="text-2xl font-bold text-gray-800 mt-1">
                    {formatCurrency(summary?.totalExpenses || 0)}
                  </h3>
                </div>
                <div className="stat-icon bg-red-100">
                  <ArrowUpCircle className="text-red-600 h-5 w-5" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                <span className="flex items-center text-red-600">
                  <TrendingDown className="h-3 w-3 mr-1" /> {percentages.expenses}%
                </span>
                <span className="ml-2 text-gray-500">vs last month</span>
              </div>
            </CardContent>
          </Card>
          
          {/* Dues Collected Card */}
          <Card className="stat-card">
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-gray-500">Dues Collected</p>
                  <h3 className="text-2xl font-bold text-gray-800 mt-1">
                    {summary?.duesCollected}/38
                  </h3>
                </div>
                <div className="stat-icon bg-purple-100">
                  <Users className="text-primary h-5 w-5" />
                </div>
              </div>
              <div className="mt-4">
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className="bg-primary h-2.5 rounded-full" 
                    style={{ width: `${percentages.dues}%` }}
                  ></div>
                </div>
                <span className="ml-2 text-gray-500 text-sm">{percentages.dues}%</span>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
