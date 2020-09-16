const API = 'user_data.json';
export const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
export interface User {
    id: string,
    real_name: string,
    tz: string
}

export const getAllUserWithActivityPeriods = () => {
    return fetch(API)
    .then(res => res.json())
    .then(data => data.members)
}
