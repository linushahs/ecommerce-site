export function displayDate(inputDate: string): string {
    const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric', year: 'numeric' };
    const dateObject = new Date(inputDate);
    const formattedDate = dateObject.toLocaleDateString('en-US', options);

    return formattedDate;
}

export const convertImageToBase64 = async (file: File): Promise<string | undefined> => {
    return new Promise((resolve) => {
        const reader = new FileReader();

        reader.onload = () => {
            const base64String = reader.result as string;
            resolve(base64String);
        };

        reader.readAsDataURL(file);
    });
};