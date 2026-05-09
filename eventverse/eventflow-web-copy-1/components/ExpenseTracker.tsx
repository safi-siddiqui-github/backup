"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns";
import {
  AlertCircle,
  Calendar,
  CheckCircle,
  Clock,
  DollarSign,
  Edit,
  MoreVertical,
  Plus,
  Receipt,
  Search,
  Trash2,
} from "lucide-react";
import { useState } from "react";

// Define types locally
interface Expense {
  id: number;
  category: string;
  subcategory?: string;
  vendor?: string;
  description: string;
  amount: number;
  date: Date;
  status: "planned" | "approved" | "paid" | "overdue";
  paymentMethod?: string;
  dueDate?: Date;
  notes?: string;
  receipt?: string;
}

interface Vendor {
  id: number;
  name: string;
  category: string;
  contact: string;
  rating: number;
  description: string;
}

interface BudgetCategory {
  id: string;
  name: string;
  planned: number;
  color: string;
  subcategories?: { name: string; planned: number; spent: number }[];
}

interface ExpenseTrackerProps {
  expenses: Expense[];
  vendors: Vendor[];
  budgetCategories: BudgetCategory[];
  onAddExpense: () => void;
  onEditExpense: (expense: Expense) => void;
  onDeleteExpense: (id: number) => void;
  onUpdateExpense: (id: number, updates: Partial<Expense>) => void;
}

const ExpenseTracker = ({
  expenses,
  vendors,
  budgetCategories,
  onAddExpense,
  onEditExpense,
  onDeleteExpense,
  onUpdateExpense,
}: ExpenseTrackerProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [sortBy, setSortBy] = useState("date");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const getStatusIcon = (status: Expense["status"]) => {
    switch (status) {
      case "paid":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "approved":
        return <Clock className="h-4 w-4 text-blue-600" />;
      case "overdue":
        return <AlertCircle className="h-4 w-4 text-red-600" />;
      default:
        return <Clock className="h-4 w-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status: Expense["status"]) => {
    switch (status) {
      case "paid":
        return "bg-green-100 text-green-800";
      case "approved":
        return "bg-blue-100 text-blue-800";
      case "overdue":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const filteredExpenses = expenses
    .filter((expense) => {
      const matchesSearch =
        expense.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        expense.vendor?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        filterCategory === "all" || expense.category === filterCategory;
      const matchesStatus =
        filterStatus === "all" || expense.status === filterStatus;
      return matchesSearch && matchesCategory && matchesStatus;
    })
    .sort((a, b) => {
      let comparison = 0;
      switch (sortBy) {
        case "amount":
          comparison = a.amount - b.amount;
          break;
        case "date":
          comparison = a.date.getTime() - b.date.getTime();
          break;
        case "category":
          comparison = a.category.localeCompare(b.category);
          break;
        default:
          comparison = 0;
      }
      return sortOrder === "desc" ? -comparison : comparison;
    });

  const handleStatusChange = (
    expenseId: number,
    newStatus: Expense["status"],
  ) => {
    onUpdateExpense(expenseId, { status: newStatus });
  };

  const categories = ["all", ...budgetCategories.map((cat) => cat.name)];
  const statuses = ["all", "planned", "approved", "paid", "overdue"];

  return (
    <div className="space-y-4">
      {/* Filters and Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute top-3 left-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search expenses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-64 pl-10"
            />
          </div>

          <Select
            value={filterCategory}
            onValueChange={setFilterCategory}
          >
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem
                  key={category}
                  value={category}
                >
                  {category === "all" ? "All Categories" : category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={filterStatus}
            onValueChange={setFilterStatus}
          >
            <SelectTrigger className="w-36">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              {statuses.map((status) => (
                <SelectItem
                  key={status}
                  value={status}
                >
                  {status === "all"
                    ? "All Status"
                    : status.charAt(0).toUpperCase() + status.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={`${sortBy}-${sortOrder}`}
            onValueChange={(value) => {
              const [field, order] = value.split("-");
              setSortBy(field);
              setSortOrder(order as "asc" | "desc");
            }}
          >
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="date-desc">Date (Newest)</SelectItem>
              <SelectItem value="date-asc">Date (Oldest)</SelectItem>
              <SelectItem value="amount-desc">Amount (High)</SelectItem>
              <SelectItem value="amount-low">Amount (Low)</SelectItem>
              <SelectItem value="category-asc">Category (A-Z)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button onClick={onAddExpense}>
          <Plus className="mr-2 h-4 w-4" />
          Add Expense
        </Button>
      </div>

      {/* Expense List */}
      <div className="grid gap-4">
        {filteredExpenses.map((expense) => (
          <Card
            key={expense.id}
            className="transition-shadow hover:shadow-md"
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="mb-2 flex items-center gap-3">
                    <h4 className="font-medium">{expense.description}</h4>
                    <Badge
                      variant="outline"
                      className="text-xs"
                    >
                      {expense.category}
                    </Badge>
                    {expense.subcategory && (
                      <Badge
                        variant="outline"
                        className="bg-gray-50 text-xs"
                      >
                        {expense.subcategory}
                      </Badge>
                    )}
                  </div>

                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {format(expense.date, "MMM d, yyyy")}
                    </span>
                    {expense.vendor && <span>Vendor: {expense.vendor}</span>}
                    {expense.dueDate && expense.status !== "paid" && (
                      <span className="flex items-center gap-1 text-orange-600">
                        <Clock className="h-3 w-3" />
                        Due: {format(expense.dueDate, "MMM d")}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="text-xl font-bold">
                      ${expense.amount.toLocaleString()}
                    </div>
                    <div className="flex items-center gap-2">
                      <Select
                        value={expense.status}
                        onValueChange={(value) =>
                          handleStatusChange(
                            expense.id,
                            value as Expense["status"],
                          )
                        }
                      >
                        <SelectTrigger
                          className={`h-7 w-24 text-xs ${getStatusColor(expense.status)}`}
                        >
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="planned">Planned</SelectItem>
                          <SelectItem value="approved">Approved</SelectItem>
                          <SelectItem value="paid">Paid</SelectItem>
                          <SelectItem value="overdue">Overdue</SelectItem>
                        </SelectContent>
                      </Select>
                      {getStatusIcon(expense.status)}
                    </div>
                  </div>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                      >
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => onEditExpense(expense)}>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      {expense.receipt && (
                        <DropdownMenuItem>
                          <Receipt className="mr-2 h-4 w-4" />
                          View Receipt
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuItem
                        onClick={() => onDeleteExpense(expense.id)}
                        className="text-red-600"
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>

              {expense.notes && (
                <div className="mt-3 rounded bg-gray-50 p-2 text-sm text-gray-600">
                  <strong>Notes:</strong> {expense.notes}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredExpenses.length === 0 && (
        <div className="py-12 text-center">
          <DollarSign className="mx-auto mb-4 h-12 w-12 text-gray-400" />
          <h3 className="mb-2 text-lg font-medium text-gray-600">
            No expenses found
          </h3>
          <p className="mb-4 text-gray-500">
            Start tracking your event expenses
          </p>
          <Button onClick={onAddExpense}>
            <Plus className="mr-2 h-4 w-4" />
            Add Your First Expense
          </Button>
        </div>
      )}
    </div>
  );
};

export default ExpenseTracker;
