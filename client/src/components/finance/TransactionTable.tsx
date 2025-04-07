import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { formatCurrency, formatDate, getTransactionColor } from "@/lib/utils";
import { type Transaction } from "@shared/schema";

export default function TransactionTable() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  
  // Fetch transactions
  const { data: transactions, isLoading } = useQuery<Transaction[]>({
    queryKey: ['/api/transactions'],
  });
  
  // Filter transactions based on search query
  const filteredTransactions = transactions?.filter(transaction => 
    transaction.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    transaction.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    transaction.type.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];
  
  // Sort transactions by date (newest first)
  const sortedTransactions = [...filteredTransactions].sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
  
  // Calculate pagination
  const totalItems = sortedTransactions.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const displayedTransactions = sortedTransactions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  
  // Navigation handlers
  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  
  return (
    <Card className="transaction-table-container">
      <CardHeader className="border-b border-[#E9ECEF] px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h3 className="text-lg font-semibold text-gray-800">Recent Transactions</h3>
        <div className="flex items-center">
          <div className="relative w-full sm:w-48 mr-4">
            <Input
              type="text"
              placeholder="Search transactions..."
              className="pl-8 pr-3 py-1 text-sm border-[#DEE2E6] focus-visible:ring-primary"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute left-3 top-2.5 text-gray-400 h-3 w-3" />
          </div>
          <Button 
            variant="outline" 
            size="sm"
            className="border-[#DEE2E6] hover:bg-gray-50 text-gray-700 text-sm font-medium"
          >
            View All
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className="text-xs font-medium text-gray-600">Date</TableHead>
              <TableHead className="text-xs font-medium text-gray-600">Description</TableHead>
              <TableHead className="text-xs font-medium text-gray-600">Category</TableHead>
              <TableHead className="text-xs font-medium text-gray-600">Amount</TableHead>
              <TableHead className="text-xs font-medium text-gray-600">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              Array.from({ length: itemsPerPage }).map((_, index) => (
                <TableRow key={index}>
                  <TableCell><Skeleton className="h-4 w-20" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-full" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                  <TableCell><Skeleton className="h-6 w-20 rounded-full" /></TableCell>
                </TableRow>
              ))
            ) : displayedTransactions.length > 0 ? (
              displayedTransactions.map((transaction) => {
                const typeColors = getTransactionColor(transaction.type);
                
                return (
                  <TableRow key={transaction.id} className="hover:bg-gray-50 border-b border-[#E9ECEF]">
                    <TableCell className="text-sm text-gray-500">
                      {formatDate(transaction.date)}
                    </TableCell>
                    <TableCell className="text-sm font-medium text-gray-900">
                      {transaction.description}
                    </TableCell>
                    <TableCell className="text-sm text-gray-500">
                      <span className="inline-flex items-center">
                        <div className={`w-2 h-2 ${typeColors.dot} rounded-full mr-2`}></div>
                        {transaction.category}
                      </span>
                    </TableCell>
                    <TableCell className={`text-sm font-medium ${typeColors.text}`}>
                      {transaction.type === 'income' ? '+' : '-'}
                      {formatCurrency(Number(transaction.amount))}
                    </TableCell>
                    <TableCell>
                      <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        {transaction.status}
                      </span>
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-4 text-gray-500">
                  No transactions found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
      
      <CardFooter className="border-t border-[#E9ECEF] px-6 py-4 flex flex-col sm:flex-row justify-between items-center gap-4">
        <Button
          variant="outline"
          size="sm"
          className="border-[#DEE2E6] hover:bg-gray-50 text-gray-700 text-sm font-medium"
          onClick={goToPreviousPage}
          disabled={currentPage === 1}
        >
          <ChevronLeft className="h-4 w-4 mr-1" /> Previous
        </Button>
        <div className="text-sm text-gray-500">
          Showing {((currentPage - 1) * itemsPerPage) + 1}-{Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems} entries
        </div>
        <Button
          variant="outline"
          size="sm"
          className="border-[#DEE2E6] hover:bg-gray-50 text-gray-700 text-sm font-medium"
          onClick={goToNextPage}
          disabled={currentPage === totalPages}
        >
          Next <ChevronRight className="h-4 w-4 ml-1" />
        </Button>
      </CardFooter>
    </Card>
  );
}
