// third-party
import { createSlice } from '@reduxjs/toolkit';

// project imports
import { axiosServices } from 'utils/axios';
import { dispatch } from '../index';

// types
import { ProffesionalQualification, DefaultRootStateProps, queryParamsProps1, ProffesionalQualificationPostAdd } from 'types/proffesional-membership';

const initialState: DefaultRootStateProps['proffesionalQualification'] = {
  error: null,
  success: null,
  proffesionalQualifications: null,
  proffesionalQualification: null,
  isLoading: false,
  selectProffesionalQualifications: null
};

const slice = createSlice({
  name: 'proffesionalQualification',
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

    // POST ProffesionalQualification
    addProffesionalQualificationSuccess(state, action) {
      state.success = 'Fuel Type created successfully.';
    },

    // GET Fuel Type
    fetchProffesionalQualificationSuccess(state, action) {
      state.proffesionalQualification = action.payload;
      state.success = null;
    },

    // GET ALL Fuel TypeS
    fetchProffesionalQualificationsSuccess(state, action) {
      state.proffesionalQualifications = action.payload;
      state.success = null;
    },

    // GET ALL SELECT Fuel TypeS
    fetchSelectProffesionalQualificationsSuccess(state, action) {
      state.selectProffesionalQualifications = action.payload;
      state.success = null;
    },

    // UPDATE ProffesionalQualification
    updateProffesionalQualificationSuccess(state, action) {
      state.success = 'Fuel Type updated successfully.';
    },

    // DELETE ProffesionalQualification
    deleteProffesionalQualificationSuccess(state, action) {
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
 * POST ProffesionalQualification
 * @param newProffesionalQualification
 * @returns
 */
export function addProffesionalQualification(newProffesionalQualification: ProffesionalQualificationPostAdd) {
  return async () => {
    dispatch(slice.actions.startLoading());

    try {
      const response = await axiosServices.post('/base/reference/proffesionalQualification/add', newProffesionalQualification);
      dispatch(slice.actions.addProffesionalQualificationSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    } finally {
      dispatch(slice.actions.finishLoading());
    }
  };
}

/**
 * GET ProffesionalQualification
 * @param id
 * @returns
 */
export function fetchProffesionalQualification(id: number) {
  return async () => {
    dispatch(slice.actions.startLoading());

    try {
      const response = await axiosServices.get(`/base/reference/proffesionalQualification/get/${id}`);
      dispatch(slice.actions.fetchProffesionalQualificationSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    } finally {
      dispatch(slice.actions.finishLoading());
    }
  };
}

/**
 * GET ALL ProffesionalQualificationES
 * @param queryParams
 * @returns
 */
export function fetchProffesionalQualifications(queryParams: queryParamsProps1) {
  return async () => {
    dispatch(slice.actions.startLoading());

    try {
      const response = await axiosServices.get('/base/reference/proffesionalQualification/tbl', { params: queryParams });
      dispatch(slice.actions.fetchProffesionalQualificationsSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    } finally {
      dispatch(slice.actions.finishLoading());
    }
  };
}

/**
 * GET ALL ProffesionalQualificationS SELECT
 ** @returns
 */
export function fetchSelectProffesionalQualifications() {
  return async () => {
    dispatch(slice.actions.startLoading());

    try {
      const response = await axiosServices.get('/base/reference/proffesionalQualification/all');
      dispatch(slice.actions.fetchSelectProffesionalQualificationsSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    } finally {
      dispatch(slice.actions.finishLoading());
    }
  };
}


/**
 * UPDATE ProffesionalQualification
 * @param updatedProffesionalQualification
 * @returns
 */
export function updateProffesionalQualification(updatedProffesionalQualification: ProffesionalQualification) {
  return async () => {
    dispatch(slice.actions.startLoading());

    try {
      const response = await axiosServices.put(`/base/reference/proffesionalQualification/update/${updatedProffesionalQualification.proffesionalQualificationId}`, updatedProffesionalQualification);
      dispatch(slice.actions.updateProffesionalQualificationSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    } finally {
      dispatch(slice.actions.finishLoading());
    }
  };
}

/**
 * DELETE ProffesionalQualification
 * @param ProffesionalQualificationId
 * @returns
 */
export function deleteProffesionalQualification(ProffesionalQualificationId: number) {
  return async () => {
    dispatch(slice.actions.startLoading());

    try {
      await axiosServices.delete(`/base/reference/proffesionalQualification/delete/${ProffesionalQualificationId}`);
      dispatch(slice.actions.deleteProffesionalQualificationSuccess(ProffesionalQualificationId));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    } finally {
      dispatch(slice.actions.finishLoading());
    }
  };
}
