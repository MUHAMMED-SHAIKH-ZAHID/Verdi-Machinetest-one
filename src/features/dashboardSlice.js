// features/dashboardSlice.js
import { createSlice } from '@reduxjs/toolkit';

const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState: {
        modalOpen: false,
        dashboardItems: [],
    },
    reducers: {
        openModal: (state) => {
            state.modalOpen = true;
        },
        closeModal: (state) => {
            state.modalOpen = false;
        },
        addDashboardItem: (state, action) => {
            const newItem = {
                id: state?.dashboardItems?.length + 1, // or use nanoid()
                ...action?.payload,
                status: 'Pending', // default
            };
            state?.dashboardItems.push(newItem);
            state.modalOpen = false; // ✅ close the modal here directly
        },
    },
});

export const { openModal, closeModal, addDashboardItem } = dashboardSlice.actions;
export default dashboardSlice.reducer;
