type Messages = typeof import("./messages/en.json");

// eslint-disable-next-line @typescript-eslint/no-empty-object-type -- standard next-intl global augmentation pattern
declare interface IntlMessages extends Messages {}
