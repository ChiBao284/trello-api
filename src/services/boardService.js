/* eslint-disable no-useless-catch */
import ApiError from '~/utils/ApiError';
import { slugify } from '~/utils/formatter';

const createNew = async (reqBody) => {
    try {
        // Xử lí logic dữ liệu tùy dự án
        const newBoard = {
            ...reqBody,
            slug: slugify(reqBody.title),
        };
        // Gọi tới tầng model để xử lý lưu bản ghi newboard vào trong database
        //..

        //làm thêm các xử lý logic khác với các collection khác tùy đặt thù dự án,..

        // Push notification về cho admin khi có 1 bản mới được tạo

        //trả kết quả về, trong service luôn phải có return
        return newBoard;
    } catch (error) {
        throw error;
    }
};

export const boardService = {
    createNew,
};
