export interface ActivityPeriod {
    start_time: string;
    end_time: string;
}

export interface UserModel {
    id: string;
    real_name: string;
    tz: string;
    activity_periods: ActivityPeriod[];
}