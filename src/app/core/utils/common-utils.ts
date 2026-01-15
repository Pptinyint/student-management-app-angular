export const splitFullName = (fullName: string) => {
    const nameParts = fullName ? fullName.trim().split(/\s+/) : [];
    return {
        firstName: nameParts[0] || '',
        lastName: nameParts.length > 1 ? nameParts[nameParts.length - 1] : '',
        middleName: nameParts.length > 2 ? nameParts.slice(1, -1).join(' ') : ''
    };
}