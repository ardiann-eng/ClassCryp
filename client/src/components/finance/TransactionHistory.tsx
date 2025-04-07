import { useQuery } from "@tanstack/react-query";
import { DataTable } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Transaction } from "@shared/schema";
import { format } from "date-fns";

const TransactionHistory = () => {
  const { data: transactions, isLoading, error } = useQuery<Transaction[]>({
    queryKey: ["/api/transactions"],
  });
  
  if (error) {
    return <div className="text-red-500">Failed to load transactions. Please try again later.</div>;
  }
  
  const formatCurrency = (amount: number, type: string): string => {
    const prefix = type === "income" ? "+" : "-";
    return `${prefix}Rp ${amount.toLocaleString('id-ID')}`;
  };
  
  const columns = [
    {
      key: "date",
      header: "Date",
      cell: (transaction: Transaction) => (
        <span className="text-sm text-gray-500">
          {format(new Date(transaction.date), "MMM d, yyyy")}
        </span>
      ),
    },
    {
      key: "description",
      header: "Description",
      cell: (transaction: Transaction) => (
        <span className="text-sm text-gray-900">{transaction.description}</span>
      ),
    },
    {
      key: "category",
      header: "Category",
      cell: (transaction: Transaction) => (
        <span className="text-sm text-gray-500">{transaction.category}</span>
      ),
    },
    {
      key: "amount",
      header: "Amount",
      cell: (transaction: Transaction) => (
        <span className={`text-sm font-medium ${
          transaction.type === "income" ? "text-green-600" : "text-red-600"
        }`}>
          {formatCurrency(transaction.amount, transaction.type)}
        </span>
      ),
    }
  ];
  
  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold text-gray-900">Recent Transactions</h3>
        <Button variant="link" className="text-sm text-primary-600 hover:text-primary-700">
          View All
        </Button>
      </div>
      
      {isLoading ? (
        <div className="space-y-4">
          {[...Array(5)].map((_, index) => (
            <Skeleton key={index} className="h-16 w-full" />
          ))}
        </div>
      ) : (
        <DataTable
          data={transactions || []}
          columns={columns}
          pagination
          itemsPerPage={5}
        />
      )}
    </>
  );
};

export default TransactionHistory;
