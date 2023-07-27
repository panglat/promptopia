'use client';
import Form from '@components/Form';
import { IPrompt } from '@models/prompt';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { FormEvent, useEffect, useState } from 'react';

type Props = {};

const EditPrompt = (props: Props) => {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const searchParams = useSearchParams();
  const promptId = searchParams.get('id');
  const [post, setPost] = useState<Partial<IPrompt>>({
    prompt: '',
    tag: ''
  });

  useEffect(() => {
    const getPromptDetails = async () => {
      const response = await fetch(`/api/prompt/${promptId}`);
      const { prompt, tag } = await response.json();
      setPost({ prompt, tag });
    };
    if (promptId) getPromptDetails();
  }, [promptId]);

  const UpdatePrompt = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    if (!promptId) return alert('Prompt ID not found');

    try {
      const response = await fetch(`/api/prompt/${promptId}`, {
        method: 'PATCH',
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag
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
      type="Edit"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={UpdatePrompt}
    />
  );
};

export default EditPrompt;
