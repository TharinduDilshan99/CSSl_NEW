// third-party
import { createSlice } from '@reduxjs/toolkit';

// project imports
import { axiosServices } from 'utils/axios';
import { dispatch } from '../index';

// types 
import { DefaultRootStateProps, ClusterCodeReqType, listParametersType, ClusterCodesType } from 'types/cluster-code';



// ----------------------------------------------------------------------

const initialState: DefaultRootStateProps['cluster'] = {
  error: null,
  success: null,
  isLoading: false,
  clusterCodeList: null,
  clusterCodeFdd: null,
  clusterCode: null
};

const slice = createSlice({
  name: 'cluster',
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

    // POST Cluster_CODE 
    addClusterCodeSuccess(state, action) {
      state.success = "Cluster Code created successfully."
    },

    // GET Cluster_CODE_BY_ID
    fetchClusterCodeSuccess(state, action) {
      state.clusterCode = action.payload;
      state.success = null
    },

    // GET ALL Cluster_CODE
    fetchClusterCodesSuccess(state, action) {
      state.clusterCodeList = action.payload;
      state.success = null
    },

    // GET ALL Cluster_CODE FOR DROPDOWN
    fetchClusterCodesSuccesFdd(state, action) {
      state.clusterCodeFdd = action.payload;
      state.success = null
    },

    // UPDATE Cluster_CODE
    updateClusterCodeSuccess(state, action) {
      state.success = "Cluster Code updated successfully."
    },

    // DELETE Cluster_CODE
    deleteClusterCodeSuccess(state, action) {
      state.success = "Cluster Code deleted successfully."
    },

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
    dispatch(slice.actions.hasInitialState())
  }
}

/**
 * POST Cluster_CODE
 * @param newClusterCode 
 * @returns 
 */
export function addClusterCode(newClusterCode: ClusterCodeReqType) {
  return async () => {
    dispatch(slice.actions.startLoading());

    try {
      const response = await axiosServices.post('/reference/cluster/create', newClusterCode);
      dispatch(slice.actions.addClusterCodeSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    } finally {
      dispatch(slice.actions.finishLoading());
    }
  };
}

/**
 * GET Cluster_CODE
 * @param ClusterCodeId  
 * @returns 
 */
export function fetchClusterCode(ClusterCodeId: number) {
  return async () => {
    dispatch(slice.actions.startLoading());

    try {
      const response = await axiosServices.get(`/reference/cluster/${ClusterCodeId}`);
      dispatch(slice.actions.fetchClusterCodeSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    } finally {
      dispatch(slice.actions.finishLoading());
    }
  };
}

/**
 * GET ALL Cluster_CODE
 * @param listParameters 
 * @returns 
 */
export function fetchClusterCodes(listParameters: listParametersType) {
  return async () => {
    dispatch(slice.actions.startLoading());

    try {
      const response = await axiosServices.get('/reference/cluster', { params: listParameters });
      dispatch(slice.actions.fetchClusterCodesSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    } finally {
      dispatch(slice.actions.finishLoading());
    }
  };
}

/**
 * GET ALL Cluster_CODE FOR DROPDOWN
 * @returns 
 */
export function fetchClusterCodesFdd() {
  return async () => {
    dispatch(slice.actions.startLoading());

    try {
      const response = await axiosServices.get('/reference/cluster/fdd');
      dispatch(slice.actions.fetchClusterCodesSuccesFdd(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    } finally {
      dispatch(slice.actions.finishLoading());
    }
  };
}

/**
 * UPDATE Cluster_CODE
 * @param updateClusterCode
 * @returns 
 */
export function updateClusterCode(updatedClusterCode: ClusterCodesType) {
  return async () => {
    dispatch(slice.actions.startLoading());

    try {
      const response = await axiosServices.put(`/reference/cluster/${updatedClusterCode.clusterId}`, updatedClusterCode);
      dispatch(slice.actions.updateClusterCodeSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    } finally {
      dispatch(slice.actions.finishLoading());
    }
  };
}

/**
 * DELETE Cluster_CODE
 * @param ClusterCodeId 
 * @returns 
 */
export function deleteClusterCode(ClusterCodeId: number) {
  return async () => {
    dispatch(slice.actions.startLoading());

    try {
      await axiosServices.delete(`/reference/cluster/${ClusterCodeId}`);
      dispatch(slice.actions.deleteClusterCodeSuccess(ClusterCodeId));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    } finally {
      dispatch(slice.actions.finishLoading());
    }
  };
}
