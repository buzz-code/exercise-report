import HttpStatus from 'http-status-codes';
import { CallListHandler } from '../../common-modules/server/utils/callBase';
import { getUserByPhone } from '../utils/queryHelper';
import { YemotCall } from '../utils/yemotCall';

/**
 * Take call and handle it
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export async function handleCall(req, res) {
    if (!req.body) {
        res.status(HttpStatus.BAD_REQUEST).json({
            error: true,
            message: 'request not valid'
        });
        return;
    }

    const callId = req.body.ApiCallId;

    console.log('yemot call data', callId, req.body)
    const user = await getUserByPhone(req.body.ApiDID);
    console.log('user', user)

    const call = await CallListHandler.getCallById(callId, req.body, YemotCall);

    call.process(req.body, res);
}
