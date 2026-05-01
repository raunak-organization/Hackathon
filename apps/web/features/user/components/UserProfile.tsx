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
import { Button } from '../../../components/Button';
import { Card } from '../../../components/Card';
import { ActivityFeed } from './ActivityFeed';

export function UserProfile() {
  const [coverImage, setCoverImage] = useState<string | null>(null);
  const [avatarImage, setAvatarImage] = useState<string | null>(null);

  const coverInputRef = useRef<HTMLInputElement>(null);
  const avatarInputRef = useRef<HTMLInputElement>(null);

  const handleCoverUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCoverImage(URL.createObjectURL(file));
    }
  };

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatarImage(URL.createObjectURL(file));
    }
  };

  return (
    <>
      <div className="profileContainer">
        <div
          className="coverPhoto"
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
            onChange={handleCoverUpload}
            accept="image/*"
            style={{ display: 'none' }}
          />
          <button
            className="editCoverBtn"
            onClick={() => coverInputRef.current?.click()}
          >
            <Camera size={16} />
            <span>Edit Cover</span>
          </button>
        </div>

        <div className="profileHeader">
          <div className="avatarWrapper">
            <input
              type="file"
              ref={avatarInputRef}
              onChange={handleAvatarUpload}
              accept="image/*"
              style={{ display: 'none' }}
            />
            <div
              className="avatar"
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
              className="editAvatarBtn"
              onClick={() => avatarInputRef.current?.click()}
            >
              <Camera size={14} />
            </button>
          </div>

          <div className="headerActions">
            <Button variant="secondary" leftIcon={<Pencil size={16} />}>
              Edit Profile
            </Button>
            <Button variant="secondary">Message</Button>
          </div>
        </div>

        <div className="profileInfo">
          <h1 className="userName">John Doe</h1>
          <p className="userHeadline">
            Senior DevOps Engineer @ TechCorp | Open Source Contributor
          </p>

          <div className="metaInfo">
            <span className="metaItem">
              <MapPin size={16} /> San Francisco, CA
            </span>
            <span className="metaItem">
              <LinkIcon size={16} /> <a href="#">johndoe.dev</a>
            </span>
            <span className="metaItem">
              <Mail size={16} /> john@example.com
            </span>
          </div>

          <div className="socialLinks">
            <button className="socialBtn">
              <Globe size={20} />
            </button>
            <button className="socialBtn">
              <MessageCircle size={20} />
            </button>
          </div>
        </div>

        <div className="gridContainer">
          <div className="sidebar">
            <Card padding="md" className="statsCard">
              <h3 className="cardTitle">Stats</h3>
              <div className="statsList">
                <div className="statItem">
                  <span className="statLabel">Deployments</span>
                  <span className="statValue">1,248</span>
                </div>
                <div className="statItem">
                  <span className="statLabel">Commits</span>
                  <span className="statValue">3,492</span>
                </div>
                <div className="statItem">
                  <span className="statLabel">Followers</span>
                  <span className="statValue">842</span>
                </div>
                <div className="statItem">
                  <span className="statLabel">Following</span>
                  <span className="statValue">124</span>
                </div>
              </div>
            </Card>
          </div>

          <div className="mainContent">
            <Card padding="md" className="activityCard">
              <h3 className="cardTitle">Recent Activity</h3>
              <ActivityFeed />
            </Card>
          </div>
        </div>
      </div>
      <style jsx global>{`
        .profileContainer {
          padding: 2rem;
          max-width: 1000px;
          margin: 0 auto;
          width: 100%;
        }
        .coverPhoto {
          height: 250px;
          border-radius: var(--border-radius);
          background: linear-gradient(
            135deg,
            var(--bg-secondary) 0%,
            rgba(59, 130, 246, 0.2) 100%
          );
          position: relative;
          overflow: hidden;
          border: 1px solid var(--border);
        }
        .editCoverBtn {
          position: absolute;
          bottom: 1rem;
          right: 1rem;
          background-color: rgba(0, 0, 0, 0.5);
          backdrop-filter: blur(4px);
          color: white;
          padding: 0.5rem 1rem;
          border-radius: 6px;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.85rem;
          font-weight: 500;
          transition: var(--transition);
          border: none;
          cursor: pointer;
        }
        .editCoverBtn:hover {
          background-color: rgba(0, 0, 0, 0.7);
        }
        .profileHeader {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-top: -60px;
          padding: 0 1.5rem;
          margin-bottom: 1.5rem;
        }
        .avatarWrapper {
          position: relative;
        }
        .avatar {
          width: 120px;
          height: 120px;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--accent-blue), #8b5cf6);
          border: 4px solid var(--bg-primary);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2.5rem;
          font-weight: 700;
          color: white;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
        }
        .editAvatarBtn {
          position: absolute;
          bottom: 5px;
          right: 5px;
          background-color: var(--bg-secondary);
          border: 1px solid var(--border);
          color: var(--text-primary);
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: var(--transition);
          cursor: pointer;
        }
        .editAvatarBtn:hover {
          background-color: var(--bg-tertiary);
        }
        .headerActions {
          display: flex;
          gap: 1rem;
          padding-bottom: 10px;
        }
        .profileInfo {
          padding: 0 1.5rem;
          margin-bottom: 2.5rem;
        }
        .userName {
          font-size: 2rem;
          font-weight: 700;
          margin: 0 0 0.25rem 0;
          color: var(--text-primary);
        }
        .userHeadline {
          font-size: 1.1rem;
          color: var(--text-secondary);
          margin: 0 0 1rem 0;
        }
        .metaInfo {
          display: flex;
          flex-wrap: wrap;
          gap: 1.5rem;
          margin-bottom: 1.5rem;
        }
        .metaItem {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: var(--text-secondary);
          font-size: 0.9rem;
        }
        .metaItem a {
          color: var(--accent-blue);
        }
        .metaItem a:hover {
          text-decoration: underline;
        }
        .socialLinks {
          display: flex;
          gap: 0.75rem;
        }
        .socialBtn {
          color: var(--text-secondary);
          padding: 0.5rem;
          border-radius: 50%;
          background-color: var(--bg-secondary);
          border: 1px solid var(--border);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: var(--transition);
          cursor: pointer;
        }
        .socialBtn:hover {
          color: var(--text-primary);
          background-color: var(--bg-tertiary);
        }
        .gridContainer {
          display: grid;
          grid-template-columns: 1fr 2fr;
          gap: 2rem;
          padding: 0 1.5rem;
        }
        .cardTitle {
          font-size: 1.1rem;
          font-weight: 600;
          margin: 0 0 1.5rem 0;
          color: var(--text-primary);
        }
        .statsList {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }
        .statItem {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid var(--border);
          padding-bottom: 1.25rem;
        }
        .statItem:last-child {
          border-bottom: none;
          padding-bottom: 0;
        }
        .statLabel {
          color: var(--text-secondary);
          font-size: 0.95rem;
        }
        .statValue {
          font-weight: 600;
          color: var(--text-primary);
        }
        .feedContainer {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        .feedItem {
          position: relative;
          display: flex;
          gap: 1.25rem;
        }
        .feedLine {
          position: absolute;
          left: 17px;
          top: 36px;
          bottom: -1.5rem;
          width: 2px;
          background-color: var(--border);
        }
        .feedIcon {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          z-index: 1;
        }
        .feedContent {
          flex: 1;
          padding-bottom: 0.5rem;
        }
        .feedHeader {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 0.25rem;
        }
        .feedTitle {
          margin: 0;
          font-size: 1rem;
          font-weight: 600;
        }
        .feedTime {
          font-size: 0.8rem;
          color: var(--text-secondary);
        }
        .feedDesc {
          margin: 0;
          font-size: 0.95rem;
          color: var(--text-secondary);
          line-height: 1.5;
        }
        @media (max-width: 768px) {
          .gridContainer {
            grid-template-columns: 1fr;
          }
          .profileHeader {
            flex-direction: column;
            align-items: center;
            gap: 1.5rem;
          }
          .headerActions {
            width: 100%;
            justify-content: center;
          }
          .profileInfo {
            text-align: center;
          }
          .metaInfo {
            justify-content: center;
          }
          .socialLinks {
            justify-content: center;
          }
        }
      `}</style>
    </>
  );
}
