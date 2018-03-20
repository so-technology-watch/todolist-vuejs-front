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
    todo: 1,
    doing: 2,
    done: 3,
    archived: 4,
    deleted: 5
}