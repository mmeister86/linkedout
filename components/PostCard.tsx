"use client";

import { ThumbsUp, MessageCircle, Share, Send, MoreHorizontal, Heart, Laugh, Lightbulb, Award } from "lucide-react";
import { useState } from "react";
import { useTranslations } from "next-intl";

interface PostCardProps {
  authorName?: string;
  authorTitle?: string;
  authorCompany?: string;
  timestamp?: string;
  content?: string;
  likes?: number;
  comments?: number;
  shares?: number;
  views?: string;
}

export default function PostCard({
  authorName = "Professional User",
  authorTitle = "Thought Leader",
  authorCompany = "Synergy Corp",
  timestamp = "2h ago",
  content = "Just had an epiphany during my morning mindfulness session: disruption isn't just about innovation, it's about paradigm-shifting the very fabric of organizational synergy. Remember, in the world of agile methodologies, we're not just building products, we're crafting the future of human potential. #Innovation #Leadership #GrowthMindset",
  likes = 342,
  comments = 89,
  shares = 23,
  views = "12.5K"
}: PostCardProps) {
  const t = useTranslations('postCard');

  // Use default values from translations if props are not provided
  const finalAuthorName = authorName || t('defaults.authorName');
  const finalAuthorTitle = authorTitle || t('defaults.authorTitle');
  const finalAuthorCompany = authorCompany || t('defaults.authorCompany');
  const finalContent = content || t('defaults.content');

  const [showReactions, setShowReactions] = useState(false);
  const [userReaction, setUserReaction] = useState<string | null>(null);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(likes);

  const handleLike = () => {
    if (isLiked) {
      setIsLiked(false);
      setLikeCount(likeCount - 1);
      setUserReaction(null);
    } else {
      setIsLiked(true);
      setLikeCount(likeCount + 1);
      setUserReaction("like");
    }
    setShowReactions(false);
  };

  const handleReaction = (type: string) => {
    if (userReaction === type) {
      setIsLiked(false);
      setLikeCount(likeCount - 1);
      setUserReaction(null);
    } else {
      if (!isLiked) {
        setIsLiked(true);
        setLikeCount(likeCount + 1);
      }
      setUserReaction(type);
    }
    setShowReactions(false);
  };

  const getReactionIcon = (type: string) => {
    switch (type) {
      case "love":
        return <Heart className="h-4 w-4" fill="currentColor" />;
      case "laugh":
        return <Laugh className="h-4 w-4" />;
      case "insightful":
        return <Lightbulb className="h-4 w-4" />;
      case "support":
        return <Award className="h-4 w-4" />;
      default:
        return <ThumbsUp className="h-4 w-4" />;
    }
  };

  const getReactionColor = (type: string) => {
    switch (type) {
      case "love":
        return "text-red-500";
      case "laugh":
        return "text-yellow-500";
      case "insightful":
        return "text-blue-500";
      case "support":
        return "text-purple-500";
      default:
        return "text-blue-600";
    }
  };

  return (
    <div className="linkedin-card mb-4">
      {/* Post Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-start space-x-3">
          <div className="h-12 w-12 rounded-full bg-primary flex items-center justify-center shrink-0">
            <span className="text-primary-foreground font-semibold">
              {finalAuthorName.split(' ').map(n => n[0]).join('')}
            </span>
          </div>
          <div>
            <div className="flex items-center gap-1">
              <h3 className="font-semibold text-sm">{finalAuthorName}</h3>
              <span className="badge-premium text-xs ml-1">{t('badge.pro')}</span>
            </div>
            <p className="text-xs text-muted-foreground">{finalAuthorTitle} at {finalAuthorCompany}</p>
            <p className="text-xs text-muted-foreground">{timestamp || '2h ago'} • {views} views</p>
          </div>
        </div>
        <button className="text-muted-foreground hover:bg-secondary rounded-full p-1">
          <MoreHorizontal className="h-5 w-5" />
        </button>
      </div>

      {/* Post Content */}
      <div className="mb-3">
        <p className="text-sm whitespace-pre-wrap">{finalContent}</p>
      </div>

      {/* Engagement Metrics Bar */}
      {(isLiked || comments > 0 || shares > 0) && (
        <div className="flex items-center justify-between py-2 border-t border-border mb-2">
          <div className="flex items-center space-x-1">
            {userReaction && (
              <div className={`flex items-center justify-center h-5 w-5 rounded-full bg-card border border-border ${getReactionColor(userReaction)}`}>
                {getReactionIcon(userReaction)}
              </div>
            )}
            <span className="text-xs text-muted-foreground">
              {likeCount > 0 && (
                <span className="font-semibold text-foreground">{likeCount}</span>
              )}
              {likeCount > 0 && comments > 0 && " • "}
              {comments > 0 && (
                <span>{comments} {t('engagement.comments')}</span>
              )}
              {(likeCount > 0 || comments > 0) && shares > 0 && " • "}
              {shares > 0 && (
                <span>{shares} {t('engagement.shares')}</span>
              )}
            </span>
          </div>
        </div>
      )}

      {/* Reaction Buttons */}
      <div className="flex items-center justify-between py-2 border-t border-border">
        <div className="relative">
          {/* Reactions Popup */}
          {showReactions && (
            <div className="absolute bottom-full left-0 mb-2 flex items-center bg-card border border-border rounded-full shadow-lg p-1">
              <button
                onClick={() => handleReaction("like")}
                className="p-2 hover:bg-secondary rounded-full transition-colors"
                title={t('reactions.like')}
              >
                <ThumbsUp className="h-5 w-5 text-blue-600" />
              </button>
              <button
                onClick={() => handleReaction("love")}
                className="p-2 hover:bg-secondary rounded-full transition-colors"
                title={t('reactions.love')}
              >
                <Heart className="h-5 w-5 text-red-500" />
              </button>
              <button
                onClick={() => handleReaction("laugh")}
                className="p-2 hover:bg-secondary rounded-full transition-colors"
                title={t('reactions.laugh')}
              >
                <Laugh className="h-5 w-5 text-yellow-500" />
              </button>
              <button
                onClick={() => handleReaction("insightful")}
                className="p-2 hover:bg-secondary rounded-full transition-colors"
                title={t('reactions.insightful')}
              >
                <Lightbulb className="h-5 w-5 text-blue-500" />
              </button>
              <button
                onClick={() => handleReaction("support")}
                className="p-2 hover:bg-secondary rounded-full transition-colors"
                title={t('reactions.support')}
              >
                <Award className="h-5 w-5 text-purple-500" />
              </button>
            </div>
          )}

          <button
            className={`flex items-center space-x-2 px-3 py-1 rounded-full transition-colors ${
              isLiked ? "bg-blue-100 text-blue-600 dark:bg-blue-900/30" : "hover:bg-secondary"
            }`}
            onClick={handleLike}
            onMouseEnter={() => setShowReactions(true)}
            onMouseLeave={() => setShowReactions(false)}
          >
            {userReaction ? (
              <div className={`flex items-center ${getReactionColor(userReaction)}`}>
                {getReactionIcon(userReaction)}
              </div>
            ) : (
              <ThumbsUp className="h-4 w-4" />
            )}
            <span className="text-sm">{t('actions.like')}</span>
          </button>
        </div>

        <button className="flex items-center space-x-2 px-3 py-1 hover:bg-secondary rounded-full transition-colors">
          <MessageCircle className="h-4 w-4" />
          <span className="text-sm">{t('actions.comment')}</span>
        </button>

        <button className="flex items-center space-x-2 px-3 py-1 hover:bg-secondary rounded-full transition-colors">
          <Share className="h-4 w-4" />
          <span className="text-sm">{t('actions.share')}</span>
        </button>

        <button className="flex items-center space-x-2 px-3 py-1 hover:bg-secondary rounded-full transition-colors">
          <Send className="h-4 w-4" />
          <span className="text-sm">{t('actions.send')}</span>
        </button>
      </div>

      {/* Top Comment Preview */}
      {comments > 0 && (
        <div className="border-t border-border pt-3 mt-2">
          <div className="flex space-x-2">
            <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center shrink-0">
              <span className="text-xs font-semibold">JD</span>
            </div>
            <div className="flex-1">
              <div className="bg-secondary rounded-lg p-2">
                <div className="flex items-center gap-1 mb-1">
                  <span className="font-semibold text-xs">{t('comment.defaultAuthor')}</span>
                  <span className="text-xs text-muted-foreground">• 1h ago</span>
                </div>
                <p className="text-xs">{t('comment.defaultText')}</p>
              </div>
              <div className="flex items-center space-x-3 mt-1">
                <button className="text-xs text-muted-foreground hover:text-foreground">{t('actions.like')}</button>
                <button className="text-xs text-muted-foreground hover:text-foreground">{t('actions.reply')}</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
