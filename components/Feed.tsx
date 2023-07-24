'use client';
import React, { useEffect, useState } from 'react';
import PromptCard from './PromptCard';
import { IPrompt } from '@models/prompt';

type PromptCardListProps = {
  data: IPrompt[];
  handleTagClick: (tag: string) => void;
};

const PromptCardList = ({ data, handleTagClick }: PromptCardListProps) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map(post => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

type Props = {};

const Feed = (props: Props) => {
  const [searchText, setSearchText] = useState('');
  const [posts, SetPosts] = useState<IPrompt[]>([]);
  const handleSearchChange = () => {};

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('/api/prompt');
      const data = await response.json();

      SetPosts(data);
    };
    fetchPosts();
  }, []);

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>
      <PromptCardList data={posts} handleTagClick={(tag: string) => {}} />
    </section>
  );
};

export default Feed;
