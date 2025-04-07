import { useState, useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { Download } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  ChartData,
  ChartOptions
} from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';
import { type Transaction } from "@shared/schema";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

export default function FinanceCharts() {
  const [timeFrame, setTimeFrame] = useState<'weekly' | 'monthly'>('monthly');
  const [incomeExpenseData, setIncomeExpenseData] = useState<ChartData<'bar'> | null>(null);
  const [expenseCategoriesData, setExpenseCategoriesData] = useState<ChartData<'doughnut'> | null>(null);
  
  const barChartRef = useRef<ChartJS<"bar">>(null);
  const doughnutChartRef = useRef<ChartJS<"doughnut">>(null);
  
  // Fetch transactions for charts
  const { data: transactions, isLoading } = useQuery<Transaction[]>({
    queryKey: ['/api/transactions'],
  });
  
  // Prepare chart data when transactions are loaded
  useEffect(() => {
    if (!transactions) return;
    
    // Prepare data for income vs expense chart
    const prepareIncomeExpenseData = () => {
      // For demo purposes, using predefined months
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'];
      
      // Generate random data for each month
      const incomeData = months.map(() => Math.floor(Math.random() * 1500000) + 800000);
      const expenseData = months.map(() => Math.floor(Math.random() * 1000000) + 500000);
      
      return {
        labels: months,
        datasets: [
          {
            label: 'Income',
            data: incomeData,
            backgroundColor: 'hsl(263, 60%, 42%)',
            borderColor: 'hsl(263, 60%, 42%)',
            borderWidth: 1
          },
          {
            label: 'Expenses',
            data: expenseData,
            backgroundColor: 'hsl(48, 81%, 61%)',
            borderColor: 'hsl(48, 81%, 61%)',
            borderWidth: 1
          }
        ]
      };
    };
    
    // Prepare data for expense categories chart
    const prepareExpenseCategoriesData = () => {
      // Count transactions by category for expenses only
      const categories: Record<string, number> = {};
      
      transactions
        .filter(t => t.type === 'expense')
        .forEach(t => {
          if (!categories[t.category]) {
            categories[t.category] = 0;
          }
          categories[t.category] += Number(t.amount);
        });
      
      const categoryLabels = Object.keys(categories);
      const categoryData = Object.values(categories);
      
      // Generate colors for each category
      const colors = [
        'hsl(263, 60%, 42%)',
        'hsl(263, 60%, 52%)',
        'hsl(263, 60%, 62%)',
        'hsl(263, 60%, 72%)',
        'hsl(48, 81%, 61%)',
        'hsl(48, 81%, 71%)'
      ];
      
      return {
        labels: categoryLabels,
        datasets: [{
          data: categoryData,
          backgroundColor: colors.slice(0, categoryLabels.length),
          borderWidth: 1
        }]
      };
    };
    
    setIncomeExpenseData(prepareIncomeExpenseData());
    setExpenseCategoriesData(prepareExpenseCategoriesData());
  }, [transactions]);
  
  // Chart options
  const barChartOptions: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(value) {
            return `Rp ${Number(value) / 1000000}M`;
          }
        }
      }
    }
  };
  
  const doughnutChartOptions: ChartOptions<'doughnut'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right'
      }
    }
  };
  
  // Handle chart export
  const handleExportChart = () => {
    if (doughnutChartRef.current) {
      const url = doughnutChartRef.current.toBase64Image();
      const link = document.createElement('a');
      link.download = 'expense-categories-chart.png';
      link.href = url;
      link.click();
    }
  };
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
      {/* Income vs Expenses Chart */}
      <Card className="border border-gray-200 shadow-sm">
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold text-gray-800">Income vs Expenses</h3>
            <div className="inline-flex rounded-md shadow-sm">
              <Button 
                variant={timeFrame === 'weekly' ? 'default' : 'outline'}
                size="sm"
                className="rounded-l-lg rounded-r-none"
                onClick={() => setTimeFrame('weekly')}
              >
                Weekly
              </Button>
              <Button 
                variant={timeFrame === 'monthly' ? 'default' : 'outline'}
                size="sm"
                className="rounded-r-lg rounded-l-none"
                onClick={() => setTimeFrame('monthly')}
              >
                Monthly
              </Button>
            </div>
          </div>
          <div className="h-64">
            {isLoading || !incomeExpenseData ? (
              <Skeleton className="h-full w-full" />
            ) : (
              <Bar 
                ref={barChartRef}
                data={incomeExpenseData} 
                options={barChartOptions} 
              />
            )}
          </div>
        </CardContent>
      </Card>
      
      {/* Expense Categories Chart */}
      <Card className="border border-gray-200 shadow-sm">
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold text-gray-800">Expense Categories</h3>
            <Button 
              variant="ghost" 
              size="sm"
              className="text-primary hover:text-primary/80 text-sm font-medium"
              onClick={handleExportChart}
            >
              <Download className="h-4 w-4 mr-1" /> Export
            </Button>
          </div>
          <div className="h-64">
            {isLoading || !expenseCategoriesData ? (
              <Skeleton className="h-full w-full" />
            ) : (
              <Doughnut 
                ref={doughnutChartRef}
                data={expenseCategoriesData} 
                options={doughnutChartOptions} 
              />
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
