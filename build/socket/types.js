"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataDBAForData = dataDBAForData;
function dataDBAForData(data, myId, myUsername, username) {
    const response = [];
    data.forEach((el) => {
        if (el.user_id_one == myId)
            response.push({
                id: el.id,
                myname: myUsername,
                nameuser: username,
                message: el.message,
                created_at: el.created_at,
                read: el.read,
                mymessage: true,
            });
        else
            response.push({
                id: el.id,
                myname: myUsername,
                nameuser: username,
                message: el.message,
                created_at: el.created_at,
                read: el.read,
                mymessage: false,
            });
    });
    return response;
}
