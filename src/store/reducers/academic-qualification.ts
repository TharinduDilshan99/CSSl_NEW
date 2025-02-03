// third-party
import { createSlice } from '@reduxjs/toolkit';

// project imports
import { axiosServices } from 'utils/axios';
import { dispatch } from '../index';

// types
import { AcademicQualification, DefaultRootStateProps, queryParamsProps1, AcademicQualificationPostAdd } from 'types/academic-qualification';

const initialState: DefaultRootStateProps['academicQualification'] = {
  error: null,
  success: null,
  academicQualifications: null,
  academicQualification: null,
  isLoading: false,
  selectAcademicQualifications: null
};

const slice = createSlice({
  name: 'academicQualification',
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

    // POST AcademicQualification
    addAcademicQualificationSuccess(state, action) {
      state.success = 'Fuel Type created successfully.';
    },

    // GET Fuel Type
    fetchAcademicQualificationSuccess(state, action) {
      state.academicQualification = action.payload;
      state.success = null;
    },

    // GET ALL Fuel TypeS
    fetchAcademicQualificationsSuccess(state, action) {
      state.academicQualifications = action.payload;
      state.success = null;
    },

    // GET ALL SELECT Fuel TypeS
    fetchSelectAcademicQualificationsSuccess(state, action) {
      state.selectAcademicQualifications = action.payload;
      state.success = null;
    },

    // UPDATE AcademicQualification
    updateAcademicQualificationSuccess(state, action) {
      state.success = 'Fuel Type updated successfully.';
    },

    // DELETE AcademicQualification
    deleteAcademicQualificationSuccess(state, action) {
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
 * POST AcademicQualification
 * @param newAcademicQualification
 * @returns
 */
export function addAcademicQualification(newAcademicQualification: AcademicQualificationPostAdd) {
  return async () => {
    dispatch(slice.actions.startLoading());

    try {
      const response = await axiosServices.post('/base/reference/academicQualification/add', newAcademicQualification);
      dispatch(slice.actions.addAcademicQualificationSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    } finally {
      dispatch(slice.actions.finishLoading());
    }
  };
}

/**
 * GET AcademicQualification
 * @param id
 * @returns
 */
export function fetchAcademicQualification(id: number) {
  return async () => {
    dispatch(slice.actions.startLoading());

    try {
      const response = await axiosServices.get(`/base/reference/academicQualification/get/${id}`);
      dispatch(slice.actions.fetchAcademicQualificationSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    } finally {
      dispatch(slice.actions.finishLoading());
    }
  };
}

/**
 * GET ALL AcademicQualificationES
 * @param queryParams
 * @returns
 */
export function fetchAcademicQualifications(queryParams: queryParamsProps1) {
  return async () => {
    dispatch(slice.actions.startLoading());

    try {
      const response = await axiosServices.get('/base/reference/academicQualification/tbl', { params: queryParams });
      dispatch(slice.actions.fetchAcademicQualificationsSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    } finally {
      dispatch(slice.actions.finishLoading());
    }
  };
}

/**
 * GET ALL AcademicQualificationS SELECT
 ** @returns
 */
export function fetchSelectAcademicQualifications() {
  return async () => {
    dispatch(slice.actions.startLoading());

    try {
      const response = await axiosServices.get('/base/reference/academicQualification/all');
      dispatch(slice.actions.fetchSelectAcademicQualificationsSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    } finally {
      dispatch(slice.actions.finishLoading());
    }
  };
}


/**
 * UPDATE AcademicQualification
 * @param updatedAcademicQualification
 * @returns
 */
export function updateAcademicQualification(updatedAcademicQualification: AcademicQualification) {
  return async () => {
    dispatch(slice.actions.startLoading());

    try {
      const response = await axiosServices.put(`/base/reference/academicQualification/update/${updatedAcademicQualification.academicQualificationId}`, updatedAcademicQualification);
      dispatch(slice.actions.updateAcademicQualificationSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    } finally {
      dispatch(slice.actions.finishLoading());
    }
  };
}

/**
 * DELETE AcademicQualification
 * @param AcademicQualificationId
 * @returns
 */
export function deleteAcademicQualification(AcademicQualificationId: number) {
  return async () => {
    dispatch(slice.actions.startLoading());

    try {
      await axiosServices.delete(`/base/reference/academicQualification/delete/${AcademicQualificationId}`);
      dispatch(slice.actions.deleteAcademicQualificationSuccess(AcademicQualificationId));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    } finally {
      dispatch(slice.actions.finishLoading());
    }
  };
}
