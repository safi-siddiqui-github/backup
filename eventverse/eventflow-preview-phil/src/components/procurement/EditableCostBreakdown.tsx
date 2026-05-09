import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Edit3, Trash2, Save, X } from "lucide-react";
import type { ProposalLineItem, NegotiationLineItemEdit } from "./types";

interface EditableCostBreakdownProps {
  originalItems: ProposalLineItem[];
  onEditsChange: (edits: NegotiationLineItemEdit[]) => void;
}

const EditableCostBreakdown = ({ originalItems, onEditsChange }: EditableCostBreakdownProps) => {
  const [edits, setEdits] = useState<NegotiationLineItemEdit[]>([]);
  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<ProposalLineItem | null>(null);
  const [editReason, setEditReason] = useState("");

  const handleStartEdit = (item: ProposalLineItem) => {
    setEditingItemId(item.id);
    setEditForm({ ...item });
    
    // Pre-populate reason if this item was already edited
    const existingEdit = edits.find(edit => edit.originalItem.id === item.id);
    setEditReason(existingEdit?.reason || "");
  };

  const handleSaveEdit = () => {
    if (!editForm || !editReason.trim()) return;

    const newEdit: NegotiationLineItemEdit = {
      originalItem: originalItems.find(item => item.id === editForm.id)!,
      proposedItem: { 
        ...editForm, 
        total: editForm.quantity * editForm.unitPrice 
      },
      reason: editReason
    };

    const updatedEdits = edits.filter(edit => edit.originalItem.id !== editForm.id);
    updatedEdits.push(newEdit);
    
    setEdits(updatedEdits);
    onEditsChange(updatedEdits);
    
    setEditingItemId(null);
    setEditForm(null);
    setEditReason("");
  };

  const handleCancelEdit = () => {
    setEditingItemId(null);
    setEditForm(null);
    setEditReason("");
  };

  const handleRemoveEdit = (itemId: string) => {
    const updatedEdits = edits.filter(edit => edit.originalItem.id !== itemId);
    setEdits(updatedEdits);
    onEditsChange(updatedEdits);
  };

  const getDisplayItem = (originalItem: ProposalLineItem) => {
    const edit = edits.find(edit => edit.originalItem.id === originalItem.id);
    return edit ? edit.proposedItem : originalItem;
  };

  const isItemEdited = (itemId: string) => {
    return edits.some(edit => edit.originalItem.id === itemId);
  };

  const calculateTotals = () => {
    const originalTotal = originalItems.reduce((sum, item) => sum + item.total, 0);
    const proposedTotal = originalItems.reduce((sum, originalItem) => {
      const displayItem = getDisplayItem(originalItem);
      return sum + displayItem.total;
    }, 0);
    return { originalTotal, proposedTotal };
  };

  const { originalTotal, proposedTotal } = calculateTotals();

  const hasEdits = edits.length > 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Cost Breakdown - Negotiation Mode</span>
          <Badge variant="outline" className="bg-orange-50 text-orange-700">
            {edits.length} item{edits.length !== 1 ? 's' : ''} modified
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b">
                <th className="text-left p-3 font-medium text-gray-600">
                  Item & Description
                  {hasEdits && <div className="text-xs text-gray-500 mt-1">Original → Proposed</div>}
                </th>
                <th className="text-center p-3 font-medium text-gray-600">
                  Quantity
                  {hasEdits && <div className="text-xs text-gray-500 mt-1">Orig → Prop</div>}
                </th>
                <th className="text-center p-3 font-medium text-gray-600">
                  Unit Price
                  {hasEdits && <div className="text-xs text-gray-500 mt-1">Orig → Prop</div>}
                </th>
                <th className="text-center p-3 font-medium text-gray-600">
                  Total
                  {hasEdits && <div className="text-xs text-gray-500 mt-1">Orig → Prop</div>}
                </th>
                <th className="text-center p-3 font-medium text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {originalItems.map((originalItem) => {
                const displayItem = getDisplayItem(originalItem);
                const isEditing = editingItemId === originalItem.id;
                const edited = isItemEdited(originalItem.id);
                const editData = edits.find(edit => edit.originalItem.id === originalItem.id);

                return (
                  <tr key={originalItem.id} className={`border-b ${edited ? 'bg-blue-50' : ''}`}>
                    <td className="p-3">
                      {!isEditing ? (
                        <div className="space-y-1">
                          <div className="flex items-center gap-3">
                            <div className="flex-1">
                              <div className="font-medium">{originalItem.name}</div>
                              <div className="text-sm text-gray-600">{originalItem.description}</div>
                            </div>
                            {edited && (
                              <div className="flex-1 border-l pl-3">
                                <div className="font-medium text-blue-700">{displayItem.name}</div>
                                <div className="text-sm text-blue-600">{displayItem.description}</div>
                              </div>
                            )}
                          </div>
                          {edited && editData && (
                            <div className="text-xs text-blue-600 bg-blue-100 p-2 rounded mt-2">
                              <strong>Edit reason:</strong> {editData.reason}
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <div className="text-xs text-gray-500 mb-1">Original</div>
                              <div className="font-medium text-gray-700">{originalItem.name}</div>
                              <div className="text-sm text-gray-600">{originalItem.description}</div>
                            </div>
                            <div>
                              <div className="text-xs text-blue-600 mb-1">Proposed</div>
                              <Input
                                value={editForm?.name || ''}
                                onChange={(e) => setEditForm(prev => prev ? { ...prev, name: e.target.value } : null)}
                                className="h-8 mb-1"
                                placeholder="Item name"
                              />
                              <Input
                                value={editForm?.description || ''}
                                onChange={(e) => setEditForm(prev => prev ? { ...prev, description: e.target.value } : null)}
                                className="h-8"
                                placeholder="Description"
                              />
                            </div>
                          </div>
                          <div>
                            <Label className="text-xs">Reason for Change *</Label>
                            <Input
                              placeholder="Explain why you're making this change..."
                              value={editReason}
                              onChange={(e) => setEditReason(e.target.value)}
                              className="mt-1"
                            />
                          </div>
                        </div>
                      )}
                    </td>
                    <td className="p-3 text-center">
                      {!isEditing ? (
                        <div className="flex items-center justify-center gap-3">
                          <div>{originalItem.quantity}</div>
                          {edited && (
                            <>
                              <div className="text-gray-400">→</div>
                              <div className="text-blue-700 font-medium">{displayItem.quantity}</div>
                            </>
                          )}
                        </div>
                      ) : (
                        <div className="flex items-center justify-center gap-3">
                          <div className="text-gray-700">{originalItem.quantity}</div>
                          <div className="text-gray-400">→</div>
                          <Input
                            type="number"
                            value={editForm?.quantity || 0}
                            onChange={(e) => setEditForm(prev => prev ? { ...prev, quantity: parseInt(e.target.value) || 0 } : null)}
                            className="h-8 w-16"
                          />
                        </div>
                      )}
                    </td>
                    <td className="p-3 text-center">
                      {!isEditing ? (
                        <div className="flex items-center justify-center gap-3">
                          <div>${originalItem.unitPrice.toLocaleString()}</div>
                          {edited && (
                            <>
                              <div className="text-gray-400">→</div>
                              <div className="text-blue-700 font-medium">${displayItem.unitPrice.toLocaleString()}</div>
                            </>
                          )}
                        </div>
                      ) : (
                        <div className="flex items-center justify-center gap-3">
                          <div className="text-gray-700">${originalItem.unitPrice.toLocaleString()}</div>
                          <div className="text-gray-400">→</div>
                          <Input
                            type="number"
                            value={editForm?.unitPrice || 0}
                            onChange={(e) => setEditForm(prev => prev ? { ...prev, unitPrice: parseFloat(e.target.value) || 0 } : null)}
                            className="h-8 w-20"
                            step="0.01"
                          />
                        </div>
                      )}
                    </td>
                    <td className="p-3 text-center">
                      {!isEditing ? (
                        <div className="flex items-center justify-center gap-3">
                          <div className="font-semibold">${originalItem.total.toLocaleString()}</div>
                          {edited && (
                            <>
                              <div className="text-gray-400">→</div>
                              <div className="text-blue-700 font-semibold">${displayItem.total.toLocaleString()}</div>
                            </>
                          )}
                        </div>
                      ) : (
                        <div className="flex items-center justify-center gap-3">
                          <div className="text-gray-700 font-semibold">${originalItem.total.toLocaleString()}</div>
                          <div className="text-gray-400">→</div>
                          <div className="text-blue-700 font-semibold">
                            ${((editForm?.quantity || 0) * (editForm?.unitPrice || 0)).toLocaleString()}
                          </div>
                        </div>
                      )}
                    </td>
                    <td className="p-3 text-center">
                      <div className="flex justify-center gap-1">
                        {!isEditing ? (
                          <>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleStartEdit(originalItem)}
                            >
                              <Edit3 className="w-3 h-3" />
                            </Button>
                            {edited && (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleRemoveEdit(originalItem.id)}
                              >
                                <X className="w-3 h-3" />
                              </Button>
                            )}
                          </>
                        ) : (
                          <>
                            <Button size="sm" onClick={handleSaveEdit} disabled={!editReason.trim()}>
                              <Save className="w-3 h-3" />
                            </Button>
                            <Button size="sm" variant="outline" onClick={handleCancelEdit}>
                              <X className="w-3 h-3" />
                            </Button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

          {/* Totals */}
          <div className="border-t pt-4 space-y-2">
            <div className="flex justify-between items-center">
              <span>Original Total:</span>
              <span className={originalTotal !== proposedTotal ? 'line-through text-gray-500' : 'font-semibold'}>
                ${originalTotal.toLocaleString()}
              </span>
            </div>
            {originalTotal !== proposedTotal && (
              <div className="flex justify-between items-center text-blue-700 font-semibold">
                <span>Proposed Total:</span>
                <span>${proposedTotal.toLocaleString()}</span>
              </div>
            )}
            <div className="flex justify-between items-center text-lg font-bold border-t pt-2">
              <span>Difference:</span>
              <span className={proposedTotal > originalTotal ? 'text-red-600' : proposedTotal < originalTotal ? 'text-green-600' : ''}>
                ${Math.abs(proposedTotal - originalTotal).toLocaleString()} 
                {proposedTotal > originalTotal ? ' increase' : proposedTotal < originalTotal ? ' decrease' : ''}
              </span>
            </div>
          </div>
      </CardContent>
    </Card>
  );
};

export default EditableCostBreakdown;