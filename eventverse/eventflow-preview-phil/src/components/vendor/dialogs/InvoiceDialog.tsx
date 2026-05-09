
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, X, DollarSign } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface InvoiceDialogProps {
  children: React.ReactNode;
  clientId?: string;
}

interface InvoiceItem {
  description: string;
  quantity: number;
  rate: number;
  amount: number;
}

const InvoiceDialog = ({ children, clientId }: InvoiceDialogProps) => {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState<InvoiceItem[]>([
    { description: "", quantity: 1, rate: 0, amount: 0 }
  ]);
  const [invoice, setInvoice] = useState({
    client: clientId || "",
    invoiceNumber: `INV-${Date.now().toString().slice(-6)}`,
    dueDate: "",
    terms: "Net 30",
    taxRate: 8.5,
    notes: ""
  });
  const { toast } = useToast();

  const addItem = () => {
    setItems([...items, { description: "", quantity: 1, rate: 0, amount: 0 }]);
  };

  const removeItem = (index: number) => {
    if (items.length > 1) {
      setItems(items.filter((_, i) => i !== index));
    }
  };

  const updateItem = (index: number, field: keyof InvoiceItem, value: string | number) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], [field]: value };
    
    if (field === 'quantity' || field === 'rate') {
      newItems[index].amount = newItems[index].quantity * newItems[index].rate;
    }
    
    setItems(newItems);
  };

  const subtotal = items.reduce((sum, item) => sum + item.amount, 0);
  const taxAmount = subtotal * (invoice.taxRate / 100);
  const total = subtotal + taxAmount;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Creating invoice:", { ...invoice, items, subtotal, taxAmount, total });
    toast({
      title: "Invoice created",
      description: `Invoice ${invoice.invoiceNumber} has been created successfully.`,
    });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create Invoice</DialogTitle>
          <DialogDescription>
            Generate a professional invoice for your client
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label htmlFor="client">Client</Label>
              <Select value={invoice.client} onValueChange={(value) => setInvoice(prev => ({ ...prev, client: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select client" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sarah">Sarah Johnson</SelectItem>
                  <SelectItem value="elite">Elite Events Inc</SelectItem>
                  <SelectItem value="maria">Maria Rodriguez</SelectItem>
                  <SelectItem value="robert">Robert Chen</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="invoiceNumber">Invoice Number</Label>
              <Input
                id="invoiceNumber"
                value={invoice.invoiceNumber}
                onChange={(e) => setInvoice(prev => ({ ...prev, invoiceNumber: e.target.value }))}
                required
              />
            </div>
            
            <div>
              <Label htmlFor="dueDate">Due Date</Label>
              <Input
                id="dueDate"
                type="date"
                value={invoice.dueDate}
                onChange={(e) => setInvoice(prev => ({ ...prev, dueDate: e.target.value }))}
                required
              />
            </div>
          </div>
          
          <div>
            <div className="flex justify-between items-center mb-4">
              <Label>Invoice Items</Label>
              <Button type="button" onClick={addItem} size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Add Item
              </Button>
            </div>
            
            <div className="space-y-3">
              {items.map((item, index) => (
                <div key={index} className="grid grid-cols-12 gap-2 items-end">
                  <div className="col-span-5">
                    <Label className="text-sm">Description</Label>
                    <Input
                      value={item.description}
                      onChange={(e) => updateItem(index, 'description', e.target.value)}
                      placeholder="Service description"
                      required
                    />
                  </div>
                  <div className="col-span-2">
                    <Label className="text-sm">Quantity</Label>
                    <Input
                      type="number"
                      value={item.quantity}
                      onChange={(e) => updateItem(index, 'quantity', parseFloat(e.target.value) || 0)}
                      min="1"
                      step="1"
                      required
                    />
                  </div>
                  <div className="col-span-2">
                    <Label className="text-sm">Rate ($)</Label>
                    <Input
                      type="number"
                      value={item.rate}
                      onChange={(e) => updateItem(index, 'rate', parseFloat(e.target.value) || 0)}
                      min="0"
                      step="0.01"
                      required
                    />
                  </div>
                  <div className="col-span-2">
                    <Label className="text-sm">Amount</Label>
                    <Input
                      value={`$${item.amount.toFixed(2)}`}
                      disabled
                      className="bg-gray-50"
                    />
                  </div>
                  <div className="col-span-1">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => removeItem(index)}
                      disabled={items.length === 1}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="terms">Payment Terms</Label>
                <Select value={invoice.terms} onValueChange={(value) => setInvoice(prev => ({ ...prev, terms: value }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Net 15">Net 15</SelectItem>
                    <SelectItem value="Net 30">Net 30</SelectItem>
                    <SelectItem value="Due on receipt">Due on receipt</SelectItem>
                    <SelectItem value="50% deposit">50% deposit required</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  value={invoice.notes}
                  onChange={(e) => setInvoice(prev => ({ ...prev, notes: e.target.value }))}
                  placeholder="Additional notes or terms..."
                  rows={3}
                />
              </div>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-3">Invoice Summary</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax ({invoice.taxRate}%):</span>
                  <span>${taxAmount.toFixed(2)}</span>
                </div>
                <hr className="my-2" />
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total:</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
              
              <div className="mt-4">
                <Label htmlFor="taxRate">Tax Rate (%)</Label>
                <Input
                  id="taxRate"
                  type="number"
                  value={invoice.taxRate}
                  onChange={(e) => setInvoice(prev => ({ ...prev, taxRate: parseFloat(e.target.value) || 0 }))}
                  min="0"
                  max="100"
                  step="0.1"
                />
              </div>
            </div>
          </div>
          
          <div className="flex gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => setOpen(false)} className="flex-1">
              Cancel
            </Button>
            <Button type="button" variant="outline" className="flex-1">
              Save Draft
            </Button>
            <Button type="submit" className="flex-1">
              <DollarSign className="w-4 h-4 mr-2" />
              Create & Send
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default InvoiceDialog;
