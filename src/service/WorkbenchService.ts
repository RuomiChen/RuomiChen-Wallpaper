import { useMyFetch } from "../utils/request";

export const WorkbenchService = {
    createProject: async (bodyData: any) => {
        const { data } = await useMyFetch('/api/creator/create').post(bodyData).json()
        console.log(data);
        return data
    }
};
