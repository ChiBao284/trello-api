import { StatusCodes } from 'http-status-codes';

const createNew = (req, res, next) => {
    try {
        // console.log('req.body', req.body);
        console.log('req.query', req.query);
        res.status(StatusCodes.OK).json({
            message: 'POST from controller: APIs create new board',
        });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: error.message,
        });
    }
};

export const boardController = {
    createNew,
};
