import React, { useContext, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import AuthContext from '../context/AuthContext';
import { GiTrophy, GiSparkles } from 'react-icons/gi';
import toast from 'react-hot-toast';

const badgeDefinitions = {
  'Bronze Dose': {
    title: 'Bronze Dose',
    description: 'Awarded for logging your first dose.',
    color: 'bg-amber-500/10 text-amber-200 border-amber-500/30',
  },
  '3-Day Streak': {
    title: '3-Day Streak',
    description: 'Stay consistent for 3 days to unlock this badge.',
    color: 'bg-slate-700 text-sky-200 border-sky-500/30',
  },
  '7-Day Guardian': {
    title: '7-Day Guardian',
    description: 'Maintain a 7-day streak and become a guardian of your routine.',
    color: 'bg-violet-700 text-violet-100 border-violet-500/30',
  },
};

const BadgesPage = () => {
  const { api } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const { data } = await api.get('/api/auth/profile');
        setProfile(data);
      } catch (error) {
        toast.error('Unable to load badges.');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [api]);

  const earnedBadges = profile?.badges || [];
  const nextBadge = earnedBadges.includes('3-Day Streak') ? '7-Day Guardian' : '3-Day Streak';

  return (
    <div className="min-h-screen bg-[#09080f] p-4 sm:p-6 lg:p-8 text-white">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-6xl mx-auto"
      >
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-violet-300">Badge Realm</p>
            <h1 className="text-4xl font-bold text-white mt-2">Rewards & Streaks</h1>
            <p className="mt-3 max-w-2xl text-gray-300">
              Log your doses, build streaks, and earn badges to keep users engaged. Your next milestone is just one day away.
            </p>
          </div>
          <div className="rounded-3xl border border-violet-500/20 bg-[#161427]/80 p-5 shadow-[0_0_40px_rgba(105,79,217,0.2)]">
            <p className="text-sm uppercase tracking-[0.3em] text-violet-300">Current streak</p>
            <p className="mt-2 text-4xl font-semibold text-white">{profile?.currentStreak ?? 0}</p>
            <p className="text-sm text-gray-300 mt-1">days in a row</p>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
          {Object.values(badgeDefinitions).map((badge) => {
            const earned = earnedBadges.includes(badge.title);
            return (
              <motion.div
                key={badge.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className={`rounded-3xl border p-6 shadow-xl ${badge.color} ${earned ? 'ring-2 ring-emerald-300/30' : 'opacity-70'}`}
              >
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm uppercase tracking-[0.3em] text-gray-300">{earned ? 'Earned' : 'Next'}</p>
                    <h2 className="mt-4 text-2xl font-semibold text-white">{badge.title}</h2>
                  </div>
                  <div className="rounded-2xl bg-white/10 p-3 text-3xl text-violet-200">
                    <GiTrophy />
                  </div>
                </div>
                <p className="mt-6 text-gray-300 leading-7">{badge.description}</p>
                {earned ? (
                  <span className="mt-6 inline-flex rounded-full bg-emerald-500/10 px-4 py-2 text-sm text-emerald-200">
                    Collected
                  </span>
                ) : (
                  <span className="mt-6 inline-flex rounded-full bg-white/10 px-4 py-2 text-sm text-gray-200">
                    {nextBadge === badge.title ? 'Next goal' : 'Locked'}
                  </span>
                )}
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-8 rounded-3xl border border-violet-500/20 bg-[#161427]/80 p-6"
        >
          <div className="flex items-center gap-3 text-violet-200">
            <GiSparkles className="text-2xl" />
            <h3 className="text-xl font-semibold">Keep your streak alive</h3>
          </div>
          <p className="mt-4 text-gray-300">
            Log each dose to keep the streak going. When you reach 3 days in a row, your badge will upgrade from Bronze to Silver. Keep going for the 7-Day Guardian reward.
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default BadgesPage;
