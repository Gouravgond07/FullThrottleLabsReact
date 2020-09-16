import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../app/store';
import { ActivityPeriod, UserModel } from '../models/user.model';
import { getAllUserWithActivityPeriods } from '../services/user.service';

interface UserSliceData {
  users: UserModel[];
  selectedUserActivity: ActivityPeriod[]
}

const initialState: UserSliceData = {
  users: [],
  selectedUserActivity: []
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<UserModel[]>) => {
      state.users = action.payload;
    },
    selectUserById: (state, action: PayloadAction<{id: String, filterDate?: {month: string, day: string, year: string}}>) => {
      
      const data = state.users.find(x => x.id === action.payload.id);
      if(data && data.activity_periods) {
        if(action.payload.filterDate) {
          const { day, month, year} = action.payload.filterDate;
          state.selectedUserActivity = data.activity_periods.filter(x => x.start_time.includes(`${month} ${day} ${year}`))
        } else {
          state.selectedUserActivity = data.activity_periods;
        }
        
      } else {
        state.selectedUserActivity = [];
      }
    }
  },
});

export const { setUsers, selectUserById } = userSlice.actions;

export const getUsers = (): AppThunk => dispatch => {
    getAllUserWithActivityPeriods()
    .then(users => {
        dispatch(setUsers(users));
    }).catch(err => alert('Api is not working properly or json file does not exist'))
};

export const selectUser = (state: RootState) => state.user.users.map(({activity_periods, ...rest}) => rest);
export const selectUserActivity = (state: RootState) => state.user.selectedUserActivity.map(x => {
  let temp = x.start_time.split(" ");
  temp.pop();
  let date = temp.join(" ");
  let dateObj = new Date(date);
  let startTime = x.start_time.split(" ").pop();
  let endTime = x.end_time.split(" ").pop();
  return { date, startTime, endTime, dateObj};
});

export default userSlice.reducer;
