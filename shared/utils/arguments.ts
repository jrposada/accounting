export type Arguments<TFunction> = TFunction extends (...args: infer U) => any
    ? U
    : never;
