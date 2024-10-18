import { clearStorage } from "./localStroage";
export function noAuthRedirect(obj, cb){
    const { status } = obj.response;
    if (status === 401) {
        clearStorage();
        cb();
        return true;
    }
    return false;
}
