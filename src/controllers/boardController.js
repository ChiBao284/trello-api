import { StatusCodes } from 'http-status-codes';
import ApiError from '~/utils/ApiError';
import { boardService } from '~/services/boardService';

const createNew = async (req, res, next) => {
    try {
        console.log('req.body', req.body);
        // console.log('req.query', req.query);

        const createdBoard = await boardService.createNew(req.body);

        res.status(StatusCodes.OK).json(createdBoard);
    } catch (error) {
        next(error);
    }
};

export const boardController = {
    createNew,
};
