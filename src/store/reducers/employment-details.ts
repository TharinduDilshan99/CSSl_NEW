// third-party
import { createSlice } from '@reduxjs/toolkit';

// project imports
import { axiosServices } from 'utils/axios';
import { dispatch } from '../index';

// types
import { EmploymentDetails, DefaultRootStateProps, queryParamsProps1, EmploymentDetailsPostAdd } from 'types/employment-details';

const initialState: DefaultRootStateProps['employmentDetails'] = {
  error: null,
  success: null,
  employmentDetailss: null,
  employmentDetails: null,
  isLoading: false,
  selectEmploymentDetailss: null
};

const slice = createSlice({
  name: 'employmentDetails',
  initialState,
  reducers: {
    // TO INITIAL STATE
    hasInitialState(state) {
      state.error = null;
      state.success = null;
      state.isLoading = false;
    },

    // HAS ERROR
    hasError(state, action) {
      state.error = action.payload;
    },

    startLoading(state) {
      state.isLoading = true;
    },

    finishLoading(state) {
      state.isLoading = false;
    },

    // POST EmploymentDetails
    addEmploymentDetailsSuccess(state, action) {
      state.success = 'Fuel Type created successfully.';
    },

    // GET Fuel Type
    fetchEmploymentDetailsSuccess(state, action) {
      state.employmentDetails = action.payload;
      state.success = null;
    },

    // GET ALL Fuel TypeS
    fetchEmploymentDetailssSuccess(state, action) {
      state.employmentDetailss = action.payload;
      state.success = null;
    },

    // GET ALL SELECT Fuel TypeS
    fetchSelectEmploymentDetailssSuccess(state, action) {
      state.selectEmploymentDetailss = action.payload;
      state.success = null;
    },

    // UPDATE EmploymentDetails
    updateEmploymentDetailsSuccess(state, action) {
      state.success = 'Fuel Type updated successfully.';
    },

    // DELETE EmploymentDetails
    deleteEmploymentDetailsSuccess(state, action) {
      state.success = 'Fuel Type deleted successfully.';
    }
  }
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

/**
 * TO INITIAL STATE
 * @returns
 */
export function toInitialState1() {
  return async () => {
    dispatch(slice.actions.hasInitialState());
  };
}

/**
 * POST EmploymentDetails
 * @param newEmploymentDetails
 * @returns
 */
export function addEmploymentDetails(newEmploymentDetails: EmploymentDetailsPostAdd) {
  return async () => {
    dispatch(slice.actions.startLoading());

    try {
      const response = await axiosServices.post('/base/reference/employmentDetails/add', newEmploymentDetails);
      dispatch(slice.actions.addEmploymentDetailsSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    } finally {
      dispatch(slice.actions.finishLoading());
    }
  };
}

/**
 * GET EmploymentDetails
 * @param id
 * @returns
 */
export function fetchEmploymentDetails(id: number) {
  return async () => {
    dispatch(slice.actions.startLoading());

    try {
      const response = await axiosServices.get(`/base/reference/employmentDetails/get/${id}`);
      dispatch(slice.actions.fetchEmploymentDetailsSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    } finally {
      dispatch(slice.actions.finishLoading());
    }
  };
}

/**
 * GET ALL EmploymentDetailsES
 * @param queryParams
 * @returns
 */
export function fetchEmploymentDetailss(queryParams: queryParamsProps1) {
  return async () => {
    dispatch(slice.actions.startLoading());

    try {
      const response = await axiosServices.get('/base/reference/employmentDetails/tbl', { params: queryParams });
      dispatch(slice.actions.fetchEmploymentDetailssSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    } finally {
      dispatch(slice.actions.finishLoading());
    }
  };
}

/**
 * GET ALL EmploymentDetailsS SELECT
 ** @returns
 */
export function fetchSelectEmploymentDetailss() {
  return async () => {
    dispatch(slice.actions.startLoading());

    try {
      const response = await axiosServices.get('/base/reference/employmentDetails/all');
      dispatch(slice.actions.fetchSelectEmploymentDetailssSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    } finally {
      dispatch(slice.actions.finishLoading());
    }
  };
}


/**
 * UPDATE EmploymentDetails
 * @param updatedEmploymentDetails
 * @returns
 */
export function updateEmploymentDetails(updatedEmploymentDetails: EmploymentDetails) {
  return async () => {
    dispatch(slice.actions.startLoading());

    try {
      const response = await axiosServices.put(`/base/reference/employmentDetails/update/${updatedEmploymentDetails.employmentDetailsId}`, updatedEmploymentDetails);
      dispatch(slice.actions.updateEmploymentDetailsSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    } finally {
      dispatch(slice.actions.finishLoading());
    }
  };
}

/**
 * DELETE EmploymentDetails
 * @param EmploymentDetailsId
 * @returns
 */
export function deleteEmploymentDetails(EmploymentDetailsId: number) {
  return async () => {
    dispatch(slice.actions.startLoading());

    try {
      await axiosServices.delete(`/base/reference/employmentDetails/delete/${EmploymentDetailsId}`);
      dispatch(slice.actions.deleteEmploymentDetailsSuccess(EmploymentDetailsId));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    } finally {
      dispatch(slice.actions.finishLoading());
    }
  };
}
