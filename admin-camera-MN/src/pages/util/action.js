import instance from "../../api/instance";

export const fetchDataCamera = async () => {
    try {
        const res = await instance.request({
            url: "/camera",
            method: "GET",
        })
        return res.data.data;
    } catch (error) {
        console.log(error);
    }
}