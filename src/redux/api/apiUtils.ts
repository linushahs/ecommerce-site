import { toast } from "sonner";
import { ProductFilterOptions } from "./interface";



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

const showToastMessages = async (
    queryFulfilled: Promise<{ data: any }>,
    errorMessage: string,
    successMessage?: string,
) => {
    try {
        await queryFulfilled;
        successMessage && toast.success(successMessage || "Operation successful");
    } catch (err) {
        console.error(err);
        toast.error(errorMessage || "Error performing operation");
    }
};



// Utility function to build the API URL with filter options
function buildProductApiUrl(base: string, filters: ProductFilterOptions): string {
    const params: string[] = [];

    const addQueryParam = (key: string, value: string | null) => {
        if (value) {
            params.push(`${key}=${value}`);
        }
    };

    addQueryParam('category', filters.category);
    addQueryParam('order', filters.order);
    addQueryParam('query', filters.query);
    addQueryParam('lp', filters.lp);
    addQueryParam('hp', filters.hp);

    if (params.length > 0) {
        return `${base}?${params.join('&')}`;
    }

    return base;
}

export { handleApiMutation, handleApiQuery, showToastMessages, buildProductApiUrl };
