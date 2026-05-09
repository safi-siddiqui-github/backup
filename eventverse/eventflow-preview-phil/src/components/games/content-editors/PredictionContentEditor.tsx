import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Trash2, Zap, Calendar, TrendingUp } from "lucide-react";
import { PredictionEvent } from "@/types/game";

interface PredictionContentEditorProps {
  gameData: any;
  setGameData: (data: any) => void;
}

export const PredictionContentEditor = ({ gameData, setGameData }: PredictionContentEditorProps) => {
  const predictions = gameData.content?.predictions || [];

  const addPrediction = () => {
    const newPrediction: PredictionEvent = {
      id: `prediction-${Date.now()}`,
      title: '',
      description: '',
      options: ['', '']
    };

    setGameData({
      ...gameData,
      content: {
        ...gameData.content,
        predictions: [...predictions, newPrediction]
      }
    });
  };

  const updatePrediction = (index: number, updatedPrediction: PredictionEvent) => {
    const updatedPredictions = [...predictions];
    updatedPredictions[index] = updatedPrediction;
    
    setGameData({
      ...gameData,
      content: {
        ...gameData.content,
        predictions: updatedPredictions
      }
    });
  };

  const removePrediction = (index: number) => {
    const updatedPredictions = predictions.filter((_: any, i: number) => i !== index);
    setGameData({
      ...gameData,
      content: {
        ...gameData.content,
        predictions: updatedPredictions
      }
    });
  };

  const addOption = (predictionIndex: number) => {
    const prediction = predictions[predictionIndex];
    const updatedOptions = [...prediction.options, ''];
    updatePrediction(predictionIndex, { ...prediction, options: updatedOptions });
  };

  const updateOption = (predictionIndex: number, optionIndex: number, value: string) => {
    const prediction = predictions[predictionIndex];
    const updatedOptions = [...prediction.options];
    updatedOptions[optionIndex] = value;
    updatePrediction(predictionIndex, { ...prediction, options: updatedOptions });
  };

  const removeOption = (predictionIndex: number, optionIndex: number) => {
    const prediction = predictions[predictionIndex];
    if (prediction.options.length <= 2) return; // Keep minimum 2 options
    const updatedOptions = prediction.options.filter((_: string, i: number) => i !== optionIndex);
    updatePrediction(predictionIndex, { ...prediction, options: updatedOptions });
  };

  const generateSamplePredictions = () => {
    const samplePredictions: PredictionEvent[] = [
      {
        id: 'prediction-1',
        title: 'Event Attendance',
        description: 'How many people will attend this event?',
        options: ['50-100 people', '100-150 people', '150-200 people', '200+ people']
      },
      {
        id: 'prediction-2',
        title: 'Weather Tomorrow',
        description: 'What will the weather be like tomorrow?',
        options: ['Sunny', 'Cloudy', 'Rainy', 'Stormy']
      },
      {
        id: 'prediction-3',
        title: 'Team Performance',
        description: 'Which team will win the competition?',
        options: ['Team Alpha', 'Team Beta', 'Team Gamma', 'Tie/Draw']
      },
      {
        id: 'prediction-4',
        title: 'Popular Choice',
        description: 'Which food will be most popular at lunch?',
        options: ['Pizza', 'Sandwiches', 'Salads', 'Pasta']
      },
      {
        id: 'prediction-5',
        title: 'Quiz Champion',
        description: 'Who will score highest in the trivia round?',
        options: ['Marketing Team', 'Development Team', 'Sales Team', 'Management Team']
      }
    ];

    setGameData({
      ...gameData,
      content: {
        ...gameData.content,
        predictions: samplePredictions
      }
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-medium flex items-center gap-2">
            <Zap className="w-5 h-5" />
            Prediction Events ({predictions.length})
          </h3>
          <p className="text-sm text-muted-foreground">
            Create predictions for participants to vote on and track results
          </p>
        </div>
        <div className="flex gap-2">
          <Button onClick={generateSamplePredictions} variant="outline" size="sm">
            Load Samples
          </Button>
          <Button onClick={addPrediction} size="sm">
            <Plus className="w-4 h-4 mr-2" />
            Add Prediction
          </Button>
        </div>
      </div>

      <div className="space-y-4 max-h-96 overflow-y-auto">
        {predictions.map((prediction: PredictionEvent, index: number) => (
          <Card key={prediction.id} className="border-2">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2">
                  <Badge variant="outline">Prediction {index + 1}</Badge>
                  <Badge variant="secondary">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    {prediction.options.length} options
                  </Badge>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removePrediction(index)}
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Prediction Title</label>
                <Input
                  placeholder="e.g., Event Attendance, Weather Tomorrow"
                  value={prediction.title}
                  onChange={(e) => updatePrediction(index, { ...prediction, title: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <Textarea
                  placeholder="What are participants predicting?"
                  value={prediction.description}
                  rows={2}
                  onChange={(e) => updatePrediction(index, { ...prediction, description: e.target.value })}
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-medium">Prediction Options</label>
                  <Button
                    onClick={() => addOption(index)}
                    variant="outline"
                    size="sm"
                    disabled={prediction.options.length >= 6}
                  >
                    <Plus className="w-3 h-3 mr-1" />
                    Add Option
                  </Button>
                </div>
                <div className="space-y-2">
                  {prediction.options.map((option: string, optionIndex: number) => (
                    <div key={optionIndex} className="flex gap-2">
                      <Input
                        placeholder={`Option ${optionIndex + 1}`}
                        value={option}
                        onChange={(e) => updateOption(index, optionIndex, e.target.value)}
                      />
                      {prediction.options.length > 2 && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeOption(index, optionIndex)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Minimum 2 options, maximum 6 options per prediction
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
        
        {predictions.length === 0 && (
          <Card>
            <CardContent className="text-center py-8 text-muted-foreground">
              <Zap className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>No predictions created yet.</p>
              <p className="text-sm mt-2">Add prediction events for participants to vote on!</p>
            </CardContent>
          </Card>
        )}
      </div>

      {predictions.length > 0 && (
        <Card className="border-dashed">
          <CardContent className="p-4">
            <div className="text-sm text-muted-foreground">
              <p className="font-medium mb-2">💡 Prediction Tips:</p>
              <ul className="space-y-1 text-xs">
                <li>• Make predictions about outcomes that will be revealed during or after the event</li>
                <li>• Include a mix of serious and fun predictions to keep engagement high</li>
                <li>• Ensure options are mutually exclusive and cover likely outcomes</li>
                <li>• Consider time-based predictions that create anticipation</li>
                <li>• Review and reveal results to maintain participant interest</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};