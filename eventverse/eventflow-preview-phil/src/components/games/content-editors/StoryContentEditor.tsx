import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Trash2, BookOpen, ArrowRight } from "lucide-react";
import { StoryBranch, StoryChoice } from "@/types/game";

interface StoryContentEditorProps {
  gameData: any;
  setGameData: (data: any) => void;
}

export const StoryContentEditor = ({ gameData, setGameData }: StoryContentEditorProps) => {
  const storyBranches = gameData.content?.storyBranches || [];

  const addStoryBranch = () => {
    const newBranch: StoryBranch = {
      id: `chapter-${Date.now()}`,
      title: '',
      content: '',
      chapter: storyBranches.length + 1,
      choices: [
        { id: `choice-${Date.now()}-1`, text: '', consequence: '' },
        { id: `choice-${Date.now()}-2`, text: '', consequence: '' }
      ]
    };

    setGameData({
      ...gameData,
      content: {
        ...gameData.content,
        storyBranches: [...storyBranches, newBranch]
      }
    });
  };

  const updateBranch = (index: number, updatedBranch: StoryBranch) => {
    const updatedBranches = [...storyBranches];
    updatedBranches[index] = updatedBranch;
    
    setGameData({
      ...gameData,
      content: {
        ...gameData.content,
        storyBranches: updatedBranches
      }
    });
  };

  const removeBranch = (index: number) => {
    const updatedBranches = storyBranches.filter((_: any, i: number) => i !== index);
    // Reorder chapters
    const reorderedBranches = updatedBranches.map((branch: StoryBranch, i: number) => ({
      ...branch,
      chapter: i + 1
    }));
    
    setGameData({
      ...gameData,
      content: {
        ...gameData.content,
        storyBranches: reorderedBranches
      }
    });
  };

  const addChoice = (branchIndex: number) => {
    const updatedBranches = [...storyBranches];
    const newChoice: StoryChoice = {
      id: `choice-${Date.now()}`,
      text: '',
      consequence: ''
    };
    updatedBranches[branchIndex].choices.push(newChoice);
    
    setGameData({
      ...gameData,
      content: {
        ...gameData.content,
        storyBranches: updatedBranches
      }
    });
  };

  const updateChoice = (branchIndex: number, choiceIndex: number, updatedChoice: StoryChoice) => {
    const updatedBranches = [...storyBranches];
    updatedBranches[branchIndex].choices[choiceIndex] = updatedChoice;
    
    setGameData({
      ...gameData,
      content: {
        ...gameData.content,
        storyBranches: updatedBranches
      }
    });
  };

  const removeChoice = (branchIndex: number, choiceIndex: number) => {
    const updatedBranches = [...storyBranches];
    updatedBranches[branchIndex].choices.splice(choiceIndex, 1);
    
    setGameData({
      ...gameData,
      content: {
        ...gameData.content,
        storyBranches: updatedBranches
      }
    });
  };

  const generateSampleStory = () => {
    const sampleBranches: StoryBranch[] = [
      {
        id: 'chapter-1',
        title: 'The Wedding Day Mystery',
        content: 'As the wedding ceremony begins, you notice something unusual happening behind the scenes...',
        chapter: 1,
        choices: [
          {
            id: 'choice-1-1',
            text: 'Investigate the mysterious sound from the kitchen',
            consequence: 'You discover the catering staff preparing a surprise dessert!'
          },
          {
            id: 'choice-1-2',
            text: 'Check on the wedding photographer who seems flustered',
            consequence: 'The photographer lost their memory card but finds a backup!'
          }
        ]
      },
      {
        id: 'chapter-2',
        title: 'The Reception Surprise',
        content: 'During the reception, the best man approaches the microphone with a nervous smile...',
        chapter: 2,
        choices: [
          {
            id: 'choice-2-1',
            text: 'Encourage him to share his heartfelt speech',
            consequence: 'His emotional words bring tears to everyone\'s eyes!'
          },
          {
            id: 'choice-2-2',
            text: 'Suggest he start with a funny story instead',
            consequence: 'The crowd erupts in laughter at his childhood tale!'
          }
        ]
      },
      {
        id: 'chapter-3',
        title: 'The Final Dance',
        content: 'As the evening winds down, an unexpected song starts playing...',
        chapter: 3,
        choices: [
          {
            id: 'choice-3-1',
            text: 'Join everyone on the dance floor',
            consequence: 'You create the most memorable dance party of the night!'
          },
          {
            id: 'choice-3-2',
            text: 'Help the couple sneak away for a private moment',
            consequence: 'They share a quiet, romantic moment under the stars!'
          }
        ]
      }
    ];

    setGameData({
      ...gameData,
      content: {
        ...gameData.content,
        storyBranches: sampleBranches
      }
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-medium flex items-center gap-2">
            <BookOpen className="w-5 h-5" />
            Story Chapters ({storyBranches.length})
          </h3>
          <p className="text-sm text-muted-foreground">
            Create an interactive story where the audience votes on choices
          </p>
        </div>
        <div className="flex gap-2">
          <Button onClick={generateSampleStory} variant="outline" size="sm">
            Load Sample Story
          </Button>
          <Button onClick={addStoryBranch} size="sm">
            <Plus className="w-4 h-4 mr-2" />
            Add Chapter
          </Button>
        </div>
      </div>

      <div className="space-y-4 max-h-96 overflow-y-auto">
        {storyBranches.map((branch: StoryBranch, branchIndex: number) => (
          <Card key={branch.id} className="border-2">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-base flex items-center gap-2">
                    <Badge variant="outline">Chapter {branch.chapter}</Badge>
                    {branch.title || `Untitled Chapter ${branch.chapter}`}
                  </CardTitle>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeBranch(branchIndex)}
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Chapter Title</label>
                <Input
                  placeholder="e.g., The Wedding Day Mystery"
                  value={branch.title}
                  onChange={(e) => updateBranch(branchIndex, { ...branch, title: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Story Content</label>
                <Textarea
                  placeholder="Write the story content for this chapter..."
                  value={branch.content}
                  rows={3}
                  onChange={(e) => updateBranch(branchIndex, { ...branch, content: e.target.value })}
                />
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <label className="block text-sm font-medium">
                    Choices ({branch.choices.length})
                  </label>
                  <Button
                    onClick={() => addChoice(branchIndex)}
                    variant="outline"
                    size="sm"
                  >
                    <Plus className="w-3 h-3 mr-1" />
                    Add Choice
                  </Button>
                </div>

                {branch.choices.map((choice: StoryChoice, choiceIndex: number) => (
                  <div key={choice.id} className="p-3 border rounded-lg space-y-2">
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="text-xs">
                        Option {String.fromCharCode(65 + choiceIndex)}
                      </Badge>
                      <ArrowRight className="w-3 h-3 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">Choice & Consequence</span>
                      <div className="ml-auto">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeChoice(branchIndex, choiceIndex)}
                          className="h-6 w-6 p-0 text-destructive hover:text-destructive"
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                    <Input
                      placeholder="What choice do players vote on?"
                      value={choice.text}
                      onChange={(e) => updateChoice(branchIndex, choiceIndex, { ...choice, text: e.target.value })}
                    />
                    <Input
                      placeholder="What happens if this choice wins?"
                      value={choice.consequence}
                      onChange={(e) => updateChoice(branchIndex, choiceIndex, { ...choice, consequence: e.target.value })}
                    />
                  </div>
                ))}

                {branch.choices.length === 0 && (
                  <div className="text-center py-4 text-muted-foreground text-sm">
                    No choices added yet. Add at least 2 choices for voting.
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
        
        {storyBranches.length === 0 && (
          <Card>
            <CardContent className="text-center py-8 text-muted-foreground">
              <BookOpen className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>No story chapters configured yet.</p>
              <p className="text-sm mt-2">Create interactive stories where the audience votes on what happens next!</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};