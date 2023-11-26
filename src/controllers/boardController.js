import { StatusCodes } from 'http-status-codes';
import ApiError from '~/utils/ApiError';

const createNew = (req, res, next) => {
    try {
        // console.log('req.body', req.body);
        console.log('req.query', req.query);
        res.status(StatusCodes.OK).json({
            message: 'POST from controller: APIs create new board',
        });
    } catch (error) {
        const errorMessage = new Error(error).message;
        const customMessage = new ApiError(
            StatusCodes.INTERNAL_SERVER_ERROR,
            errorMessage,
        );
        next(customMessage);
    }
};

export const boardController = {
    createNew,
};
