import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Address {
  id: number;
  created: string;
  modified: string;
  name: string;
  phone_number: string;
  pick_at: string;
  pickup_station: number;
  address_type: string;
  id_number: string;
  town: string;
  county_name: string;
  sub_county_name: string;
  ward_name: string;
  description: string;
  county: number;
  sub_county: number;
  ward: number;
}

interface ShippingAddressState {
  selectedAddress: Address | null;
}

const initialState: ShippingAddressState = {
  selectedAddress: null,
};

const addressSlice = createSlice({
  name: 'address',
  initialState,
  reducers: {
    setShippingAddress(state, action: PayloadAction<Address>) {
      state.selectedAddress = action.payload;
    },
    clearShippingAddress(state) {
      state.selectedAddress = null;
    },
  },
});

export const { setShippingAddress, clearShippingAddress } = addressSlice.actions;
export default addressSlice.reducer;
