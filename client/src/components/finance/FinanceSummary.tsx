import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowUp, ArrowDown, Wallet } from "lucide-react";

interface TransactionSummary {
  currentBalance: number;
  totalIncome: number;
  totalExpense: number;
}

const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
};

const FinanceSummary = () => {
  const { data: summary, isLoading, error } = useQuery<TransactionSummary>({
    queryKey: ["/api/transactions/summary"],
  });
  
  if (error) {
    return (
      <div className="text-red-500 mb-6">
        Failed to load financial summary. Please try again later.
      </div>
    );
  }
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      {/* Current Balance */}
      <Card className="bg-white rounded-xl shadow-md">
        <CardContent className="p-6">
          <div className="flex items-center">
            <div className="rounded-full bg-primary-100 p-3 mr-4">
              <Wallet className="h-6 w-6 text-primary-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Current Balance</p>
              {isLoading ? (
                <Skeleton className="h-8 w-32 mt-1" />
              ) : (
                <h3 className="text-2xl font-bold text-gray-900">
                  {formatCurrency(summary?.currentBalance || 0)}
                </h3>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Total Income */}
      <Card className="bg-white rounded-xl shadow-md">
        <CardContent className="p-6">
          <div className="flex items-center">
            <div className="rounded-full bg-green-100 p-3 mr-4">
              <ArrowUp className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Total Income</p>
              {isLoading ? (
                <Skeleton className="h-8 w-32 mt-1" />
              ) : (
                <h3 className="text-2xl font-bold text-gray-900">
                  {formatCurrency(summary?.totalIncome || 0)}
                </h3>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Total Expense */}
      <Card className="bg-white rounded-xl shadow-md">
        <CardContent className="p-6">
          <div className="flex items-center">
            <div className="rounded-full bg-red-100 p-3 mr-4">
              <ArrowDown className="h-6 w-6 text-red-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Total Expense</p>
              {isLoading ? (
                <Skeleton className="h-8 w-32 mt-1" />
              ) : (
                <h3 className="text-2xl font-bold text-gray-900">
                  {formatCurrency(summary?.totalExpense || 0)}
                </h3>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FinanceSummary;
