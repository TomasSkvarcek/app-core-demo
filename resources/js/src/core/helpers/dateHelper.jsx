import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import {
    date_format,
    datetime_format,
    datetime_format_seconds,
    input_date_format, input_datetime_format, input_time_format,
    time_format,
    time_format_seconds
} from "@/src/config/constants/date.jsx";
dayjs.extend(customParseFormat);

function formatDateOutput(date) {
    const dateObj = dayjs(date);
    return isNaN(dateObj) ? null : dateObj.format(date_format);
}

function formatDateTimeOutput(date, showSeconds = false) {
    let format = datetime_format;
    if (showSeconds) {
        format = datetime_format_seconds;
    }

    const dateObj = dayjs(date);
    return isNaN(dateObj) ? null : dateObj.format(format);
}

function formatTimeOutput(time, showSeconds = false) {
    let format = time_format;
    if (showSeconds) {
        format = time_format_seconds;
    }

    const dateObj = dayjs(time, 'HH:mm:ss');
    return isNaN(dateObj) ? null : dateObj.format(format);
}

function formatDateInput(date) {
    const dateObj = dayjs(date);
    return isNaN(dateObj) ? null : dateObj.format(input_date_format);
}

function formatDateTimeInput(date) {
    const dateObj = dayjs(date);
    return isNaN(dateObj) ? null : dateObj.format(input_datetime_format);
}

function formatTimeInput(time) {
    const dateObj = dayjs(time, 'HH:mm:ss');
    return isNaN(dateObj) ? null : dateObj.format(input_time_format);
}

function getTimeDiff(startTime, endTime, diffIn = 'minutes') {
    const startTimeObj = dayjs(startTime);
    const endTimeObj = dayjs(endTime);

    return endTimeObj.diff(startTimeObj, diffIn);
}

export {
    formatDateOutput,
    formatDateTimeOutput,
    formatTimeOutput,
    formatDateInput,
    formatDateTimeInput,
    formatTimeInput,
    getTimeDiff
}
