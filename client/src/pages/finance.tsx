import { useEffect } from "react";
import { useLocation } from "wouter";
import { Card } from "@/components/ui/card";
import FinancialOverview from "@/components/finance/FinancialOverview";
import FinanceCharts from "@/components/finance/FinanceCharts";
import TransactionTable from "@/components/finance/TransactionTable";
import TransactionForm from "@/components/finance/TransactionForm";

export default function FinancePage() {
  const [location] = useLocation();
  
  // Set document title
  useEffect(() => {
    document.title = "Finance | CryptGen";
  }, []);
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
        <h2 className="text-3xl font-bold text-primary mb-8 font-accent">Class Finance</h2>
        
        {/* Financial Overview Cards */}
        <FinancialOverview />
        
        {/* Charts Section */}
        <FinanceCharts />
        
        {/* Financial Transactions Table and Form */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <TransactionTable />
          </div>
          
          <div>
            <TransactionForm />
          </div>
        </div>
      </div>
    </div>
  );
}
