import { useState, useCallback, useEffect } from 'react';
import usePosts from '../../Hooks/usePosts';
import type { IPost } from '../../model/PostModel';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import Modal from '../../components/ui/Modal';
import EditPost from './editPost';
import Table, { type Column } from '../../components/ui/Table';
import edit from '../../../public/edit.png';
import ScrollingPost from './scrollingPost';

export default function Posts() {
    const [page, setPage] = useState<number>(1);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [selectedPost, setSelectedPost] = useState<IPost | null>(null);

    const [posts, isLoading, error, setSearch, updatePost] = usePosts();
    
    const handleSave = useCallback((data: IPost) => {
        if (selectedPost) {
            updatePost(selectedPost.id, data);
            setIsModalOpen(false);
        }
    }, [selectedPost]);

    const columns: Column<IPost>[] = [
        { key: 'id', label: 'Post ID' },
        { key: 'title', label: 'Title' },
        { key: 'body', label: 'Body' },
        { key: 'userId', label: 'User ID' },
    ];

    return (
        <div className="flex h-[calc(100vh-100px)] ">
            <div className="flex flex-col h-[calc(100vh-100px)] w-full sm:w-3/4 md:w-1/4 mx-auto border rounded-lg shadow-lg">
                <div className="p-4 border-b bg-blue-900 dark:bg-gray-800 sticky top-0 z-10 rounded-t-lg">
                    <h3 className="text-xl font-semibold mb-2 text-white">Posts</h3>
                    {error && <span className="text-red-500 text-sm">{error}</span>}
                    <Input
                        type="text"
                        placeholder="Search Posts"
                        className="bg-white text-black"
                        onInput={(e) => {
                            setPage(1);
                            setSearch((e.target as HTMLInputElement).value);
                        }}
                    />
                </div>
                <ScrollingPost
                    isLoading={isLoading}
                    posts={posts}
                    page={page}
                    setIsModalOpen={setIsModalOpen}
                    setSelectedPost={setSelectedPost}
                />

                <div className="p-2 border-t sticky bottom-0 z-10 flex justify-between items-center">
                    <Button disabled={page === 1} onClick={() => setPage((prev) => prev - 1)}>
                        Previous
                    </Button>
                    <span>Page {page}</span>
                    <Button
                        onClick={() => setPage((prev) => prev + 1)}
                        disabled={posts && posts.length - 1 < page * 10 || false}
                    >
                        Next
                    </Button>
                </div>
                <Modal isOpen={isModalOpen} title="Edit Post" onClose={() => setIsModalOpen(false)}>
                    {selectedPost && (
                        <EditPost
                            selectedPost={selectedPost}
                            setSelectedPost={setSelectedPost}
                            handleSave={handleSave}
                            handleClose={() => setIsModalOpen(false)}
                        />
                    )}
                </Modal>
            </div>
            <div className='flex flex-col h-[calc(100vh-100px)] w-full sm:w-3/4 md:w-3/4 mx-auto border rounded-lg shadow-lg ml-4'>
                <div className="flex-1 overflow-y-auto">
                    {posts && posts.length > 0 && !isLoading
                        ? (<Table
                            data={posts}
                            columns={columns}
                            currentPage={page}
                            onPageChange={setPage}
                            pageSize={10}
                            totalItems={posts.length}
                            renderActions={(post: IPost) => (
                                <div className="flex gap-2">
                                    <Button onClick={() => { setSelectedPost(post); setIsModalOpen(true); }} variant='rose'>
                                        <img src={edit} alt="edit" width={20} height={20} />
                                    </Button>
                                </div>
                            )}
                        />)
                        : <p>No posts found.</p>
                    }
                </div>
            </div>
        </div>
    );
}
