import { Card } from "@/components/ui/card";
import FinanceSummary from "@/components/finance/FinanceSummary";
import FinanceChart from "@/components/finance/FinanceChart";
import TransactionForm from "@/components/finance/TransactionForm";
import TransactionHistory from "@/components/finance/TransactionHistory";

const Finance = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Summary Cards */}
      <div className="lg:col-span-3">
        <FinanceSummary />
      </div>
      
      {/* Charts Section */}
      <div className="lg:col-span-2">
        <Card className="bg-white rounded-xl shadow-md p-6 h-full">
          <FinanceChart />
        </Card>
      </div>
      
      {/* Expense Categories */}
      <div>
        <Card className="bg-white rounded-xl shadow-md p-6 h-full">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Expense Categories</h3>
          
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium">Events & Activities</span>
                <span className="text-sm font-medium">Rp 650,000</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-primary-600 h-2 rounded-full" style={{ width: "55%" }}></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium">Study Materials</span>
                <span className="text-sm font-medium">Rp 325,000</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-yellow-400 h-2 rounded-full" style={{ width: "25%" }}></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium">Office Supplies</span>
                <span className="text-sm font-medium">Rp 190,000</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: "15%" }}></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium">Miscellaneous</span>
                <span className="text-sm font-medium">Rp 100,000</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-red-500 h-2 rounded-full" style={{ width: "8%" }}></div>
              </div>
            </div>
          </div>
        </Card>
      </div>
      
      {/* Transaction Form and History */}
      <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* New Transaction Form */}
        <div>
          <Card className="bg-white rounded-xl shadow-md p-6">
            <TransactionForm />
          </Card>
        </div>
        
        {/* Recent Transactions */}
        <div className="md:col-span-2">
          <Card className="bg-white rounded-xl shadow-md p-6">
            <TransactionHistory />
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Finance;
