/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { useState } from 'react';
import { useCompletion } from '@ai-sdk/react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Loader2 } from 'lucide-react';

export default function Home() {
  const [topic, setTopic] = useState('');
  const [language, setLanguage] = useState<'english' | 'german'>('german');
  const [error, setError] = useState<string | null>(null);
  const [copySuccess, setCopySuccess] = useState(false);

  const {
    completion,
    isLoading: isGenerating,
    error: completionError,
    handleSubmit,
    setCompletion,
  } = useCompletion({
    api: '/api/generate',
    onError: (error: Error) => {
      setError(error.message || 'An error occurred while generating the post.');
    },
    onFinish: (prompt, result) => {
      setError(null);
    },
  });

  const handleGenerate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!topic.trim()) return;

    // Clear previous results and errors
    setCompletion('');
    setError(null);

    // Convert language to match API expectations
    const apiLanguage = language === 'english' ? 'en' : 'de';

    // Directly call the API with our custom implementation
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ topic, language: apiLanguage }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate post');
      }

      // Get the response as a stream and handle it
      const reader = response.body?.getReader();
      if (!reader) {
        throw new Error('No response body');
      }

      const decoder = new TextDecoder();
      let result = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        result += chunk;
        setCompletion(result);
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An error occurred while generating the post.');
    }
  };

  const handleCopyToClipboard = async () => {
    if (!completion) return;

    try {
      await navigator.clipboard.writeText(completion);
      setCopySuccess(true);
      // Reset the success state after 2 seconds
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
      setError('Failed to copy to clipboard. Please try again.');
      // Clear error after 3 seconds
      setTimeout(() => setError(null), 3000);
    }
  };

  const handleDownloadMarkdown = () => {
    if (!completion) return;

    try {
      // Create a timestamp for the filename
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
      const filename = `linkedout-post-${timestamp}.md`;

      // Create a markdown file with the generated post
      const element = document.createElement('a');
      const file = new Blob([completion], { type: 'text/markdown' });
      element.href = URL.createObjectURL(file);
      element.download = filename;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);

      // Clean up the object URL to avoid memory leaks
      URL.revokeObjectURL(element.href);
    } catch (err) {
      console.error('Failed to download file: ', err);
      setError('Failed to download file. Please try again.');
      // Clear error after 3 seconds
      setTimeout(() => setError(null), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-2xl space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">LinkedOut</h1>
          <p className="text-muted-foreground">
            Generate satirical LinkedIn posts with AI. Just describe your topic or event, and we&apos;ll create a cringe-worthy post for you.
          </p>
        </div>

        {/* Input Form */}
        <form onSubmit={handleGenerate} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="topic" className="text-sm font-medium">
              Topic or Event
            </label>
            <Textarea
              id="topic"
              placeholder="Describe your topic or event (e.g., 'I just got a new job as a software engineer')"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="min-h-24"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Language</label>
            <div className="flex gap-4">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  value="english"
                  checked={language === 'english'}
                  onChange={() => setLanguage('english')}
                  className="text-primary"
                />
                <span>English</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  value="german"
                  checked={language === 'german'}
                  onChange={() => setLanguage('german')}
                  className="text-primary"
                />
                <span>German</span>
              </label>
            </div>
          </div>

          <Button
            type="submit"
            disabled={!topic.trim() || isGenerating}
            className="w-full"
          >
            {isGenerating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              'Generate LinkedIn Post'
            )}
          </Button>
        </form>

        {/* Error Display */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-800 rounded-md p-3">
            {error}
          </div>
        )}

        {/* Generated Post */}
        {completion && (
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Generated Post</label>
              <div className="border rounded-md p-4 bg-card min-h-32 whitespace-pre-wrap">
                {completion}
              </div>
            </div>

            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={handleCopyToClipboard}
                disabled={!completion}
                className="flex-1"
              >
                {copySuccess ? 'Copied!' : 'Copy to Clipboard'}
              </Button>
              <Button
                variant="outline"
                onClick={handleDownloadMarkdown}
                disabled={!completion}
                className="flex-1"
              >
                Download as Markdown
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
