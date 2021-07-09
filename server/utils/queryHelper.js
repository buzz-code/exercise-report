import Student from "../models/student.model";
import User from "../models/user.model";

export function getUserByPhone(phone_number) {
    return new User({ phone_number })
        .fetch()
        .then(res => res.toJSON());
}

export function getStudentByUserIdAndPhone(user_id, phone_number) {
    const student = new Student({ user_id, phone_number })
        .fetch({ require: false })
        .then(res => res ? res.toJSON() : null);
    return student;
}
