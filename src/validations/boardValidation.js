import Joi from 'joi';
import { StatusCodes } from 'http-status-codes';
import ApiError from '~/utils/ApiError';

const createNew = async (req, res, next) => {
    const correctCondition = Joi.object({
        title: Joi.string().required().min(3).max(70).trim().strict().messages({
            'any.required': 'Title is required (ChibaoDev)',
            'string.empty': 'Title is not allowed to be empty (ChibaoDev)',
            'string.min': 'Title min 3 chars (ChibaoDev)',
            'string.max': 'Title max 50 chars (ChibaoDev)',
            'string,trim':
                'Title must not have leading or trailing whitespace (ChibaoDev)',
        }),
        description: Joi.string().required().min(3).max(256).trim().strict(),
    });
    try {
        // abortEarly: false trả về nhiều lỗi validation
        await correctCondition.validateAsync(req.body, { abortEarly: false });
        // Validate hợp lệ thì next sang controller
        next();
    } catch (error) {
        const errorMessage = new Error(error).message;
        const customError = new ApiError(
            StatusCodes.UNPROCESSABLE_ENTITY,
            errorMessage,
        );
        next(customError);
    }
};

export const boardValidation = {
    createNew,
};
