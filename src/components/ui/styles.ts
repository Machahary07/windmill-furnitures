/* Class recipes shared across pages, lifted from the original screens
   (home, product, login, soon) so new pages stay on the same system. */

/** 1440 max width with the home page's ~3.5% side margin */
export const shell = "mx-auto w-full max-w-[1440px] px-[3.54%] max-md:px-5";

/** "ABOUT US." / "OUR FURNITURE" display heading */
export const displayHeading =
  "font-jakarta text-[55px] leading-none font-bold tracking-[-0.01em] text-black max-md:text-[38px]";

/** "CATALOG" light display heading */
export const lightHeading = "font-jakarta text-[52px] leading-none font-light text-black max-md:text-[38px]";

/** "Creative Team" / "See also" section heading */
export const sectionHeading = "font-jakarta text-2xl leading-tight font-bold text-black";

export const body = "font-jakarta text-lg leading-[30px] text-ink max-md:text-base max-md:leading-[26px]";

export const smallBody = "font-jakarta text-[13px] leading-[22px] text-[#555]";

/** product-page micro label, e.g. "Select Wood Type" */
export const eyebrow = "font-jakarta text-[10px] font-medium tracking-[0.2em] text-[#555] uppercase";

/** black bar button — "ADD TO CART" */
export const primaryButton =
  "inline-flex h-[43px] cursor-pointer items-center justify-center bg-[#1b1b1b] px-8 font-jakarta text-[10px] font-semibold tracking-[0.3em] text-white uppercase transition-colors hover:bg-black disabled:cursor-not-allowed disabled:bg-[#9a9a9a]";

/** outlined counterpart of primaryButton */
export const secondaryButton =
  "inline-flex h-[43px] cursor-pointer items-center justify-center border border-[#1b1b1b] px-8 font-jakarta text-[10px] font-semibold tracking-[0.3em] text-ink uppercase transition-colors hover:bg-[#1b1b1b] hover:text-white";

/** underlined micro link — "ADD TO WISHLIST" */
export const textButton =
  "cursor-pointer font-jakarta text-[10px] font-medium tracking-[0.2em] text-[#555] uppercase underline underline-offset-4 hover:text-ink";

/** red-underlined link from the SOON page */
export const redLink = "inline-block border-b-2 border-red pb-[3px] font-jakarta text-[15px] font-bold text-ink";

/** login form controls */
export const input =
  "h-10 w-full rounded-lg border border-border bg-white px-3.5 font-jakarta text-[15px] font-medium text-ink outline-none placeholder:text-faint focus:border-ink/40 aria-invalid:border-red";
export const textarea =
  "min-h-[130px] w-full rounded-lg border border-border bg-white px-3.5 py-2.5 font-jakarta text-[15px] font-medium text-ink outline-none placeholder:text-faint focus:border-ink/40";
export const label = "mb-2 block font-jakarta text-[15px] font-semibold text-ink";

/** rounded dark button from the login form */
export const formButton =
  "flex h-11 w-full cursor-pointer items-center justify-center rounded-lg bg-[#141414] font-jakarta text-sm font-semibold text-white disabled:cursor-wait disabled:opacity-70";
