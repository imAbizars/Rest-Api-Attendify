const dayjs = require("dayjs");
const utc = require("dayjs/plugin/utc");
const timezone = require("dayjs/plugin/timezone");
dayjs.extend(utc);
dayjs.extend(timezone);

const nowJakarta = () => dayjs().tz("Asia/Jakarta");

const getJamMenitJakarta = () => {
    const now = nowJakarta();
    return { jam: now.hour(), menit: now.minute() };
};

const getAwalHariJakarta = () => {
    return nowJakarta().startOf("day").toDate();
};

module.exports = { nowJakarta, getJamMenitJakarta, getAwalHariJakarta };