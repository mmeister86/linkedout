"use client";

import { TrendingUp, Briefcase, Users, Hash, Calendar, Plus, MoreHorizontal } from "lucide-react";

export default function TrendingCard() {
  const trendingTopics = [
    {
      category: "Technology",
      title: "AI Revolution in Workplace",
      posts: "2,847 posts",
      change: "+15%"
    },
    {
      category: "Leadership",
      title: "Synergy Management",
      posts: "1,923 posts",
      change: "+8%"
    },
    {
      category: "Productivity",
      title: "Hustle Culture 2.0",
      posts: "1,456 posts",
      change: "+22%"
    },
    {
      category: "Innovation",
      title: "Blockchain Everything",
      posts: "987 posts",
      change: "+5%"
    },
    {
      category: "Career",
      title: "Quiet Quitting Solutions",
      posts: "756 posts",
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
      text: "You have 3 meetings today"
    },
    {
      icon: <Users className="h-4 w-4" />,
      text: "5 people viewed your profile"
    },
    {
      icon: <Briefcase className="h-4 w-4" />,
      text: "2 new job opportunities"
    }
  ];

  return (
    <div className="space-y-4">
      {/* Trending Topics */}
      <div className="linkedin-card">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-lg flex items-center">
            <TrendingUp className="h-5 w-5 mr-2" />
            Trending Now
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
                    <span className="badge-trending text-xs">TRENDING</span>
                    {index === 0 && <span className="badge-premium text-xs">HOT</span>}
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
          <h3 className="font-semibold text-lg">People You May Know</h3>
          <button className="text-primary text-sm hover:underline">See all</button>
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
                  <p className="text-xs text-muted-foreground">{person.mutualConnections} mutual connections</p>
                </div>
              </div>
              <button className="btn-linkedin-primary text-xs py-1 px-3">
                Connect
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
            Today at Work
          </h3>
          <button className="text-primary text-sm hover:underline">View all</button>
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
            Your Professional Impact
          </h3>
        </div>

        <div className="space-y-3">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Profile Strength</span>
              <span className="font-semibold">All-Star</span>
            </div>
            <div className="w-full bg-secondary rounded-full h-2">
              <div className="bg-success-green h-2 rounded-full" style={{ width: "95%" }}></div>
            </div>
          </div>

          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Network Growth</span>
              <span className="font-semibold">+23%</span>
            </div>
            <div className="w-full bg-secondary rounded-full h-2">
              <div className="bg-primary h-2 rounded-full" style={{ width: "78%" }}></div>
            </div>
          </div>

          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Engagement Rate</span>
              <span className="font-semibold">Exceptional</span>
            </div>
            <div className="w-full bg-secondary rounded-full h-2">
              <div className="bg-accent-gold h-2 rounded-full" style={{ width: "89%" }}></div>
            </div>
          </div>
        </div>

        <div className="mt-4 p-3 bg-linear-to-r from-primary/5 to-primary/10 rounded-lg border border-primary/20">
          <p className="text-xs text-muted-foreground mb-2">
            {"You're in the top 1% of professionals this week! Your content is generating 3x more engagement than average."}
          </p>
          <button className="btn-linkedin-premium w-full text-xs py-2">
            Unlock Premium Analytics
          </button>
        </div>
      </div>

      {/* Hashtag Suggestions */}
      <div className="linkedin-card">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-lg flex items-center">
            <Hash className="h-5 w-5 mr-2" />
            Suggested Hashtags
          </h3>
        </div>

        <div className="flex flex-wrap gap-2">
          <span className="badge-expert text-xs">#Leadership</span>
          <span className="badge-expert text-xs">#Innovation</span>
          <span className="badge-expert text-xs">#GrowthMindset</span>
          <span className="badge-expert text-xs">#Synergy</span>
          <span className="badge-expert text-xs">#Disruption</span>
          <span className="badge-expert text-xs">#Agile</span>
          <span className="badge-expert text-xs">#Transformation</span>
          <span className="badge-expert text-xs">#Digital</span>
        </div>
      </div>
    </div>
  );
}
