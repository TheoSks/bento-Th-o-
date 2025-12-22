'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { GitHubWidgetData } from '@/types';
import { WidgetSkeleton } from './WidgetSkeleton';
import { formatNumber } from '@/lib/utils';

interface GitHubProfile {
  login: string;
  name: string | null;
  avatar_url: string;
  bio: string | null;
  followers: number;
  following: number;
  public_repos: number;
}

interface GitHubWidgetProps {
  data: GitHubWidgetData;
}

export function GitHubWidget({ data }: GitHubWidgetProps) {
  const [profile, setProfile] = useState<GitHubProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://api.github.com/users/${data.username}`
        );
        if (!response.ok) throw new Error('Failed to fetch profile');
        const profileData = await response.json();
        setProfile(profileData);
      } catch (err) {
        setError('Failed to load GitHub profile');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (data.username) {
      fetchProfile();
    }
  }, [data.username]);

  if (loading) return <WidgetSkeleton />;

  if (error || !profile) {
    return (
      <div className="github-widget flex items-center justify-center">
        <p className="text-muted text-sm">{error || 'Unable to load profile'}</p>
      </div>
    );
  }

  return (
    <a
      href={`https://github.com/${data.username}${data.repo ? `/${data.repo}` : ''}`}
      target="_blank"
      rel="noopener noreferrer"
      className="github-widget hover:bg-opacity-80 transition-colors"
    >
      <div className="header">
        <Image
          src={profile.avatar_url}
          alt={profile.login}
          width={48}
          height={48}
          className="avatar"
        />
        <div className="info">
          <h3>{profile.name || profile.login}</h3>
          <p>@{profile.login}</p>
        </div>
      </div>

      {data.showContributions && (
        <Image
          src={`https://ghchart.rshah.org/${data.username}`}
          alt="GitHub contribution graph"
          width={400}
          height={80}
          className="contributions"
        />
      )}

      <div className="stats">
        <span>{formatNumber(profile.followers)} followers</span>
        <span>{formatNumber(profile.public_repos)} repos</span>
      </div>
    </a>
  );
}
