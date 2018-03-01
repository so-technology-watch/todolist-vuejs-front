export function taskColor(status) {
    switch (status) {
        case 1:
            return 'orange'
            break;
        case 2:
            return 'green'
            break;
        default:
            return ''
            break;
    }
}