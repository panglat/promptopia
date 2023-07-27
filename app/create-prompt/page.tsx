'use client';
import Form from '@components/Form';
import { IPrompt } from '@models/prompt';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { FormEvent, useState } from 'react';

type Props = {};

const CreatePrompt = (props: Props) => {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const { data: session } = useSession();
  const [post, setPost] = useState<Partial<IPrompt>>({
    prompt: '',
    tag: ''
  });

  const createPrompt = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    try {
      const response = await fetch('/api/prompt/new', {
        method: 'POST',
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
          // @ts-ignore
          userId: session?.user?.id
        })
      });
      if (response.ok) {
        router.push('/');
      }
    } catch (error) {
      console.error('Create Post failed', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Form
      type="Create"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={createPrompt}
    />
  );
};

export default CreatePrompt;
