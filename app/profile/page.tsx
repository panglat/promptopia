'use client';
import Profile from '@components/Profile';
import { IPrompt } from '@models/prompt';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

type Props = {};

const MyProfile = (props: Props) => {
  const { data: session } = useSession();
  const router = useRouter();
  const [posts, SetPosts] = useState<IPrompt[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // @ts-ignore
        const response = await fetch(`/api/users/${session?.user?.id}/posts`);
        const data = await response.json();

        SetPosts(data);
      } catch (error) {
        console.error('Failed to update the post', error);
      }
    };
    // @ts-ignore
    if (session?.user?.id) fetchPosts();
  }, [session]);

  const handleEdit = (post: IPrompt) => {
    router.push(`/update-prompt?id=${post._id}`);
  };

  const handleDelete = async (post: IPrompt) => {
    const hasConfirmed = confirm(
      'Are you sure you want to delete this prompt?'
    );

    if (hasConfirmed) {
      try {
        await fetch(`/api/prompt/${post._id.toString()}`, { method: 'DELETE' });

        const filteredPosts = posts.filter(p => p._id !== post._id);
        SetPosts(filteredPosts);
      } catch (error) {
        console.error('Failed to delete post', error);
      }
    }
  };

  return (
    <Profile
      name="My"
      desc="Welcome to your personalized profile page"
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default MyProfile;
