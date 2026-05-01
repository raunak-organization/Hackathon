'use client';

import React, { useRef, useState } from 'react';
import {
  Camera,
  Mail,
  MapPin,
  Link as LinkIcon,
  MessageCircle,
  Globe,
  Pencil,
} from 'lucide-react';
import { Button } from '@/ui/Button';
import { Card } from '@/ui/Card';
import { ActivityFeed } from './ActivityFeed';

export function UserProfile() {
  const [coverImage, setCoverImage] = useState<string | null>(null);
  const [avatarImage, setAvatarImage] = useState<string | null>(null);

  const coverInputRef = useRef<HTMLInputElement>(null);
  const avatarInputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="p-8 max-w-[1000px] mx-auto w-full">
      {/* COVER */}
      <div
        className="h-[250px] rounded-(--border-radius) border border-(--border) relative overflow-hidden bg-linear-to-br from-(--bg-secondary) to-blue-500/20"
        style={
          coverImage
            ? {
                backgroundImage: `url(${coverImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }
            : {}
        }
      >
        <input
          type="file"
          ref={coverInputRef}
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) setCoverImage(URL.createObjectURL(file));
          }}
          className="hidden"
        />

        <button
          onClick={() => coverInputRef.current?.click()}
          className="absolute bottom-4 right-4 flex items-center gap-2 px-4 py-2 text-sm font-medium text-white rounded-md bg-black/50 backdrop-blur hover:bg-black/70 transition"
        >
          <Camera size={16} />
          Edit Cover
        </button>
      </div>

      {/* HEADER */}
      <div className="flex justify-between items-end mt-[-60px] px-6 mb-6">
        {/* AVATAR */}
        <div className="relative">
          <input
            type="file"
            ref={avatarInputRef}
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) setAvatarImage(URL.createObjectURL(file));
            }}
            className="hidden"
          />

          <div
            className="w-[120px] h-[120px] rounded-full border-4 border-(--bg-primary) flex items-center justify-center text-[2.5rem] font-bold text-white shadow-lg bg-linear-to-br from-blue-500 to-purple-500"
            style={
              avatarImage
                ? {
                    backgroundImage: `url(${avatarImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }
                : {}
            }
          >
            {!avatarImage && 'JD'}
          </div>

          <button
            onClick={() => avatarInputRef.current?.click()}
            className="absolute bottom-[5px] right-[5px] w-8 h-8 rounded-full flex items-center justify-center border border-(--border) bg-(--bg-secondary) text-(--text-primary) hover:bg-(--bg-tertiary) transition"
          >
            <Camera size={14} />
          </button>
        </div>

        {/* ACTIONS */}
        <div className="flex gap-4 pb-[10px]">
          <Button variant="secondary" leftIcon={<Pencil size={16} />}>
            Edit Profile
          </Button>
          <Button variant="secondary">Message</Button>
        </div>
      </div>

      {/* INFO */}
      <div className="px-6 mb-10">
        <h1 className="text-3xl font-bold text-(--text-primary) mb-1">
          John Doe
        </h1>

        <p className="text-[1.1rem] text-(--text-secondary) mb-4">
          Senior DevOps Engineer @ TechCorp | Open Source Contributor
        </p>

        <div className="flex flex-wrap gap-6 mb-6 text-sm text-(--text-secondary)">
          <span className="flex items-center gap-2">
            <MapPin size={16} /> San Francisco, CA
          </span>
          <span className="flex items-center gap-2">
            <LinkIcon size={16} />
            <a href="#" className="text-blue-500 hover:underline">
              johndoe.dev
            </a>
          </span>
          <span className="flex items-center gap-2">
            <Mail size={16} /> john@example.com
          </span>
        </div>

        <div className="flex gap-3">
          <button className="p-2 rounded-full border border-(--border) bg-(--bg-secondary) text-(--text-secondary) hover:bg-(--bg-tertiary) hover:text-(--text-primary) transition">
            <Globe size={20} />
          </button>
          <button className="p-2 rounded-full border border-(--border) bg-(--bg-secondary) text-(--text-secondary) hover:bg-(--bg-tertiary) hover:text-(--text-primary) transition">
            <MessageCircle size={20} />
          </button>
        </div>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-8 px-6">
        {/* SIDEBAR */}
        <div>
          <Card className="p-6">
            <h3 className="text-[1.1rem] font-semibold mb-6 text-(--text-primary)">
              Stats
            </h3>

            <div className="flex flex-col gap-5">
              {[
                ['Deployments', '1,248'],
                ['Commits', '3,492'],
                ['Followers', '842'],
                ['Following', '124'],
              ].map(([label, value], i, arr) => (
                <div
                  key={label}
                  className={`flex justify-between items-center ${
                    i !== arr.length - 1
                      ? 'border-b border-(--border) pb-5'
                      : ''
                  }`}
                >
                  <span className="text-[0.95rem] text-(--text-secondary)">
                    {label}
                  </span>
                  <span className="font-semibold text-(--text-primary)">
                    {value}
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* MAIN */}
        <div>
          <Card className="p-6">
            <h3 className="text-[1.1rem] font-semibold mb-6 text-(--text-primary)">
              Recent Activity
            </h3>
            <ActivityFeed />
          </Card>
        </div>
      </div>
    </div>
  );
}
