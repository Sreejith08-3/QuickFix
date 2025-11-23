import { useState } from 'react';
import { api } from '@/lib/api';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Upload, Camera, AlertTriangle, CheckCircle, TrendingUp } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const AIDiagnostic = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [description, setDescription] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [progress, setProgress] = useState(0);
  const { toast } = useToast();

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFiles = Array.from(e.target.files || []);
    setFiles([...files, ...uploadedFiles]);
    toast({
      title: 'Files uploaded',
      description: `${uploadedFiles.length} file(s) added successfully`,
    });
  };

  const handleAnalyze = async () => {
    if (!description.trim()) {
      toast({
        title: 'Description required',
        description: 'Please describe the issue before analyzing',
        variant: 'destructive',
      });
      return;
    }

    setAnalyzing(true);
    setProgress(0);

    // Simulate upload progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) {
          clearInterval(interval);
          return 90;
        }
        return prev + 10;
      });
    }, 200);

    try {
      // In a real app, we would upload files to S3/Cloudinary first
      // Here we just send the filenames as a mock
      const { data } = await api.post('/ai/diagnostic', {
        images: files.map(f => f.name),
        description: description
      });

      clearInterval(interval);
      setProgress(100);

      setTimeout(() => {
        setResult(data.data);
        setAnalyzing(false);
      }, 500);

    } catch (error: any) {
      clearInterval(interval);
      setAnalyzing(false);
      toast({
        title: 'Analysis Failed',
        description: error.response?.data?.message || 'Could not analyze media. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const severityColors: Record<string, 'default' | 'destructive'> = {
    low: 'default',
    medium: 'default',
    high: 'destructive',
    critical: 'destructive',
  };

  return (
    <div className="min-h-screen pt-20 pb-12 bg-background">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 mb-4">
            <Camera className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-4xl font-bold mb-2">AI Diagnostic Tool</h1>
          <p className="text-xl text-muted-foreground">
            Upload photos or videos and let AI diagnose your issue
          </p>
        </div>

        <div className="space-y-6">
          {/* Upload Section */}
          <Card>
            <CardHeader>
              <CardTitle>Upload Media</CardTitle>
              <CardDescription>
                Upload clear images or videos of the damaged area or appliance
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="description" className="text-sm font-medium">
                  Describe the issue
                </label>
                <textarea
                  id="description"
                  className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="e.g., My washing machine is making a loud banging noise during the spin cycle..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div className="border-2 border-dashed border-border rounded-lg p-12 text-center hover:border-primary transition-colors">
                <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">
                    Drag and drop files here, or click to browse
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Supports: JPG, PNG, MP4, MOV (Max 20MB per file)
                  </p>
                </div>
                <input
                  type="file"
                  multiple
                  accept="image/*,video/*"
                  className="hidden"
                  id="file-upload"
                  onChange={handleFileUpload}
                />
                <label htmlFor="file-upload">
                  <Button className="mt-4" variant="outline" asChild>
                    <span>Choose Files</span>
                  </Button>
                </label>
              </div>

              {files.length > 0 && (
                <div className="space-y-2">
                  <p className="text-sm font-medium">Uploaded files:</p>
                  <div className="space-y-2">
                    {files.map((file, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 bg-accent rounded-lg"
                      >
                        <span className="text-sm">{file.name}</span>
                        <span className="text-xs text-muted-foreground">
                          {(file.size / 1024 / 1024).toFixed(2)} MB
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <Button
                className="w-full"
                size="lg"
                onClick={handleAnalyze}
                disabled={!description.trim() || analyzing}
              >
                {analyzing ? 'Analyzing...' : 'Analyze with AI'}
              </Button>
            </CardContent>
          </Card>

          {/* Analysis Progress */}
          {analyzing && (
            <Card>
              <CardContent className="py-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <span>Analyzing your media...</span>
                    <span className="font-semibold">{progress}%</span>
                  </div>
                  <Progress value={progress} />
                  <div className="text-xs text-muted-foreground space-y-1">
                    <p>• Detecting objects and damage patterns</p>
                    <p>• Analyzing severity and complexity</p>
                    <p>• Estimating repair costs</p>
                    <p>• Matching with expert recommendations</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Results */}
          {result && !analyzing && (
            <Card className="border-primary">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-2xl">Diagnostic Result</CardTitle>
                  <Badge variant={severityColors[result.severity]}>
                    {result.severity.toUpperCase()} SEVERITY
                  </Badge>
                </div>
                <CardDescription>
                  AI confidence: {result.confidence}%
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="p-4 bg-accent rounded-lg">
                  <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-primary" />
                    Predicted Issue
                  </h3>
                  <p className="text-2xl font-bold text-primary">{result.predictedIssue}</p>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 bg-card rounded-lg border">
                    <p className="text-sm text-muted-foreground mb-1">Estimated Cost</p>
                    <p className="text-2xl font-bold text-primary">₹{result.estimatedCost}</p>
                  </div>
                  <div className="p-4 bg-card rounded-lg border">
                    <p className="text-sm text-muted-foreground mb-1">Required Service</p>
                    <p className="text-xl font-semibold capitalize">{result.requiredCategory}</p>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-primary" />
                    Recommendations
                  </h3>
                  <ul className="space-y-2">
                    {result.recommendations.map((rec: string, index: number) => (
                      <li key={index} className="flex gap-2">
                        <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span>{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex gap-4">
                  <Button className="flex-1" size="lg">
                    Book {result.requiredCategory} Service
                  </Button>
                  <Button variant="outline" size="lg">
                    Get Second Opinion
                  </Button>
                </div>

                <div className="p-4 bg-muted rounded-lg text-sm text-muted-foreground">
                  <p className="font-semibold mb-2">Disclaimer:</p>
                  <p>
                    This is an AI-generated diagnostic and should be verified by a professional
                    technician. The estimated cost is approximate and may vary based on actual
                    inspection.
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default AIDiagnostic;
