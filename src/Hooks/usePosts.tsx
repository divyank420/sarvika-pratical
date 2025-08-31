import { useState } from 'react';
import useDebounce from './useDebounce';
import type { IPost, UsePostsReturn } from '../model/PostModel';
import { useQuery, useQueryClient } from '@tanstack/react-query';

const getPosts = async (): Promise<IPost[]> => {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts')
  if (!res.ok) throw new Error('Network error')
  return res.json()
}

const usePosts = (): UsePostsReturn => {
  const [search, setSearch] = useState<string>('');
  const [debounceSearch] = useDebounce(search, 1000);
  const queryClient = useQueryClient();
  const { data, isLoading, error } = useQuery<IPost[], Error>({
    queryKey: ['posts'],
    queryFn: getPosts,
    staleTime: 1000 * 60,
  })

  const updatePost = (id: number, newValues: Partial<IPost>) => {
    queryClient.setQueryData<IPost[]>(['posts'], (oldData) => {
      if (!oldData) return [];
      return oldData.map((post) =>
        post.id === id ? { ...post, ...newValues } : post
      );
    });
  };

  const posts = data
    ?.filter((post) =>
      post.title.toLowerCase().includes(debounceSearch.trim().toLowerCase())
    )
    //.slice(0, page * 5)


  return [posts, isLoading, error?.message || '', setSearch, updatePost];
}
export default usePosts;
