//
//   STYLE CONSTANTS
//
// Background colors
export const BG_COLOR_SURFACE = `bg-(--light-color-surface) dark:bg-(--dark-color-surface)`;
export const BG_CODE = `bg-(--dark-color-surface-bright)`;
export const BG_COLOR_PRIMARY = `bg-(--light-color-primary) dark:bg-(--dark-color-primary)`;
export const BG_COLOR_PRIMARY_CONTAINER = `bg-(--light-color-primary-container) dark:bg-(--dark-color-primary-container)`;
export const BG_COLOR_SECONDARY_CONTAINER = `bg-(--light-color-secondary-container) dark:bg-(--dark-color-secondary-container)`;
export const BG_COLOR_ERROR = `bg-(--light-color-error) dark:bg-(--dark-color-error)`;

export const HOVER_BG_COLOR_PRIMARY = `hover:bg-(--light-color-primary) dark:hover:bg-(--dark-color-primary)`;
export const HOVER_BG_COLOR_ON_PRIMARY = `hover:bg-(--light-color-on-primary) dark:hover:bg-(--dark-color-on-primary)`;
export const HOVER_BG_COLOR_PRIMARY_CONTAINER = `hover:bg-(--light-color-primary-container) dark:hover:bg-(--dark-color-primary-container)`;
export const HOVER_BG_COLOR_ON_PRIMARY_CONTAINER = `hover:bg-(--light-color-on-primary-container) dark:hover:bg-(--dark-color-on-primary-container)`;
export const HOVER_BG_COLOR_SECONDARY_CONTAINER = `hover:bg-(--light-color-secondary-container) dark:hover:bg-(--dark-color-secondary-container)`;
export const HOVER_BG_COLOR_ON_SECONDARY_CONTAINER = `hover:bg-(--light-color-on-secondary-container) dark:hover:bg-(--dark-color-on-secondary-container)`;

export const HOVER_BG_COLOR_PRIMARY_CONTAINER_VARIANT = `${BG_COLOR_PRIMARY_CONTAINER} hover:opacity-50`;

// Text colors
export const TEXT_COLOR_ON_SURFACE = `text-(--light-color-on-surface) dark:text-(--dark-color-on-surface)`;
export const TEXT_CODE = `text-(--dark-color-on-surface)`;
export const TEXT_COLOR_ON_SURFACE_VARIANT = `text-(--light-color-on-surface-variant) dark:text-(--dark-color-on-surface-variant)`;
export const TEXT_COLOR_ON_PRIMARY = `text-(--light-color-on-primary) dark:text-(--dark-color-on-primary)`;
export const TEXT_COLOR_ON_PRIMARY_CONTAINER = `text-(--light-color-on-primary-container) dark:text-(--dark-color-on-primary-container)`;
export const TEXT_COLOR_ON_SECONDARY_CONTAINER = `text-(--light-color-on-secondary-container) dark:text-(--dark-color-on-secondary-container)`;
export const TEXT_COLOR_ON_ERROR = `text-(--light-color-on-error) dark:text-(--dark-color-on-error)`;

export const HOVER_TEXT_COLOR_ON_PRIMARY = `hover:text-(--light-color-on-primary) dark:hover:text-(--dark-color-on-primary)`;
export const HOVER_TEXT_COLOR_PRIMARY = `hover:text-(--light-color-primary) dark:hover:text-(--dark-color-primary)`;
export const HOVER_TEXT_COLOR_ON_PRIMARY_CONTAINER = `hover:text-(--light-color-on-primary-container) dark:hover:text-(--dark-color-on-primary-container)`;
export const HOVER_TEXT_COLOR_PRIMARY_CONTAINER = `hover:text-(--light-color-primary-container) dark:hover:text-(--dark-color-primary-container)`;
export const HOVER_TEXT_COLOR_ON_SECONDARY_CONTAINER = `hover:text-(--light-color-on-secondary-container) dark:hover:text-(--dark-color-on-secondary-container)`;
export const HOVER_TEXT_COLOR_SECONDARY_CONTAINER = `hover:text-(--light-color-secondary-container) dark:hover:text-(--dark-color-secondary-container)`;

export const ICON_COLOR_ON_SURFACE = `fill-(--light-color-on-surface) dark:fill-(--dark-color-on-surface)`;
export const ICON_COLOR_ON_PRIMARY = `fill-(--light-color-on-primary) dark:fill-(--dark-color-on-primary)`;
export const ICON_COLOR_ON_PRIMARY_CONTAINER = `fill-(--light-color-on-primary-container) dark:fill-(--dark-color-on-primary-container)`;
export const ICON_COLOR_ON_SECONDARY_CONTAINER = `fill-(--light-color-on-secondary-container) dark:fill-(--dark-color-on-secondary-container)`;

// Border colors
export const BORDER_COLOR_SURFACE = `border-(--light-color-on-surface) dark:border-(--dark-color-on-surface)`;

export const HOVER_BORDER_COLOR_PRIMARY = `hover:border-(--light-color-primary) dark:hover:border-(--dark-color-primary)`;

// Button styles
export const BUTTON = [
    'opacity-80', 'hover:opacity-100', 'transition-colors', 'duration-300', 'motion-reduce:transition-none', 'cursor-pointer', 'rounded-lg',
    'p-2', 'pl-3 pr-3', 'h-10', 
    'text-sm', 'font-medium',
    'aria-disabled:cursor-not-allowed', 'aria-disabled:opacity-50',
].join(' ')
export const PRIMARY_BUTTON = [BG_COLOR_PRIMARY, TEXT_COLOR_ON_PRIMARY, BUTTON].join(' ');
export const PRIMARY_CONTAINER_BUTTON = [BG_COLOR_PRIMARY_CONTAINER, TEXT_COLOR_ON_PRIMARY_CONTAINER, BUTTON].join(' ');

// Other
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