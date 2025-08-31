
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import type { IEditPost, IPost } from '../../model/PostModel';
import { useForm, type SubmitHandler } from 'react-hook-form';



export default function EditPost({ selectedPost, handleSave, handleClose }: IEditPost) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<IPost>({defaultValues:selectedPost});

    const onSubmit : SubmitHandler<IPost> = (data:IPost) => handleSave(data);
    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4 text-black"
        >
            <label className='text-black'>Title</label>
            <Input
                type="text"
                {...register("title", { required: true })}
                className="border p-2 rounded w-full"
                placeholder="Title"
            />
            {errors.title && <span className="text-sm text-red-600">Title field is required</span>}

            <label className=''>Body</label>
            <textarea
                {...register("body", { required: true })}
                className="border p-2 rounded w-full"
                rows={4}
                placeholder="Body"
            />
            {errors.body && <span className="text-sm text-red-600">Body field is required</span>}

            <div className="flex justify-end gap-2">
                <Button
                    type="button"
                    onClick={handleClose}
                    className="px-3 py-1 bg-gray-400 text-white rounded"
                >
                    Cancel
                </Button>
                <Button
                    type="submit"
                    className="px-3 py-1 bg-green-600 text-white rounded"
                >
                    Save
                </Button>
            </div>
        </form>
    )
}
