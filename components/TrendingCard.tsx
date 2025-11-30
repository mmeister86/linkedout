"use client";

import { TrendingUp, Briefcase, Users, Hash, Calendar, Plus, MoreHorizontal } from "lucide-react";
import { useTranslations } from "next-intl";

export default function TrendingCard() {
  const t = useTranslations('trending');

  const trendingTopics = [
    {
      category: t('topics.technology'),
      title: t('topics.aiRevolution'),
      posts: `2,847 ${t('posts')}`,
      change: "+15%"
    },
    {
      category: t('topics.leadership'),
      title: t('topics.synergyManagement'),
      posts: `1,923 ${t('posts')}`,
      change: "+8%"
    },
    {
      category: t('topics.productivity'),
      title: t('topics.hustleCulture'),
      posts: `1,456 ${t('posts')}`,
      change: "+22%"
    },
    {
      category: t('topics.innovation'),
      title: t('topics.blockchainEverything'),
      posts: `987 ${t('posts')}`,
      change: "+5%"
    },
    {
      category: t('topics.career'),
      title: t('topics.quietQuitting'),
      posts: `756 ${t('posts')}`,
      change: "+18%"
    }
  ];

  const suggestedConnections = [
    {
      name: "Alex Johnson",
      title: "CEO at InnovationHub",
      mutualConnections: 15,
      avatar: "AJ"
    },
    {
      name: "Sarah Chen",
      title: "Growth Hacker at StartupXYZ",
      mutualConnections: 8,
      avatar: "SC"
    },
    {
      name: "Michael Brown",
      title: "Thought Leader at FutureCorp",
      mutualConnections: 12,
      avatar: "MB"
    }
  ];

  const todayAtWork = [
    {
      icon: <Calendar className="h-4 w-4" />,
      text: t('work.meetings', { count: 3 })
    },
    {
      icon: <Users className="h-4 w-4" />,
      text: t('work.profileViews', { count: 5 })
    },
    {
      icon: <Briefcase className="h-4 w-4" />,
      text: t('work.jobOpportunities', { count: 2 })
    }
  ];

  return (
    <div className="space-y-4">
      {/* Trending Topics */}
      <div className="linkedin-card">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-lg flex items-center">
            <TrendingUp className="h-5 w-5 mr-2" />
            {t('title')}
          </h3>
          <button className="text-muted-foreground hover:bg-secondary rounded-full p-1">
            <MoreHorizontal className="h-4 w-4" />
          </button>
        </div>

        <div className="space-y-3">
          {trendingTopics.map((topic, index) => (
            <div key={index} className="hover:bg-secondary p-2 rounded-lg transition-colors cursor-pointer">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-1 mb-1">
                    <span className="badge-trending text-xs">{t('trending')}</span>
                    {index === 0 && <span className="badge-premium text-xs">{t('hot')}</span>}
                  </div>
                  <p className="font-medium text-sm">{topic.title}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-muted-foreground">{topic.posts}</span>
                    <span className="text-xs font-semibold text-success-green">{topic.change}</span>
                  </div>
                </div>
                <button className="text-muted-foreground hover:text-foreground">
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Who to Follow */}
      <div className="linkedin-card">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-lg">{t('connections.title')}</h3>
          <button className="text-primary text-sm hover:underline">{t('connections.seeAll')}</button>
        </div>

        <div className="space-y-3">
          {suggestedConnections.map((person, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                  <span className="text-xs font-semibold">{person.avatar}</span>
                </div>
                <div>
                  <p className="font-medium text-sm">{person.name}</p>
                  <p className="text-xs text-muted-foreground">{person.title}</p>
                  <p className="text-xs text-muted-foreground">{person.mutualConnections} {t('connections.mutualConnections')}</p>
                </div>
              </div>
              <button className="btn-linkedin-primary text-xs py-1 px-3">
                {t('connections.connect')}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Today at Work */}
      <div className="linkedin-card">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-lg flex items-center">
            <Briefcase className="h-5 w-5 mr-2" />
            {t('work.title')}
          </h3>
          <button className="text-primary text-sm hover:underline">{t('work.viewAll')}</button>
        </div>

        <div className="space-y-3">
          {todayAtWork.map((item, index) => (
            <div key={index} className="flex items-start space-x-3">
              <div className="text-primary mt-0.5">
                {item.icon}
              </div>
              <p className="text-sm">{item.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Professional Stats (Satirical) */}
      <div className="linkedin-card">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-lg flex items-center">
            <TrendingUp className="h-5 w-5 mr-2" />
            {t('impact.title')}
          </h3>
        </div>

        <div className="space-y-3">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>{t('impact.profileStrength')}</span>
              <span className="font-semibold">{t('impact.allStar')}</span>
            </div>
            <div className="w-full bg-secondary rounded-full h-2">
              <div className="bg-success-green h-2 rounded-full" style={{ width: "95%" }}></div>
            </div>
          </div>

          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>{t('impact.networkGrowth')}</span>
              <span className="font-semibold">+23%</span>
            </div>
            <div className="w-full bg-secondary rounded-full h-2">
              <div className="bg-primary h-2 rounded-full" style={{ width: "78%" }}></div>
            </div>
          </div>

          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>{t('impact.engagementRate')}</span>
              <span className="font-semibold">{t('impact.exceptional')}</span>
            </div>
            <div className="w-full bg-secondary rounded-full h-2">
              <div className="bg-accent-gold h-2 rounded-full" style={{ width: "89%" }}></div>
            </div>
          </div>
        </div>

        <div className="mt-4 p-3 bg-linear-to-r from-primary/5 to-primary/10 rounded-lg border border-primary/20">
          <p className="text-xs text-muted-foreground mb-2">
            {t('impact.topPercent')}
          </p>
          <button className="btn-linkedin-premium w-full text-xs py-2">
            {t('impact.unlockAnalytics')}
          </button>
        </div>
      </div>

      {/* Hashtag Suggestions */}
      <div className="linkedin-card">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-lg flex items-center">
            <Hash className="h-5 w-5 mr-2" />
            {t('hashtags.title')}
          </h3>
        </div>

        <div className="flex flex-wrap gap-2">
          <span className="badge-expert text-xs">{t('hashtags.leadership')}</span>
          <span className="badge-expert text-xs">{t('hashtags.innovation')}</span>
          <span className="badge-expert text-xs">{t('hashtags.growthMindset')}</span>
          <span className="badge-expert text-xs">{t('hashtags.synergy')}</span>
          <span className="badge-expert text-xs">{t('hashtags.disruption')}</span>
          <span className="badge-expert text-xs">{t('hashtags.agile')}</span>
          <span className="badge-expert text-xs">{t('hashtags.transformation')}</span>
          <span className="badge-expert text-xs">{t('hashtags.digital')}</span>
        </div>
      </div>
    </div>
  );
}
