import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Transaction } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";

type Period = "Monthly" | "Quarterly" | "Yearly";

const FinanceChart = () => {
  const [period, setPeriod] = useState<Period>("Monthly");
  
  const { data: transactions, isLoading, error } = useQuery<Transaction[]>({
    queryKey: ["/api/transactions"],
  });
  
  const [chartData, setChartData] = useState<any[]>([]);
  
  useEffect(() => {
    if (!transactions) return;
    
    // Process data for chart based on selected period
    const processData = () => {
      const currentDate = new Date();
      const dataMap = new Map();
      
      // Determine date range based on period
      let startDate: Date;
      let formatString: string;
      
      switch (period) {
        case "Monthly":
          startDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 5, 1);
          formatString = "MMM yyyy";
          break;
        case "Quarterly":
          startDate = new Date(currentDate.getFullYear() - 1, currentDate.getMonth() - 3, 1);
          formatString = "QQQ yyyy";
          break;
        case "Yearly":
          startDate = new Date(currentDate.getFullYear() - 4, 0, 1);
          formatString = "yyyy";
          break;
      }
      
      // Filter transactions within date range
      const filteredTransactions = transactions.filter(t => new Date(t.date) >= startDate);
      
      // Group by period
      filteredTransactions.forEach(transaction => {
        const date = new Date(transaction.date);
        let key: string;
        
        switch (period) {
          case "Monthly":
            key = format(date, "MMM yyyy");
            break;
          case "Quarterly":
            const quarter = Math.floor(date.getMonth() / 3) + 1;
            key = `Q${quarter} ${date.getFullYear()}`;
            break;
          case "Yearly":
            key = date.getFullYear().toString();
            break;
        }
        
        if (!dataMap.has(key)) {
          dataMap.set(key, { name: key, income: 0, expense: 0 });
        }
        
        const entry = dataMap.get(key);
        if (transaction.type === "income") {
          entry.income += transaction.amount;
        } else {
          entry.expense += transaction.amount;
        }
      });
      
      // Convert map to array and sort by date
      let result = Array.from(dataMap.values());
      
      // Ensure data for missing periods
      if (period === "Monthly") {
        const months = [];
        for (let i = 0; i < 6; i++) {
          const date = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1);
          months.unshift(format(date, formatString));
        }
        
        result = months.map(month => {
          return dataMap.has(month) 
            ? dataMap.get(month) 
            : { name: month, income: 0, expense: 0 };
        });
      }
      
      return result;
    };
    
    setChartData(processData());
  }, [transactions, period]);
  
  if (error) {
    return <div className="text-red-500">Failed to load financial data. Please try again later.</div>;
  }
  
  const formatCurrency = (value: number) => {
    return `Rp ${value.toLocaleString('id-ID')}`;
  };
  
  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-bold text-gray-900">Financial Overview</h3>
        <div className="flex space-x-2">
          <Button 
            variant={period === "Monthly" ? "default" : "ghost"} 
            size="sm"
            onClick={() => setPeriod("Monthly")}
            className="text-sm"
          >
            Monthly
          </Button>
          <Button 
            variant={period === "Quarterly" ? "default" : "ghost"} 
            size="sm"
            onClick={() => setPeriod("Quarterly")}
            className="text-sm"
          >
            Quarterly
          </Button>
          <Button 
            variant={period === "Yearly" ? "default" : "ghost"} 
            size="sm"
            onClick={() => setPeriod("Yearly")}
            className="text-sm"
          >
            Yearly
          </Button>
        </div>
      </div>
      
      <div className="h-64">
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <Skeleton className="h-full w-full" />
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={chartData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis 
                tickFormatter={(value) => `Rp ${(value / 1000000).toFixed(1)}M`}
              />
              <Tooltip formatter={(value) => formatCurrency(Number(value))} />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="income" 
                name="Income" 
                stroke="#6d28d9" 
                activeDot={{ r: 8 }} 
                strokeWidth={2} 
              />
              <Line 
                type="monotone" 
                dataKey="expense" 
                name="Expenses" 
                stroke="#ef4444" 
                strokeWidth={2} 
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </>
  );
};

export default FinanceChart;
