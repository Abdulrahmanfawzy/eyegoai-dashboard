import { toast } from "react-toastify";

export const toastify = (msg , icon) => {
    switch(icon){
        case "success":
            return toast.success(msg)
        case "error":
            return toast.error(msg)
    }
};