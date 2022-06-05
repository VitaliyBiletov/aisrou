import {toast} from "react-toastify";

function notify(type, text){
    const options = {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    }
    switch (type) {
        case "success":
            toast.success(text, options)
            break
        case "error":
            toast.error(text, options)
            break
        default:
            toast.info('Неизвестная ошибка', options)
    }
}

export {notify}