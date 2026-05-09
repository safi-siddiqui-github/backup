import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Edit3, Trash2, Save, X, Check } from "lucide-react";
import type { NegotiationDeliverableEdit } from "./types";

interface EditableDeliverablesProps {
  originalDeliverables: string[];
  onEditsChange: (edits: NegotiationDeliverableEdit[]) => void;
}

const EditableDeliverables = ({ originalDeliverables, onEditsChange }: EditableDeliverablesProps) => {
  const [edits, setEdits] = useState<NegotiationDeliverableEdit[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editForm, setEditForm] = useState({ text: '', reason: '' });
  const [newDeliverable, setNewDeliverable] = useState({ text: '', reason: '' });
  const [showAddForm, setShowAddForm] = useState(false);

  const handleStartEdit = (index: number, currentText: string) => {
    setEditingIndex(index);
    
    // Check if this deliverable was already edited
    const existingEdit = edits.find(edit => 
      edit.type === 'modified' && edit.originalText === originalDeliverables[index]
    );
    
    setEditForm({
      text: existingEdit ? existingEdit.proposedText : currentText,
      reason: existingEdit ? existingEdit.reason : ''
    });
  };

  const handleSaveEdit = () => {
    if (!editForm.text.trim() || !editForm.reason.trim() || editingIndex === null) return;

    const originalText = originalDeliverables[editingIndex];
    
    // Remove any existing edit for this deliverable
    const filteredEdits = edits.filter(edit => 
      !(edit.type === 'modified' && edit.originalText === originalText)
    );

    const newEdit: NegotiationDeliverableEdit = {
      type: 'modified',
      originalText,
      proposedText: editForm.text,
      reason: editForm.reason
    };

    const updatedEdits = [...filteredEdits, newEdit];
    setEdits(updatedEdits);
    onEditsChange(updatedEdits);
    
    setEditingIndex(null);
    setEditForm({ text: '', reason: '' });
  };

  const handleRemoveDeliverable = (index: number, reason: string) => {
    if (!reason.trim()) return;

    const originalText = originalDeliverables[index];
    
    // Remove any existing edits for this deliverable
    const filteredEdits = edits.filter(edit => 
      !(edit.originalText === originalText)
    );

    const removeEdit: NegotiationDeliverableEdit = {
      type: 'removed',
      originalText,
      proposedText: '',
      reason
    };

    const updatedEdits = [...filteredEdits, removeEdit];
    setEdits(updatedEdits);
    onEditsChange(updatedEdits);
  };

  const handleAddDeliverable = () => {
    if (!newDeliverable.text.trim() || !newDeliverable.reason.trim()) return;

    const addEdit: NegotiationDeliverableEdit = {
      type: 'added',
      proposedText: newDeliverable.text,
      reason: newDeliverable.reason
    };

    const updatedEdits = [...edits, addEdit];
    setEdits(updatedEdits);
    onEditsChange(updatedEdits);
    
    setNewDeliverable({ text: '', reason: '' });
    setShowAddForm(false);
  };

  const handleUndoEdit = (originalText: string) => {
    const updatedEdits = edits.filter(edit => edit.originalText !== originalText);
    setEdits(updatedEdits);
    onEditsChange(updatedEdits);
  };

  const handleUndoAdd = (proposedText: string) => {
    const updatedEdits = edits.filter(edit => 
      !(edit.type === 'added' && edit.proposedText === proposedText)
    );
    setEdits(updatedEdits);
    onEditsChange(updatedEdits);
  };

  const getDeliverableStatus = (index: number) => {
    const originalText = originalDeliverables[index];
    const edit = edits.find(edit => edit.originalText === originalText);
    return edit ? edit.type : 'original';
  };

  const getDisplayText = (index: number) => {
    const originalText = originalDeliverables[index];
    const edit = edits.find(edit => 
      edit.type === 'modified' && edit.originalText === originalText
    );
    return edit ? edit.proposedText : originalText;
  };

  const getEditReason = (index: number) => {
    const originalText = originalDeliverables[index];
    const edit = edits.find(edit => edit.originalText === originalText);
    return edit?.reason || '';
  };

  const addedDeliverables = edits.filter(edit => edit.type === 'added');

  const totalChanges = edits.length;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Deliverables - Negotiation Mode</span>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="bg-orange-50 text-orange-700">
              {totalChanges} change{totalChanges !== 1 ? 's' : ''}
            </Badge>
            <Button size="sm" variant="outline" onClick={() => setShowAddForm(true)}>
              <Plus className="w-3 h-3 mr-1" />
              Add
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Original Deliverables */}
          {originalDeliverables.map((deliverable, index) => {
            const status = getDeliverableStatus(index);
            const displayText = getDisplayText(index);
            const isEditing = editingIndex === index;
            const editReason = getEditReason(index);

            if (status === 'removed') {
              return (
                <div key={index} className="p-3 border rounded-lg bg-red-50 border-red-200">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="text-red-700 line-through">{deliverable}</div>
                      <div className="text-xs text-red-600 mt-1">
                        <strong>Removal reason:</strong> {editReason}
                      </div>
                    </div>
                    <Button size="sm" variant="outline" onClick={() => handleUndoEdit(deliverable)}>
                      Undo
                    </Button>
                  </div>
                </div>
              );
            }

            return (
              <div key={index} className={`p-3 border rounded-lg ${status === 'modified' ? 'bg-blue-50 border-blue-200' : ''}`}>
                {!isEditing ? (
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="grid grid-cols-1 gap-3">
                        <div className="flex items-start gap-4">
                          <div className="flex-1">
                            <div className="text-xs text-gray-500 mb-1">
                              {status === 'modified' ? 'Original' : 'Deliverable'}
                            </div>
                            <div className={status === 'modified' ? 'text-gray-700' : ''}>{deliverable}</div>
                          </div>
                          {status === 'modified' && (
                            <>
                              <div className="flex items-center text-gray-400 mt-4">→</div>
                              <div className="flex-1">
                                <div className="text-xs text-blue-600 mb-1">Proposed</div>
                                <div className="text-blue-700 font-medium">{displayText}</div>
                              </div>
                            </>
                          )}
                        </div>
                        {status === 'modified' && (
                          <div className="text-xs text-blue-600 bg-blue-100 p-2 rounded">
                            <strong>Edit reason:</strong> {editReason}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-1 ml-4">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleStartEdit(index, displayText)}
                      >
                        <Edit3 className="w-3 h-3" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          const reason = prompt('Why are you removing this deliverable?');
                          if (reason) handleRemoveDeliverable(index, reason);
                        }}
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                      {status === 'modified' && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleUndoEdit(deliverable)}
                        >
                          <X className="w-3 h-3" />
                        </Button>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-xs text-gray-500 mb-1">Original</div>
                        <div className="p-2 bg-gray-50 rounded text-gray-700">{deliverable}</div>
                      </div>
                      <div>
                        <div className="text-xs text-blue-600 mb-1">Proposed</div>
                        <Textarea
                          value={editForm.text}
                          onChange={(e) => setEditForm(prev => ({ ...prev, text: e.target.value }))}
                          rows={3}
                          placeholder="Enter updated deliverable..."
                        />
                      </div>
                    </div>
                    <div>
                      <Label className="text-xs">Reason for Change *</Label>
                      <Input
                        value={editForm.reason}
                        onChange={(e) => setEditForm(prev => ({ ...prev, reason: e.target.value }))}
                        placeholder="Explain why you're making this change..."
                        className="mt-1"
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        onClick={handleSaveEdit}
                        disabled={!editForm.text.trim() || !editForm.reason.trim()}
                      >
                        <Save className="w-3 h-3 mr-1" />
                        Save
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        onClick={() => {
                          setEditingIndex(null);
                          setEditForm({ text: '', reason: '' });
                        }}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          {/* Added Deliverables */}
          {addedDeliverables.map((edit, index) => (
            <div key={`added-${index}`} className="p-3 border rounded-lg bg-green-50 border-green-200">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Check className="w-4 h-4 text-green-600" />
                    <span className="text-xs font-medium text-green-700">NEW DELIVERABLE</span>
                  </div>
                  <div className="text-green-700 font-medium">{edit.proposedText}</div>
                  <div className="text-xs text-green-600 mt-1">
                    <strong>Addition reason:</strong> {edit.reason}
                  </div>
                </div>
                <Button 
                  size="sm" 
                  variant="outline" 
                  onClick={() => handleUndoAdd(edit.proposedText)}
                >
                  <X className="w-3 h-3" />
                </Button>
              </div>
            </div>
          ))}

          {/* Add New Deliverable Form */}
          {showAddForm && (
            <div className="p-3 border-2 border-dashed border-gray-300 rounded-lg">
              <div className="space-y-3">
                <div>
                  <Label className="text-xs">New Deliverable</Label>
                  <Textarea
                    value={newDeliverable.text}
                    onChange={(e) => setNewDeliverable(prev => ({ ...prev, text: e.target.value }))}
                    placeholder="Describe the new deliverable..."
                    className="mt-1"
                    rows={2}
                  />
                </div>
                <div>
                  <Label className="text-xs">Reason for Addition *</Label>
                  <Input
                    value={newDeliverable.reason}
                    onChange={(e) => setNewDeliverable(prev => ({ ...prev, reason: e.target.value }))}
                    placeholder="Explain why this deliverable is needed..."
                    className="mt-1"
                  />
                </div>
                <div className="flex gap-2">
                  <Button 
                    size="sm" 
                    onClick={handleAddDeliverable}
                    disabled={!newDeliverable.text.trim() || !newDeliverable.reason.trim()}
                  >
                    <Plus className="w-3 h-3 mr-1" />
                    Add Deliverable
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    onClick={() => {
                      setShowAddForm(false);
                      setNewDeliverable({ text: '', reason: '' });
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default EditableDeliverables;