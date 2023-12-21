export const Constant = () => {
    const url = import.meta.ApiList?.API_BASE_URL;
    const api = {
     // get dept by hospital ID 
     apiDeptSta  : url + "/api/master/v1/get-dept-by-hospid" ,
     apiStateId : url + "/api/master/v1/get-city-by-stateid" ,
     apiConst : url + "/api/master/v1/get-doctors-by-hospdept" ,
     apiShift : url + "/api/master/v1/get-shifts-by-hospconsultant" 
    }
    return api ;

}