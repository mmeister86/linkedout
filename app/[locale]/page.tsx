/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { useState } from 'react';
import { useCompletion } from '@ai-sdk/react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Loader2 } from 'lucide-react';
import Header from '@/components/Header';
import ProfileCard from '@/components/ProfileCard';
import PostCard from '@/components/PostCard';
import TrendingCard from '@/components/TrendingCard';

export default function Home() {
  const t = useTranslations('page');
  const tError = useTranslations('errors');
  const tPost = useTranslations('post');

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
      setError(error.message || tError('generation'));
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

    // Directly call API with our custom implementation
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ topic, language: apiLanguage }),
      });

      if (!response.ok) {
        throw new Error(tError('failedToGenerate'));
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
      setError(error instanceof Error ? error.message : tError('generation'));
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
      setError(tError('clipboard'));
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
      setError(tError('download'));
      // Clear error after 3 seconds
      setTimeout(() => setError(null), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header />

      {/* Main Content Area */}
      <div className="pt-4 pb-8">
        <div className="linkedin-layout">
          {/* Left Sidebar */}
          <div className="linkedin-left-sidebar sticky top-16 h-fit">
            <ProfileCard />
          </div>

          {/* Main Content */}
          <div className="space-y-4">
            {/* Post Generator Card */}
            <div className="linkedin-card linkedin-card-important">
              <div className="mb-4">
                <h2 className="text-xl font-semibold mb-2">{t('form.title')}</h2>
                <p className="text-muted-foreground text-sm">
                  {t('form.description')}
                </p>
              </div>

              {/* Input Form */}
              <form onSubmit={handleGenerate} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="topic" className="text-sm font-medium">
                    {t('form.topicLabel')}
                  </label>
                  <Textarea
                    id="topic"
                    placeholder={t('form.topicPlaceholder')}
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">{t('form.languageLabel')}</label>
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
                  size="lg"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      {t('form.generatingButton')}
                    </>
                  ) : (
                    <span>{t('form.generateButton')}</span>
                  )}
                </Button>
              </form>

              {/* Error Display */}
              {error && (
                <div className="mt-4 bg-red-50 border border-red-200 text-red-800 rounded-md p-3 dark:bg-red-900/20 dark:border-red-800 dark:text-red-200">
                  {error}
                </div>
              )}
            </div>

            {/* Generated Post Display */}
            {completion && (
              <PostCard
                content={completion}
                timestamp={tPost('timestamp.justNow')}
                likes={Math.floor(Math.random() * 500) + 50}
                comments={Math.floor(Math.random() * 100) + 10}
                shares={Math.floor(Math.random() * 50) + 5}
                views={`${Math.floor(Math.random() * 9000) + 1000}`}
              />
            )}

            {/* Action Buttons */}
            {completion && (
              <div className="linkedin-card">
                <div className="flex gap-3">
                  <Button
                    variant="linkedin"
                    onClick={handleCopyToClipboard}
                    disabled={!completion}
                    className="flex-1"
                  >
                    {copySuccess ? t('buttons.copied') : t('buttons.copyToClipboard')}
                  </Button>
                  <Button
                    variant="linkedin"
                    onClick={handleDownloadMarkdown}
                    disabled={!completion}
                    className="flex-1"
                  >
                    {t('buttons.downloadMarkdown')}
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Right Sidebar */}
          <div className="linkedin-right-sidebar sticky top-16 h-fit">
            <TrendingCard />
          </div>
        </div>
      </div>
    </div>
  );
}
