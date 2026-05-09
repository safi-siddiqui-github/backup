import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  Edit, 
  Trash2, 
  Receipt, 
  Calendar,
  CheckCircle,
  Clock,
  AlertCircle,
  DollarSign
} from "lucide-react";
import { format } from "date-fns";

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
  onUpdateExpense
}: ExpenseTrackerProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [sortBy, setSortBy] = useState("date");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const getStatusIcon = (status: Expense["status"]) => {
    switch (status) {
      case "paid": return <CheckCircle className="w-4 h-4 text-green-600" />;
      case "approved": return <Clock className="w-4 h-4 text-blue-600" />;
      case "overdue": return <AlertCircle className="w-4 h-4 text-red-600" />;
      default: return <Clock className="w-4 h-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status: Expense["status"]) => {
    switch (status) {
      case "paid": return "bg-green-100 text-green-800";
      case "approved": return "bg-blue-100 text-blue-800";
      case "overdue": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const filteredExpenses = expenses
    .filter(expense => {
      const matchesSearch = expense.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           expense.vendor?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = filterCategory === "all" || expense.category === filterCategory;
      const matchesStatus = filterStatus === "all" || expense.status === filterStatus;
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

  const handleStatusChange = (expenseId: number, newStatus: Expense["status"]) => {
    onUpdateExpense(expenseId, { status: newStatus });
  };

  const categories = ["all", ...budgetCategories.map(cat => cat.name)];
  const statuses = ["all", "planned", "approved", "paid", "overdue"];

  return (
    <div className="space-y-4">
      {/* Filters and Controls */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
            <Input
              placeholder="Search expenses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-64"
            />
          </div>
          
          <Select value={filterCategory} onValueChange={setFilterCategory}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map(category => (
                <SelectItem key={category} value={category}>
                  {category === "all" ? "All Categories" : category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-36">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              {statuses.map(status => (
                <SelectItem key={status} value={status}>
                  {status === "all" ? "All Status" : status.charAt(0).toUpperCase() + status.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={`${sortBy}-${sortOrder}`} onValueChange={(value) => {
            const [field, order] = value.split('-');
            setSortBy(field);
            setSortOrder(order as "asc" | "desc");
          }}>
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
          <Plus className="w-4 h-4 mr-2" />
          Add Expense
        </Button>
      </div>

      {/* Expense List */}
      <div className="grid gap-4">
        {filteredExpenses.map((expense) => (
          <Card key={expense.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="font-medium">{expense.description}</h4>
                    <Badge variant="outline" className="text-xs">
                      {expense.category}
                    </Badge>
                    {expense.subcategory && (
                      <Badge variant="outline" className="text-xs bg-gray-50">
                        {expense.subcategory}
                      </Badge>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {format(expense.date, "MMM d, yyyy")}
                    </span>
                    {expense.vendor && (
                      <span>Vendor: {expense.vendor}</span>
                    )}
                    {expense.dueDate && expense.status !== "paid" && (
                      <span className="flex items-center gap-1 text-orange-600">
                        <Clock className="w-3 h-3" />
                        Due: {format(expense.dueDate, "MMM d")}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="text-xl font-bold">${expense.amount.toLocaleString()}</div>
                    <div className="flex items-center gap-2">
                      <Select
                        value={expense.status}
                        onValueChange={(value) => handleStatusChange(expense.id, value as Expense["status"])}
                      >
                        <SelectTrigger className={`h-7 w-24 text-xs ${getStatusColor(expense.status)}`}>
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
                      <Button variant="ghost" size="sm">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => onEditExpense(expense)}>
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                      </DropdownMenuItem>
                      {expense.receipt && (
                        <DropdownMenuItem>
                          <Receipt className="w-4 h-4 mr-2" />
                          View Receipt
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuItem 
                        onClick={() => onDeleteExpense(expense.id)}
                        className="text-red-600"
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
              
              {expense.notes && (
                <div className="mt-3 p-2 bg-gray-50 rounded text-sm text-gray-600">
                  <strong>Notes:</strong> {expense.notes}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredExpenses.length === 0 && (
        <div className="text-center py-12">
          <DollarSign className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-600 mb-2">No expenses found</h3>
          <p className="text-gray-500 mb-4">Start tracking your event expenses</p>
          <Button onClick={onAddExpense}>
            <Plus className="w-4 h-4 mr-2" />
            Add Your First Expense
          </Button>
        </div>
      )}
    </div>
  );
};

export default ExpenseTracker;
