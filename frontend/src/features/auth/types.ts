export type AProps = {
    login: string
    password: string
}
export type AEmits = {
    (eventName: 'onSuccess'): void
    (eventName: 'onError'): void
}