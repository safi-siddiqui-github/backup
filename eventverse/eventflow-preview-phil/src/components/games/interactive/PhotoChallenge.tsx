import { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Camera, Upload, Star, Heart, Trophy, Timer } from 'lucide-react';

interface PhotoChallengeProps {
  gameSession: any;
  onSubmit: (photo: File, challengeId: string) => void;
  onComplete: (score: number) => void;
}

const PhotoChallenge = ({ gameSession, onSubmit, onComplete }: PhotoChallengeProps) => {
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [capturedPhoto, setCapturedPhoto] = useState<string | null>(null);
  const [submittedPhotos, setSubmittedPhotos] = useState<string[]>([]);
  const [timeLeft, setTimeLeft] = useState(120);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const challenges = [
    "Take a group selfie with 3 strangers",
    "Find something that represents love",  
    "Capture the most delicious-looking food",
    "Show us the best dance move",
    "Find the couple's wedding colors in nature",
    "Take a creative shadow photo"
  ];

  const handleTakePhoto = () => {
    cameraInputRef.current?.click();
  };

  const handleUploadPhoto = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setCapturedPhoto(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmitPhoto = () => {
    if (capturedPhoto && fileInputRef.current?.files?.[0]) {
      onSubmit(fileInputRef.current.files[0], challenges[currentChallenge]);
      setSubmittedPhotos(prev => [...prev, capturedPhoto]);
      setCapturedPhoto(null);
      
      if (currentChallenge < challenges.length - 1) {
        setCurrentChallenge(prev => prev + 1);
      } else {
        onComplete(submittedPhotos.length * 100);
      }
    }
  };

  const skipChallenge = () => {
    if (currentChallenge < challenges.length - 1) {
      setCurrentChallenge(prev => prev + 1);
    } else {
      onComplete(submittedPhotos.length * 100);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-900 via-purple-900 to-indigo-900 p-4">
      <div className="max-w-md mx-auto space-y-6">
        {/* Header */}
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center justify-between text-white">
              <div className="flex items-center gap-2">
                <Camera className="w-5 h-5 text-pink-400" />
                Photo Challenge
              </div>
              <Badge variant="secondary" className="bg-white/20 text-white">
                {currentChallenge + 1}/{challenges.length}
              </Badge>
            </CardTitle>
          </CardHeader>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardContent className="p-3 text-center">
              <Camera className="w-4 h-4 text-pink-400 mx-auto mb-1" />
              <div className="text-white font-bold">{submittedPhotos.length}</div>
              <div className="text-xs text-white/70">Submitted</div>
            </CardContent>
          </Card>
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardContent className="p-3 text-center">
              <Timer className="w-4 h-4 text-blue-400 mx-auto mb-1" />
              <div className="text-white font-bold">{Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}</div>
              <div className="text-xs text-white/70">Time Left</div>
            </CardContent>
          </Card>
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardContent className="p-3 text-center">
              <Trophy className="w-4 h-4 text-yellow-400 mx-auto mb-1" />
              <div className="text-white font-bold">{submittedPhotos.length * 100}</div>
              <div className="text-xs text-white/70">Points</div>
            </CardContent>
          </Card>
        </div>

        {/* Current Challenge */}
        <Card className="bg-white/95 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-center text-gray-800 flex items-center justify-center gap-2">
              <Star className="w-5 h-5 text-yellow-500" />
              Challenge {currentChallenge + 1}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <p className="text-lg font-medium text-gray-700 mb-4">
                {challenges[currentChallenge]}
              </p>
              
              {!capturedPhoto && (
                <div className="space-y-3">
                  <Button
                    onClick={handleTakePhoto}
                    className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white"
                  >
                    <Camera className="w-4 h-4 mr-2" />
                    Take Photo
                  </Button>
                  
                  <Button
                    onClick={handleUploadPhoto}
                    variant="outline"
                    className="w-full"
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Upload from Gallery
                  </Button>
                </div>
              )}

              {capturedPhoto && (
                <div className="space-y-4">
                  <div className="relative">
                    <img
                      src={capturedPhoto}
                      alt="Captured"
                      className="w-full max-h-64 object-cover rounded-lg"
                    />
                  </div>
                  
                  <div className="flex gap-3">
                    <Button
                      onClick={handleSubmitPhoto}
                      className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white"
                    >
                      <Heart className="w-4 h-4 mr-2" />
                      Submit
                    </Button>
                    
                    <Button
                      onClick={() => setCapturedPhoto(null)}
                      variant="outline"
                      className="flex-1"
                    >
                      Retake
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Button
            onClick={skipChallenge}
            variant="outline"
            className="flex-1 bg-white/10 border-white/20 text-white hover:bg-white/20"
            disabled={currentChallenge === challenges.length - 1 && submittedPhotos.length === 0}
          >
            Skip Challenge
          </Button>
          
          {submittedPhotos.length > 0 && (
            <Button
              onClick={() => onComplete(submittedPhotos.length * 100)}
              className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
            >
              Finish Game
            </Button>
          )}
        </div>

        {/* Submitted Photos Grid */}
        {submittedPhotos.length > 0 && (
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-white text-sm">Your Submissions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-2">
                {submittedPhotos.map((photo, index) => (
                  <img
                    key={index}
                    src={photo}
                    alt={`Submission ${index + 1}`}
                    className="w-full h-20 object-cover rounded border-2 border-white/20"
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Hidden file inputs */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
        <input
          ref={cameraInputRef}
          type="file"
          accept="image/*"
          capture="environment"
          onChange={handleFileChange}
          className="hidden"
        />
      </div>
    </div>
  );
};

export default PhotoChallenge;