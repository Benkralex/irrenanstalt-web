//
//   COLORS
//
// Background colors
export const BG_COLOR_SURFACE = `bg-(--light-color-surface) dark:bg-(--dark-color-surface)`;
export const BG_CODE = `bg-(--dark-color-surface-bright)`;
export const BG_COLOR_PRIMARY = `bg-(--light-color-primary) dark:bg-(--dark-color-primary)`;
export const BG_COLOR_ERROR = `bg-(--light-color-error) dark:bg-(--dark-color-error)`;

// Text colors
export const TEXT_COLOR_ON_SURFACE = `text-(--light-color-on-surface) dark:text-(--dark-color-on-surface)`;
export const TEXT_CODE = `text-(--dark-color-on-surface)`;
export const TEXT_COLOR_ON_SURFACE_VARIANT = `text-(--light-color-on-surface-variant) dark:text-(--dark-color-on-surface-variant)`;
export const TEXT_COLOR_ON_PRIMARY = `text-(--light-color-on-primary) dark:text-(--dark-color-on-primary)`;
export const TEXT_COLOR_ON_ERROR = `text-(--light-color-on-error) dark:text-(--dark-color-on-error)`;

// Other colors
export const PLACEHOLDER_COLOR_SURFACE_VARIANT = `placeholder:text-(--light-color-on-surface-variant) dark:text-(--dark-color-on-surface-variant)`;
export const BORDER_COLOR_SURFACE_VARIANT = `border-(--light-color-on-surface-variant) dark:border-(--dark-color-on-surface-variant)`;

//
//   STRINGS
//
export type Greeting = {
  string: string;
  allowedTags: string[];
  probability: number; // Value between 0 and 100
    className?: string;
};

export const GREETING_TEXTS: Greeting[] = [
    //Common (20)
    {
                string: "Ich freue mich sehr, Euch zu sehen, meine Hoheit!\nIch hoffe es geht Euch gut!",
        allowedTags: ["admin"],
        probability: 20,
    },
    {
        string: "Willkommen %USERNAME%!",
        allowedTags: [],
        probability: 20,
    },
    {
        string: "Hallo %USERNAME%, schön dass du da bist!",
        allowedTags: [],
        probability: 20,
    },
    {
        string: "Willkommen zurück, %USERNAME%!",
        allowedTags: [],
        probability: 20,
    },
    //Rare (5)
    {
        string: "Nett hier, aber waren sie schon mal in Baden-Würtemberg?",
        allowedTags: [],
        probability: 5,
    },
    // Very rare (1)
    {
        string: "67",
        allowedTags: [],
        probability: 1,
        className: "text-5xl font-bold",
    }
];