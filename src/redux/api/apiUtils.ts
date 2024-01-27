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
    const params = [];

    if (filters.category) {
        params.push(`category=${filters.category}`);
    }

    if (filters.order) {
        params.push(`order=${filters.order}`);
    }

    if (filters.query) {
        params.push(`query=${filters.query}`);
    }

    if (params.length > 0) {
        return `${base}?${params.join('&')}`;
    }

    return base;
}

export { handleApiMutation, handleApiQuery, showToastMessages, buildProductApiUrl };
