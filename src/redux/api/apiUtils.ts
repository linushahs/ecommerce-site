import { toast } from "sonner";

const handleApiQuery = async<T>(dispatch: any,
    queryFn: Promise<{ data: T }>,
    onSuccess: (data: T) => void,
    onErrorMessage: string) => {
    try {
        const { data } = await queryFn;
        dispatch(onSuccess(data));
    } catch (err) {
        console.error(err);
        toast.error(onErrorMessage);
    }
};

const handleApiMutation = async<T>(dispatch: any,
    queryFn: Promise<{ data: T }>,
    onSuccess: (data: T) => void,
    onSuccessMessage: string,
    onErrorMessage: string) => {
    try {
        const { data } = await queryFn;
        dispatch(onSuccess(data));
        toast.success(onSuccessMessage);
    } catch (err) {
        console.error(err);
        toast.error(onErrorMessage);
    }
};

export { handleApiMutation, handleApiQuery };
