import Joi, { date } from 'joi';
import { GET_DB } from '~/config/mongodb';
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from '~/utils/validators';

//Define Collection (Name & Schema)  Collection === table

const BOARD_COLLECTION_NAME = 'boards';
const BOARD_COLLECTION_SHEMA = Joi.object({
    title: Joi.string().required().min(3).max(70).trim().strict(),
    description: Joi.string().required().min(3).max(256).trim().strict(),
    slug: Joi.string.required().min(3).trim().strict(),
    columnOrderIds: Joi.array()
        .items(
            Joi.string()
                .pattern(OBJECT_ID_RULE)
                .message(OBJECT_ID_RULE_MESSAGE),
        )
        .default([]),
    createdAt: Joi.date().timestamp('javascript').default([Date.now]),
    updatedAt: Joi.date().timestamp('javascript').default([null]),
    _destroy: Joi.boolean().default(false),
});

const createNew = async (data) => {
    try {
        const createdBoard = await GET_DB()
            .collection(BOARD_COLLECTION_NAME)
            .insertOne(data);
        return createdBoard;
    } catch (error) {
        throw new Error();
    }
};

export const boardModel = {
    BOARD_COLLECTION_NAME,
    BOARD_COLLECTION_SHEMA,
    createNew,
};
