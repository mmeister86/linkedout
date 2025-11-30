"use client";

import { User, MapPin, Award, TrendingUp, BookOpen, Star } from "lucide-react";
import { useTranslations } from "next-intl";

export default function ProfileCard() {
  const t = useTranslations('profile');
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
        <h2 className="font-semibold text-lg text-center">{t('name')}</h2>
        <p className="text-muted-foreground text-sm text-center mb-1">{t('title')}</p>
        <div className="flex items-center text-muted-foreground text-xs mb-3">
          <MapPin className="h-3 w-3 mr-1" />
          <span>{t('location')}</span>
        </div>

        {/* Premium Badge */}
        <div className="badge-premium flex items-center gap-1 mb-4">
          <Star className="h-3 w-3" />
          {t('premiumMember')}
        </div>
      </div>

      {/* Stats */}
      <div className="flex justify-around py-3 border-t border-border mb-3">
        <div className="text-center">
          <p className="font-semibold text-lg">1,234</p>
          <p className="text-xs text-muted-foreground">{t('stats.connections')}</p>
        </div>
        <div className="text-center">
          <p className="font-semibold text-lg">89</p>
          <p className="text-xs text-muted-foreground">{t('stats.endorsements')}</p>
        </div>
      </div>

      {/* View Profile Button */}
      <button className="btn-linkedin-primary w-full mb-3">
        {t('viewProfile')}
      </button>

      {/* Satirical Achievement Badges */}
      <div className="border-t border-border pt-3">
        <h3 className="font-semibold text-sm mb-2 flex items-center">
          <Award className="h-4 w-4 mr-1" />
          {t('achievements.title')}
        </h3>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="badge-expert text-xs">Expert</div>
            <span className="text-xs text-muted-foreground">{t('achievements.corporateJargon')}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="badge-influencer text-xs">Influencer</div>
            <span className="text-xs text-muted-foreground">{t('achievements.meaninglessPosts')}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="badge-hustler text-xs">Hustler</div>
            <span className="text-xs text-muted-foreground">{t('achievements.worked24h')}</span>
          </div>
        </div>
      </div>

      {/* Professional Skills (Satirical) */}
      <div className="border-t border-border pt-3 mt-3">
        <h3 className="font-semibold text-sm mb-2 flex items-center">
          <BookOpen className="h-4 w-4 mr-1" />
          {t('skills.title')}
        </h3>
        <div className="flex flex-wrap gap-1">
          <span className="badge-expert text-xs">{t('skills.synergy')}</span>
          <span className="badge-expert text-xs">{t('skills.leverage')}</span>
          <span className="badge-expert text-xs">{t('skills.paradigmShift')}</span>
          <span className="badge-expert text-xs">{t('skills.disruption')}</span>
          <span className="badge-expert text-xs">{t('skills.blockchain')}</span>
          <span className="badge-expert text-xs">{t('skills.aiBuzzwords')}</span>
        </div>
      </div>

      {/* Professional Stats (Satirical) */}
      <div className="border-t border-border pt-3 mt-3">
        <h3 className="font-semibold text-sm mb-2 flex items-center">
          <TrendingUp className="h-4 w-4 mr-1" />
          {t('impact.title')}
        </h3>
        <div className="space-y-1">
          <div className="flex justify-between text-xs">
            <span className="text-muted-foreground">{t('impact.profileViews')}</span>
            <span className="font-semibold">10,234</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-muted-foreground">{t('impact.searchAppearances')}</span>
            <span className="font-semibold">5,678</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-muted-foreground">{t('impact.postImpressions')}</span>
            <span className="font-semibold">1.2M</span>
          </div>
        </div>
      </div>

      {/* Upgrade to Premium CTA */}
      <div className="mt-4 p-3 bg-linear-to-r from-accent-gold/10 to-accent-gold/5 rounded-lg border border-accent-gold/20">
        <div className="flex items-center gap-2 mb-2">
          <Star className="h-4 w-4 text-accent-gold" />
          <span className="font-semibold text-sm">{t('premium.unlockFeatures')}</span>
        </div>
        <p className="text-xs text-muted-foreground mb-2">
          {t('premium.description')}
        </p>
        <button className="btn-linkedin-premium w-full text-xs py-2">
          {t('premium.tryFree')}
        </button>
      </div>
    </div>
  );
}
