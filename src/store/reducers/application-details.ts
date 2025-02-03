// third-party
import { createSlice } from '@reduxjs/toolkit';

// project imports
import { axiosServices } from 'utils/axios';
import { dispatch } from '../index';

// types
import { ApplicationDetails, DefaultRootStateProps, queryParamsProps, ApplicationDetailsPostAdd } from 'types/application-details';

const initialState: DefaultRootStateProps['applicationDetails'] = {
  error: null,
  success: null,
  applicationDetailss: null,
  applicationDetails: null,
  isLoading: false,
  selectApplicationDetailss: null
};

const slice = createSlice({
  name: 'applicationDetails',
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

    // POST ApplicationDetails
    addApplicationDetailsSuccess(state, action) {
      state.success = 'Fuel Type created successfully.';
    },

    // GET Fuel Type
    fetchApplicationDetailsSuccess(state, action) {
      state.applicationDetails = action.payload;
      state.success = null;
    },

    // GET ALL Fuel TypeS
    fetchApplicationDetailssSuccess(state, action) {
      state.applicationDetailss = action.payload;
      state.success = null;
    },

    // GET ALL SELECT Fuel TypeS
    fetchSelectApplicationDetailssSuccess(state, action) {
      state.selectApplicationDetailss = action.payload;
      state.success = null;
    },

    // UPDATE ApplicationDetails
    updateApplicationDetailsSuccess(state, action) {
      state.success = 'Fuel Type updated successfully.';
    },

    // DELETE ApplicationDetails
    deleteApplicationDetailsSuccess(state, action) {
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
export function toInitialState() {
  return async () => {
    dispatch(slice.actions.hasInitialState());
  };
}

/**
 * POST ApplicationDetails
 * @param newApplicationDetails
 * @returns
 */
export function addApplicationDetails(newApplicationDetails: ApplicationDetailsPostAdd) {
  return async () => {
    dispatch(slice.actions.startLoading());

    try {
      const response = await axiosServices.post('/base/reference/applicationDetails/add', newApplicationDetails);
      dispatch(slice.actions.addApplicationDetailsSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    } finally {
      dispatch(slice.actions.finishLoading());
    }
  };
}

/**
 * GET ApplicationDetails
 * @param id
 * @returns
 */
export function fetchApplicationDetails(id: number) {
  return async () => {
    dispatch(slice.actions.startLoading());

    try {
      const response = await axiosServices.get(`/base/reference/applicationDetails/get/${id}`);
      dispatch(slice.actions.fetchApplicationDetailsSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    } finally {
      dispatch(slice.actions.finishLoading());
    }
  };
}

/**
 * GET ALL ApplicationDetailsES
 * @param queryParams
 * @returns
 */
export function fetchApplicationDetailss(queryParams: queryParamsProps) {
  return async () => {
    dispatch(slice.actions.startLoading());

    try {
      const response = await axiosServices.get('/base/reference/applicationDetails/tbl', { params: queryParams });
      dispatch(slice.actions.fetchApplicationDetailssSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    } finally {
      dispatch(slice.actions.finishLoading());
    }
  };
}

/**
 * GET ALL ApplicationDetailsS SELECT
 ** @returns
 */
export function fetchSelectApplicationDetailss() {
  return async () => {
    dispatch(slice.actions.startLoading());

    try {
      const response = await axiosServices.get('/base/reference/applicationDetails/all');
      dispatch(slice.actions.fetchSelectApplicationDetailssSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    } finally {
      dispatch(slice.actions.finishLoading());
    }
  };
}


/**
 * UPDATE ApplicationDetails
 * @param updatedApplicationDetails
 * @returns
 */
export function updateApplicationDetails(updatedApplicationDetails: ApplicationDetails) {
  return async () => {
    dispatch(slice.actions.startLoading());

    try {
      const response = await axiosServices.put(`/base/reference/applicationDetails/update/${updatedApplicationDetails.applicationDetailsId}`, updatedApplicationDetails);
      dispatch(slice.actions.updateApplicationDetailsSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    } finally {
      dispatch(slice.actions.finishLoading());
    }
  };
}

/**
 * DELETE ApplicationDetails
 * @param ApplicationDetailsId
 * @returns
 */
export function deleteApplicationDetails(ApplicationDetailsId: number) {
  return async () => {
    dispatch(slice.actions.startLoading());

    try {
      await axiosServices.delete(`/base/reference/applicationDetails/delete/${ApplicationDetailsId}`);
      dispatch(slice.actions.deleteApplicationDetailsSuccess(ApplicationDetailsId));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    } finally {
      dispatch(slice.actions.finishLoading());
    }
  };
}
