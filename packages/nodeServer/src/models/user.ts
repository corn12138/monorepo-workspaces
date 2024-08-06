import { Model } from '../mongo';

const schema = Model('user', {
    username: String,
    password: String,
    email: String,
    phone: String,
    avatar: String
});
const userModel = Model('user', schema);
export default userModel;