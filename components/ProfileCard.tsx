"use client";

import { User, MapPin, Award, TrendingUp, BookOpen, Star } from "lucide-react";

export default function ProfileCard() {
  return (
    <div className="linkedin-card mb-4">
      <div className="flex flex-col items-center">
        {/* Profile Picture */}
        <div className="relative mb-4">
          <div className="h-20 w-20 rounded-full bg-primary flex items-center justify-center">
            <User className="h-12 w-12 text-primary-foreground" />
          </div>
          <div className="absolute bottom-0 right-0 h-6 w-6 bg-green-500 rounded-full border-2 border-card"></div>
        </div>

        {/* Name and Title */}
        <h2 className="font-semibold text-lg text-center">Professional User</h2>
        <p className="text-muted-foreground text-sm text-center mb-1">Thought Leader at Synergy Corp</p>
        <div className="flex items-center text-muted-foreground text-xs mb-3">
          <MapPin className="h-3 w-3 mr-1" />
          <span>Silicon Valley, CA</span>
        </div>

        {/* Premium Badge */}
        <div className="badge-premium flex items-center gap-1 mb-4">
          <Star className="h-3 w-3" />
          Premium Member
        </div>
      </div>

      {/* Stats */}
      <div className="flex justify-around py-3 border-t border-border mb-3">
        <div className="text-center">
          <p className="font-semibold text-lg">1,234</p>
          <p className="text-xs text-muted-foreground">Connections</p>
        </div>
        <div className="text-center">
          <p className="font-semibold text-lg">89</p>
          <p className="text-xs text-muted-foreground">Endorsements</p>
        </div>
      </div>

      {/* View Profile Button */}
      <button className="btn-linkedin-primary w-full mb-3">
        View Profile
      </button>

      {/* Satirical Achievement Badges */}
      <div className="border-t border-border pt-3">
        <h3 className="font-semibold text-sm mb-2 flex items-center">
          <Award className="h-4 w-4 mr-1" />
          Recent Achievements
        </h3>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="badge-expert text-xs">Expert</div>
            <span className="text-xs text-muted-foreground">Corporate Jargon Mastery</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="badge-influencer text-xs">Influencer</div>
            <span className="text-xs text-muted-foreground">500+ Meaningless Posts</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="badge-hustler text-xs">Hustler</div>
            <span className="text-xs text-muted-foreground">Worked 24h Straight</span>
          </div>
        </div>
      </div>

      {/* Professional Skills (Satirical) */}
      <div className="border-t border-border pt-3 mt-3">
        <h3 className="font-semibold text-sm mb-2 flex items-center">
          <BookOpen className="h-4 w-4 mr-1" />
          Top Skills
        </h3>
        <div className="flex flex-wrap gap-1">
          <span className="badge-expert text-xs">Synergy</span>
          <span className="badge-expert text-xs">Leverage</span>
          <span className="badge-expert text-xs">Paradigm Shift</span>
          <span className="badge-expert text-xs">Disruption</span>
          <span className="badge-expert text-xs">Blockchain</span>
          <span className="badge-expert text-xs">AI Buzzwords</span>
        </div>
      </div>

      {/* Professional Stats (Satirical) */}
      <div className="border-t border-border pt-3 mt-3">
        <h3 className="font-semibold text-sm mb-2 flex items-center">
          <TrendingUp className="h-4 w-4 mr-1" />
          Professional Impact
        </h3>
        <div className="space-y-1">
          <div className="flex justify-between text-xs">
            <span className="text-muted-foreground">Profile Views</span>
            <span className="font-semibold">10,234</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-muted-foreground">Search Appearances</span>
            <span className="font-semibold">5,678</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-muted-foreground">Post Impressions</span>
            <span className="font-semibold">1.2M</span>
          </div>
        </div>
      </div>

      {/* Upgrade to Premium CTA */}
      <div className="mt-4 p-3 bg-linear-to-r from-accent-gold/10 to-accent-gold/5 rounded-lg border border-accent-gold/20">
        <div className="flex items-center gap-2 mb-2">
          <Star className="h-4 w-4 text-accent-gold" />
          <span className="font-semibold text-sm">Unlock Premium Features</span>
        </div>
        <p className="text-xs text-muted-foreground mb-2">
          See who viewed your profile, access advanced analytics, and appear in 3x more searches!
        </p>
        <button className="btn-linkedin-premium w-full text-xs py-2">
          Try Premium Free
        </button>
      </div>
    </div>
  );
}
