import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { router } from "../router/Routes";

const sleep = () => new Promise(resolve => setTimeout(resolve, 1000));

axios.defaults.baseURL = "http://localhost:5081/api/";

const respondBody = (response: AxiosResponse) => response.data;

axios.interceptors.response.use(async Response => {
    await sleep();
    return Response
},
    (error: AxiosError) => {
        const { data, status } = error.response as AxiosResponse;
        switch (status) {
            case 400:
                if (data.errors) {
                    const modelStateErrors: string[] = [];
                    for (const key in data.erros) {
                        if (data.error[key]) {
                            modelStateErrors.push(data.errors[key])
                        }
                    }
                    throw modelStateErrors.flat();
                }
                toast.error(data.title);
                break;
            case 401:
                toast.error(data.title);
                break;
            case 500:
                router.navigate('/server-error', { state: {error: data}});
                break;
            default:
                break;
        }

        return Promise.reject(error.response);
    })

const requests = {
    get: (url: string) => axios.get(url).then(respondBody),
    post: (url: string, body: {}) => axios.post(url, body).then(respondBody),
    put: (url: string, body: {}) => axios.put(url, body).then(respondBody),
    delete: (url: string) => axios.delete(url).then(respondBody)
}

const Catalog = {
    list: () => requests.get('products'),
    details: (id: number) => requests.get(`products/${id}`)
}

const TestErrors = {
    get400Error: () => requests.get('buggy/bad-request'),
    get401Error: () => requests.get('buggy/unauthorized'),
    get404Error: () => requests.get('buggy/not-found'),
    get500Error: () => requests.get('buggy/server-error'),
    getValidationError: () => requests.get('buggy/validation-error')
}

const agent = {
    Catalog,
    TestErrors
}

export default agent;