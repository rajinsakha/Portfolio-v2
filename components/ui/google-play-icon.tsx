// Google Play mark in its official four brand colours. lucide has no brand
// icons, and a generic phone glyph doesn't read as the Play Store.
export function GooglePlayIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 512 512"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <path
        fill="#00A0FF"
        d="M48 59.49v393a4.33 4.33 0 007.37 3.07L260 256 55.37 56.42A4.33 4.33 0 0048 59.49z"
      />
      <path
        fill="#00F076"
        d="M345.8 174L89.22 32.64l-.16-.09c-4.73-2.61-9.59-1.29-12.59 2.08L260 256z"
      />
      <path
        fill="#FF3A44"
        d="M81.28 479.28c3 3.37 7.86 4.69 12.59 2.08l.16-.09L345.8 338 260 256z"
      />
      <path
        fill="#FFD500"
        d="M473.84 236.37l-.09-.05L393 190.9 295.3 256l97.7 65.1 80.2-45.1c14.4-8.4 14.4-28.9.64-39.63z"
      />
    </svg>
  );
}
