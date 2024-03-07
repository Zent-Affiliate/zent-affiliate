import {all, call, fork, put, takeLatest} from "redux-saga/effects";
import {setTitlePage} from "../app";
import {getListProjects} from "@/api/project";
import {
  createProjectFail,
  createProjectSuccess,
  deleteProjectFail,
  deleteProjectSuccess,
  setDataFilter,
  setErrorInfoProject,
  setVisibleModalCreateProject,
  setVisibleModalDeleteProject,
  setVisibleModalUpdateProject,
  updateProjectFail,
  updateProjectSuccess,
} from ".";
import { handleNotification } from "@/utils/helper";

function* loadRouteData() {
  yield put(setTitlePage("Quản lý dự án"));
  yield put(setDataFilter({
    keySearch: "",
    perPage: 20,
    page: 1,
    field: null,
    sortOrder: null,
    server: null,
    tags: [],
    status: null
  }));
  yield put(getListProjects());
}

function* handleActions() {
  
  yield takeLatest(createProjectSuccess, function* () {
    yield put(getListProjects());
    yield put(setVisibleModalCreateProject(false));
    handleNotification("success", "Tạo mới dự án thành công.");
  });
  
  yield takeLatest(createProjectFail, function* (action) {
    let status = action.payload.status;
    if (status === 400) {
      let errors = action.payload.data.detail;
      yield put(
        setErrorInfoProject({
          ...errors,
        })
      );
    } else {
      handleNotification("error", "Tạo mới dự án thất bại.");
    }
  });
  
  yield takeLatest(updateProjectSuccess, function* () {
    yield put(getListProjects());
    yield put(setVisibleModalUpdateProject(false));
    handleNotification("success", "Cập nhật dự án thành công.");
  });
  
  yield takeLatest(updateProjectFail, function* (action) {
    let status = action.payload.status;
    if (status === 400) {
      let errors = action.payload.data.detail;
      yield put(
        setErrorInfoProject({
          ...errors,
        })
      );
    } else {
      handleNotification("error", "Cập nhật dự án thất bại.");
    }
  });
  
  yield takeLatest(deleteProjectSuccess, function* () {
    handleNotification("success", "Xoá dự án thành công.");
    yield put(setVisibleModalDeleteProject(false));
    yield put(getListProjects());
  });
  
  yield takeLatest(deleteProjectFail, function* () {
    yield call(handleNotification, "error", "Xoá dự án thất bại.");
  });
  
}

export default function* userSaga() {
  yield all([fork(loadRouteData), fork(handleActions)]);
}