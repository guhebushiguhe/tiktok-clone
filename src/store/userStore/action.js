export const showMessage = {
  type: "showMessage",
  judgment: true,
};
export const hideMessage = {
  type: "hideMessage",
  judgment: false,
};
export const gsvc = (phone) => {
  return {
    type: "gsvc",
    phone,
  };
};
export const changePassword = (password) => {
  return {
    type: "changePassword",
    password,
  };
};
export const changephone = (value) => {
  return {
    type: "changephone",
    phone: value,
  };
};
export const changeShow = (i) => {
  return {
    type: "changeShow",
    Show: i,
    isHidden: !i,
  };
};
export const ChangeTab = function (tab) {
  return {
    type: "changeTab",
    payload: tab,
  };
};
export const updateData = function (data, userVid) {
  return {
    type: "updateData",
    payload: data[0],
    userVid: userVid,
  };
};
export const changePhotoCenter = function (data, bool) {
  return {
    type: "changePhotoCenter",
    payload: data,
    bool: bool,
  };
};
export const updateMyVideo = function (data) {
  return {
    type: "updateMyVideo",
    payload: data,
  };
};
export const updateDynamic = function (data) {
  return {
    type: "updateDynamic",
    payload: data,
  };
};
export const updateLike = function (data) {
  return {
    type: "updateLike",
    payload: data,
  };
};
export const freshUser = function (data) {
  return {
    type: "freshUser",
    payload: data,
  };
};
export const changeUserCheckUpdate = function (data, vid) {
  return {
    type: "changeUserCheckUpdate",
    payload: data,
    vid: vid,
  };
};
