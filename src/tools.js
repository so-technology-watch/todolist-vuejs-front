export function taskColor(status) {
    switch (status) {
        case STATUS.doing:
            return 'orange'
            break;
        case STATUS.done:
            return 'green'
            break;
        default:
            return 'grey darken-3'
            break;
    }
}

export const STATUS = {
    todo: 0,
    doing: 1,
    done: 2,
    archived: 3,
    deleted: 4
}
