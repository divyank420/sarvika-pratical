import type { IPost } from '../../model/PostModel';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { useThemeStore } from '../../store/themeStore';

interface ScrollingPostProps {
    isLoading: boolean;
    posts: IPost[] | undefined;
    page: number;
    setSelectedPost: (post: IPost) => void;
    setIsModalOpen: (isOpen: boolean) => void;
}

export default function ScrollingPost({ isLoading, posts, page ,setIsModalOpen,setSelectedPost }: ScrollingPostProps) {
    const { theme } = useThemeStore();
    return (
        <div className="flex-1 overflow-y-auto p-4 grid md:grid-cols-1 gap-4">
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                posts && posts.slice(0, page * 10).map((post: IPost) => (
                    <div
                        key={`card-${post.id}`}
                        className="relative cursor-pointer"
                        onClick={() => {
                            setSelectedPost(post);
                            setIsModalOpen(true);
                        }}
                    >
                        <Card className={`w-full hover:shadow-xl transition-shadow duration-300 ease-in-out rounded-lg ${theme === 'dark' ? 'text-white hover:shadow-xl hover:bg-gray-700' : 'bg-white text-black hover:shadow-xl hover:bg-gray-100'}`}>
                            <CardHeader>
                                <CardTitle>{post.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-xs">{post.body}</p>
                            </CardContent>
                        </Card>
                        <div className="absolute top-0 right-0 text-xs text-white bg-gray-500 p-1 px-3 rounded-bl-lg rounded-tr-lg">
                            User ID: {post.userId}
                        </div>
                        <div className="absolute top-0.5 left-0.5 text-xs bg-blue-900 text-white p-1 px-2 rounded-br-lg rounded-tl-lg">
                            {post.id}
                        </div>
                    </div>
                ))
            )}
        </div>
    )
}
