import { CallBase } from "./callBase";
import format from 'string-format';
import * as queryHelper from './queryHelper';
import Report from "../models/report.model";

export class YemotCall extends CallBase {
    constructor(params, callId, user) {
        super(params, callId, user);
    }

    async start() {
        await this.getTexts();
        try {
            const student = await queryHelper.getStudentByUserIdAndPhone(this.user.id, this.params.ApiPhone);
            if (student) {
                await this.handleStudentCall(student);
            }
            else {
                await this.send(
                    this.id_list_message({ type: 'text', text: this.texts.phoneIsNotRecognizedInTheSystem }),
                    this.hangup()
                );
            }
        }
        catch (e) {
            if (e) {
                console.log('catch yemot exception', e);
            }
        } finally {
            this.end();
        }
    }

    async handleStudentCall(student) {
        await this.send(
            this.read({ type: 'text', text: format(this.texts.welcomeAndTypeEnterHour, student.name) },
                'enterHour', 'tap', { max: 4, min: 4, block_asterisk: true })
        );
        await this.send(
            this.read({ type: 'text', text: this.texts.typeExitHour },
                'exitHour', 'tap', { max: 4, min: 4, block_asterisk: true })
        );
        await this.send(
            this.read({ type: 'text', text: this.texts.typeIsAerobic + ', ' + this.texts.typeOneForPositiveZeroForNegative },
                'isAerobic', 'tap', { max: 1, min: 1, block_asterisk: true })
        );
        await this.send(
            this.read({ type: 'text', text: this.texts.typeIsHands + ', ' + this.texts.typeOneForPositiveZeroForNegative },
                'isHands', 'tap', { max: 1, min: 1, block_asterisk: true })
        );
        await this.send(
            this.read({ type: 'text', text: this.texts.typeIsLegs + ', ' + this.texts.typeOneForPositiveZeroForNegative },
                'isLegs', 'tap', { max: 1, min: 1, block_asterisk: true })
        );
        await this.send(
            this.read({ type: 'text', text: this.texts.typeIsFlexibility + ', ' + this.texts.typeOneForPositiveZeroForNegative },
                'isFlexibility', 'tap', { max: 1, min: 1, block_asterisk: true })
        );
        try {
            await new Report({
                user_id: this.user.id,
                student_id: student.id,
                enter_hour: this.params.enterHour,
                exit_hour: this.params.exitHour,
                report_date: new Date().toISOString().substr(0, 10),
                is_aerobic: this.params.isAerobic == 1,
                is_hands: this.params.isHands == 1,
                is_legs: this.params.isLegs == 1,
                is_flexibility: this.params.isFlexibility == 1,
            }).save();

            await this.send(
                this.id_list_message({ type: 'text', text: this.texts.recordWasSavedSuccessfully }),
                this.hangup()
            );
        }
        catch (e) {
            console.log('catch yemot exception', e);
            await this.send(
                this.id_list_message({ type: 'text', text: this.texts.recordWasNotSaved }),
                this.hangup()
            );
        }
    }
}
