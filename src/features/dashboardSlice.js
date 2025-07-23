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
            const nextId = state.dashboardItems.length + 1;
            const formattedId = String(nextId).padStart(3, '0');

            const newItem = {
                id: formattedId,
                ...action.payload,
                status: 'Pending', 
            };

            state.dashboardItems.push(newItem);
            state.modalOpen = false;
        }
    },
});

export const { openModal, closeModal, addDashboardItem } = dashboardSlice.actions;
export default dashboardSlice.reducer;
