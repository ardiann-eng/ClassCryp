import { useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { insertTransactionSchema } from "@shared/schema";
import { z } from "zod";
import { apiRequest, queryClient } from "@/lib/queryClient";

const transactionSchema = insertTransactionSchema.extend({
  amount: z.number().positive("Amount must be positive"),
  date: z.string().nonempty("Date is required")
});

type TransactionFormValues = z.infer<typeof transactionSchema>;

const TransactionForm = () => {
  const [transactionType, setTransactionType] = useState<"income" | "expense">("income");
  const { toast } = useToast();
  
  const form = useForm<TransactionFormValues>({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      amount: undefined,
      description: "",
      category: "",
      type: "income",
      date: new Date().toISOString().substring(0, 10)
    }
  });
  
  const { mutate, isPending } = useMutation({
    mutationFn: async (data: TransactionFormValues) => {
      const response = await apiRequest("POST", "/api/transactions", {
        ...data,
        date: new Date(data.date),
        type: transactionType
      });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/transactions"] });
      queryClient.invalidateQueries({ queryKey: ["/api/transactions/summary"] });
      toast({
        title: "Transaction added",
        description: "Your transaction has been recorded successfully.",
      });
      form.reset({
        amount: undefined,
        description: "",
        category: "",
        type: transactionType,
        date: new Date().toISOString().substring(0, 10)
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to add transaction. Please try again.",
        variant: "destructive",
      });
      console.error("Transaction error:", error);
    }
  });
  
  const onSubmit = useCallback((data: TransactionFormValues) => {
    mutate({ ...data, type: transactionType });
  }, [mutate, transactionType]);
  
  const handleTypeChange = (type: "income" | "expense") => {
    setTransactionType(type);
    form.setValue("type", type);
  };
  
  const getIncomeCategories = () => [
    "Monthly Dues",
    "Event Fee",
    "Donation",
    "Fundraising",
    "Other Income"
  ];
  
  const getExpenseCategories = () => [
    "Study Materials",
    "Events & Activities",
    "Office Supplies",
    "Transportation",
    "Miscellaneous"
  ];
  
  return (
    <>
      <h3 className="text-lg font-bold text-gray-900 mb-4">Add New Transaction</h3>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* Transaction Type */}
          <div>
            <FormLabel>Transaction Type</FormLabel>
            <div className="flex space-x-2 mt-1">
              <Button
                type="button"
                className={`flex-1 ${
                  transactionType === "income"
                    ? "bg-green-100 text-green-800 hover:bg-green-200"
                    : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                }`}
                variant="ghost"
                onClick={() => handleTypeChange("income")}
              >
                Income
              </Button>
              <Button
                type="button"
                className={`flex-1 ${
                  transactionType === "expense"
                    ? "bg-red-100 text-red-800 hover:bg-red-200"
                    : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                }`}
                variant="ghost"
                onClick={() => handleTypeChange("expense")}
              >
                Expense
              </Button>
            </div>
          </div>
          
          {/* Amount */}
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Amount (Rp)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="0"
                    {...field}
                    onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          {/* Category */}
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {(transactionType === "income" ? getIncomeCategories() : getExpenseCategories()).map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          
          {/* Date */}
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          {/* Description */}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Notes</FormLabel>
                <FormControl>
                  <Textarea rows={2} placeholder="Transaction details..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full bg-primary-600 hover:bg-primary-700"
            disabled={isPending}
          >
            {isPending ? "Adding..." : "Add Transaction"}
          </Button>
        </form>
      </Form>
    </>
  );
};

export default TransactionForm;
