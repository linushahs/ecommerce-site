export function displayDate(inputDate: string): string {
    const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric', year: 'numeric' };
    const dateObject = new Date(inputDate);
    const formattedDate = dateObject.toLocaleDateString('en-US', options);

    return formattedDate;
}

